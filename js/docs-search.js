/*
 * The search of the documentation.
 *
 * The index is built in the browser, so there is nothing to rebuild when the docs change: on the first
 * focus of the search box the script loads the pages listed in its data-pages attribute and makes
 * an entry of every page, every section (h2, h3) and every row of the tables (a prop, an action,
 * a child component...). A result links to the section or to the row.
 *
 * The same scan gives ids to the rows of the tables of the opened page, so a row has a link too:
 * docs_props.html#sorting.sortingmode
 */
(function () {
  'use strict';

  var MAX_RESULTS = 8;
  var MIN_QUERY_LENGTH = 2;

  // the words of the users -> the words of the docs
  var SYNONYMS = {
    pagination: ['paging'], paginate: ['paging'], pager: ['paging'],
    virtualization: ['virtual'], virtualized: ['virtual'], windowing: ['virtual'],
    sticky: ['fixed'], pinned: ['fixed'], pin: ['fixed'], frozen: ['fixed'], freeze: ['fixed'],
    checkbox: ['selection'], checkboxes: ['selection'],
    server: ['remote'], serverside: ['remote'], backend: ['remote'],
    styles: ['theme'], styling: ['theme'], css: ['theme'], colors: ['theme'], darkmode: ['dark'],
    a11y: ['accessibility'], aria: ['accessibility'],
    shortcut: ['keyboard'], shortcuts: ['keyboard'], hotkey: ['keyboard'], hotkeys: ['keyboard'],
    drag: ['reordering'], dnd: ['reordering'],
    upgrade: ['migration'], ts: ['typescript'],
    loader: ['loading'], spinner: ['loading'],
    formatter: ['format'], renderer: ['childcomponents'], template: ['childcomponents'],
    variable: ['properties'], variables: ['properties'], vars: ['properties']
  };

  // the words which are skipped in a query: "how to install" searches "install"
  var STOP_WORDS = ['a', 'an', 'the', 'to', 'of', 'in', 'on', 'for', 'with', 'and', 'or', 'is', 'are', 'do', 'does',
    'how', 'what', 'can', 'i', 'my', 'it'];

  // a match in the title of a result weighs ten times more than a match in its text
  var TITLE_WEIGHT = 100;
  var TEXT_WEIGHT = 10;
  var KIND_WEIGHT = { page: 1.25, h2: 1.15, h3: 1.1, row: 1 };

  var container, input, list;
  var entries = null; // the index, null until the pages are loaded
  var loading = null;
  var shown = []; // the results in the list
  var active = -1;

  /* ---------- the text of a page ---------- */

  function clean(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  // the lines of the text of an element, <br> and line breaks separate them
  function linesOf(element) {
    var copy = element.cloneNode(true);
    var breaks = copy.querySelectorAll('br');
    for (var i = 0; i < breaks.length; i++) {
      breaks[i].parentNode.replaceChild(copy.ownerDocument.createTextNode('\n'), breaks[i]);
    }
    return copy.textContent.split('\n').map(clean).filter(Boolean);
  }

  function textOf(element) {
    return linesOf(element).join(' ');
  }

  function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  // the rows of a table: the first line of the first cell is the title of a row (the name of a prop, the type of an action)
  function addRows(table, section, usedIds, withText) {
    var body = table.tBodies[0];
    if (!body) {
      return;
    }
    for (var i = 0; i < body.rows.length; i++) {
      var row = body.rows[i];
      var first = row.cells.length ? linesOf(row.cells[0]) : [];
      if (!first.length) {
        continue;
      }
      var title = first[0].replace(/^['"‘’“”]+|['"‘’“”]+$/g, '');
      var id = (section.id || 'row') + '.' + (slug(title) || 'row');
      if (usedIds[id]) {
        usedIds[id]++;
        id += '-' + usedIds[id];
      }
      usedIds[id] = 1;
      var text = '';
      if (withText) {
        var cells = [];
        for (var c = 1; c < row.cells.length; c++) {
          var cell = textOf(row.cells[c]);
          // "yes", "no", "td", "Demo" and the title once more say nothing in a result
          if (cell.length > 3 && cell !== 'Demo' && cell !== title) {
            cells.push(cell);
          }
        }
        if (cells.length > 1 && cells[cells.length - 1].length > 24) {
          cells.unshift(cells.pop()); // the description is the last cell: it goes first
        }
        text = first.slice(1).concat(cells).join(' — ');
      }
      section.rows.push({ element: row, id: id, title: title, text: text });
    }
  }

  // the sections of a page: the text before the first heading, then every h2 and h3 with its own text and the rows of its tables
  function scan(root, withText) {
    var current = { id: '', title: '', level: 1, parent: '', text: [], rows: [] };
    var sections = [current];
    var h2Title = '';
    var usedIds = {};
    for (var element = root.firstElementChild; element; element = element.nextElementSibling) {
      var tag = element.tagName;
      if (tag === 'H2' || tag === 'H3') {
        var title = clean(element.textContent);
        if (tag === 'H2') {
          h2Title = title;
        }
        current = { id: element.id, title: title, level: tag === 'H2' ? 2 : 3, parent: tag === 'H3' ? h2Title : '', text: [], rows: [] };
        sections.push(current);
      } else if (tag === 'TABLE' || element.classList.contains('table-scroll')) {
        // a table is inside the box which scrolls it (.table-scroll)
        var table = tag === 'TABLE' ? element : element.querySelector('table');
        if (table) {
          addRows(table, current, usedIds, withText);
        }
      } else if (withText && tag !== 'SCRIPT' && tag !== 'STYLE') {
        var text = textOf(element);
        if (text) {
          current.text.push(text);
        }
      }
    }
    return sections;
  }

  /* ---------- the index ---------- */

  // the words of a text in lower case: the whole words and the parts of camelCase names (updatePageIndex: update, page, index)
  function wordsOf(text) {
    var whole = {};
    var parts = {};
    var found = text.match(/[A-Za-z0-9]+/g) || [];
    for (var i = 0; i < found.length; i++) {
      whole[found[i].toLowerCase()] = true;
      var split = found[i].replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').split(' ');
      for (var j = 0; split.length > 1 && j < split.length; j++) {
        parts[split[j].toLowerCase()] = true;
      }
    }
    return {
      whole: Object.keys(whole),
      parts: Object.keys(parts).filter(function (part) { return !whole[part]; })
    };
  }

  function keyOf(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
  }

  function addEntry(index, kind, url, title, crumbs, text, hidden) {
    index.push({
      kind: kind,
      url: url,
      title: title,
      crumbs: crumbs,
      text: text,
      titleWords: wordsOf(title),
      textWords: wordsOf(text + ' ' + hidden),
      lowerCase: (title + ' ' + text).toLowerCase(),
      titleKey: keyOf(title),
      order: index.length
    });
  }

  function addPage(index, url, doc) {
    var root = doc.querySelector('.post-content');
    if (!root) {
      return;
    }
    var heading = doc.querySelector('.post-header h1');
    var pageTitle = clean(heading ? heading.textContent : doc.title.split('|')[0]);
    var meta = function (name) {
      var element = doc.querySelector('meta[name="' + name + '"]');
      return (element && element.getAttribute('content')) || '';
    };
    scan(root, true).forEach(function (section) {
      var text = section.text.join(' ');
      var crumbs = [pageTitle];
      if (section.level === 1) {
        // the page itself: its keywords are searched too
        addEntry(index, 'page', url, pageTitle, ['Page'], text || meta('description'), meta('keywords') + ' ' + meta('description'));
      } else {
        if (section.parent) {
          crumbs.push(section.parent);
        }
        addEntry(index, 'h' + section.level, url + '#' + encodeURIComponent(section.id), section.title, crumbs.slice(), text, '');
        crumbs.push(section.title);
      }
      section.rows.forEach(function (row) {
        addEntry(index, 'row', url + '#' + encodeURIComponent(row.id), row.title, crumbs, row.text, '');
      });
    });
  }

  // the pages of the docs in the order of the menu
  function pagesOf() {
    var menu = [];
    var links = document.querySelectorAll('#mysidebar a[title]');
    for (var i = 0; i < links.length; i++) {
      var href = (links[i].getAttribute('href') || '').split('#')[0];
      if (href && menu.indexOf(href) < 0 && !/^(https?:)?\/\//.test(href)) {
        menu.push(href);
      }
    }
    var pages = (container.getAttribute('data-pages') || '').split(',')
      .map(function (url) { return url.trim().replace(/^\//, ''); })
      .filter(Boolean);
    if (!pages.length) {
      pages = menu.slice();
    }
    var rank = function (url) {
      var position = menu.indexOf(url);
      return position < 0 ? menu.length : position;
    };
    return pages.sort(function (a, b) { return rank(a) - rank(b); });
  }

  function load() {
    if (!loading) {
      var pages = pagesOf();
      loading = Promise.all(pages.map(function (url) {
        return fetch(url)
          .then(function (response) { return response.ok ? response.text() : ''; })
          .catch(function () { return ''; });
      })).then(function (pagesHtml) {
        var index = [];
        pagesHtml.forEach(function (html, i) {
          if (html) {
            addPage(index, pages[i], new DOMParser().parseFromString(html, 'text/html'));
          }
        });
        entries = index;
      });
    }
    return loading;
  }

  /* ---------- the search ---------- */

  // sorting -> sort, themes -> theme, validation -> valid: the stem matches the other forms of the word
  function stemOf(term) {
    var stem = term.replace(/(ations?|ings?|ed)$/, '');
    if (stem === term) {
      stem = term.replace(/(s|e)$/, '');
    }
    return stem !== term && stem.length > 3 ? stem : '';
  }

  // the terms of a query, every term with its variants: the term itself, its stem and its synonyms
  function parse(query) {
    var found = query.toLowerCase().match(/[a-z0-9]+/g) || [];
    var words = found.filter(function (word) { return STOP_WORDS.indexOf(word) < 0; });
    if (!words.length) {
      words = found;
    }
    var terms = [];
    words.slice(0, 6).forEach(function (word) {
      if (terms.some(function (term) { return term[0].text === word; })) {
        return;
      }
      var variants = [{ text: word, factor: 1 }];
      var stem = stemOf(word);
      if (stem) {
        variants.push({ text: stem, factor: 0.8 });
      }
      (SYNONYMS[word] || []).forEach(function (synonym) {
        variants.push({ text: synonym, factor: 0.9 });
      });
      terms.push(variants);
    });
    return terms;
  }

  // the distance of two words in typos (a wrong, a missing, an extra letter or two swapped ones), stops after max
  function distance(a, b, max) {
    var beforePrevious = null;
    var previous = [];
    var j;
    for (j = 0; j <= b.length; j++) {
      previous[j] = j;
    }
    for (var i = 1; i <= a.length; i++) {
      var current = [i];
      var smallest = i;
      for (j = 1; j <= b.length; j++) {
        var value = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (beforePrevious && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          value = Math.min(value, beforePrevious[j - 2] + 1);
        }
        current[j] = value;
        smallest = Math.min(smallest, value);
      }
      if (smallest > max) {
        return max + 1;
      }
      beforePrevious = previous;
      previous = current;
    }
    return previous[b.length];
  }

  // one typo in a word of 4-7 letters, two in a longer one
  function isTypo(term, word) {
    var max = term.length > 7 ? 2 : 1;
    return term.length > 3 && Math.abs(term.length - word.length) <= max && distance(term, word, max) <= max;
  }

  // how well a term matches the words: 1 a whole word, 0.85 a part of a camelCase name,
  // 0.5-0.7 the beginning of a word, 0.3 the inside of a word, 0.25 a word with a typo
  function quality(term, words, withTypos) {
    var best = 0;
    var value;
    var i;
    for (i = 0; i < words.whole.length; i++) {
      var word = words.whole[i];
      if (word === term) {
        return 1;
      }
      if (word.lastIndexOf(term, 0) === 0) {
        value = 0.5 + 0.2 * term.length / word.length;
      } else if (term.length > 2 && word.indexOf(term) > 0) {
        value = 0.3;
      } else if (withTypos && isTypo(term, word)) {
        value = 0.25;
      } else {
        continue;
      }
      best = Math.max(best, value);
    }
    for (i = 0; i < words.parts.length; i++) {
      var part = words.parts[i];
      if (part === term) {
        value = 0.85;
      } else if (part.lastIndexOf(term, 0) === 0) {
        value = 0.45 + 0.2 * term.length / part.length;
      } else if (withTypos && isTypo(term, part)) {
        value = 0.2;
      } else {
        continue;
      }
      best = Math.max(best, value);
    }
    return best;
  }

  function score(entry, terms, queryKey, query, phrase, withTypos) {
    var total = 0;
    var matched = 0;
    terms.forEach(function (variants) {
      var title = 0;
      var text = 0;
      variants.forEach(function (variant) {
        title = Math.max(title, quality(variant.text, entry.titleWords, withTypos) * variant.factor);
        text = Math.max(text, quality(variant.text, entry.textWords, withTypos) * variant.factor);
      });
      if (title || text) {
        matched++;
        total += title * TITLE_WEIGHT + text * (title ? TEXT_WEIGHT / 2 : TEXT_WEIGHT);
      }
    });
    if (!matched) {
      return null;
    }
    // the title is the query, begins with it or has it inside
    if (entry.titleKey === queryKey) {
      total += entry.title === query ? 160 : 150; // "paging" is the prop, "Paging" is the feature
    } else if (entry.titleKey.lastIndexOf(queryKey, 0) === 0) {
      total += 40;
    } else if (queryKey.length > 2 && entry.titleKey.indexOf(queryKey) > 0) {
      total += 15;
    }
    // the query as it is typed is in the title or in the text: a phrase or a piece of code (--ka-, useTable(), table.props)
    if (phrase && entry.lowerCase.indexOf(phrase) >= 0) {
      total += /[^a-z0-9 ]/.test(phrase) ? 200 : 40;
    }
    // of two equal matches the shorter title is the closer one
    total = total * KIND_WEIGHT[entry.kind] - Math.min(entry.titleWords.whole.length, 10);
    return { entry: entry, matched: matched, score: total };
  }

  // the results of a query: all its terms as they are, then with typos, then any of the terms
  function search(terms, query) {
    var queryKey = terms.map(function (variants) { return variants[0].text; }).join('');
    var phrase = query.toLowerCase().replace(/\s+/g, ' ');
    if (phrase.length < 3 || /^[a-z0-9]+$/.test(phrase)) {
      phrase = ''; // one word is matched by the terms
    }
    var passes = [{ typos: false, all: true }, { typos: true, all: true }, { typos: true, all: false }];
    for (var p = 0; p < passes.length; p++) {
      var pass = passes[p];
      if (!pass.all && terms.length < 2) {
        break;
      }
      var found = [];
      for (var i = 0; i < entries.length; i++) {
        var result = score(entries[i], terms, queryKey, query, phrase, pass.typos);
        if (result && (!pass.all || result.matched === terms.length)) {
          found.push(result);
        }
      }
      if (found.length) {
        found.sort(function (a, b) {
          return b.matched - a.matched || b.score - a.score || a.entry.order - b.entry.order;
        });
        return found.slice(0, MAX_RESULTS);
      }
    }
    return [];
  }

  /* ---------- the list of the results ---------- */

  function escapeHtml(text) {
    return text.replace(/[&<>"]/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char];
    });
  }

  // the strings to highlight in the results, the longest first
  function needlesOf(terms) {
    var needles = [];
    terms.forEach(function (variants) {
      variants.forEach(function (variant) {
        if (variant.text.length > 1 && needles.indexOf(variant.text) < 0) {
          needles.push(variant.text);
        }
      });
    });
    return needles.sort(function (a, b) { return b.length - a.length; });
  }

  function highlight(text, needles) {
    if (!needles.length) {
      return escapeHtml(text);
    }
    var pattern = new RegExp('(' + needles.join('|') + ')', 'gi'); // the needles are letters and digits only
    return text.split(pattern).map(function (piece, i) {
      return i % 2 ? '<mark>' + escapeHtml(piece) + '</mark>' : escapeHtml(piece);
    }).join('');
  }

  // the part of the text around the first match
  function snippetOf(text, needles) {
    var lower = text.toLowerCase();
    var position = -1;
    needles.forEach(function (needle) {
      var found = lower.indexOf(needle);
      if (found >= 0 && (position < 0 || found < position)) {
        position = found;
      }
    });
    var start = 0;
    if (position > 60) {
      start = text.lastIndexOf(' ', position - 40) + 1;
    }
    var end = Math.min(text.length, start + 170);
    return (start ? '… ' : '') + text.slice(start, end).trim() + (end < text.length ? ' …' : '');
  }

  function open() {
    list.classList.add('is-open');
    input.setAttribute('aria-expanded', 'true');
  }

  function close() {
    list.classList.remove('is-open');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }

  function setActive(index) {
    var items = list.querySelectorAll('li[role="option"]');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('is-active', i === index);
      items[i].setAttribute('aria-selected', i === index ? 'true' : 'false');
    }
    active = index;
    if (items[index]) {
      input.setAttribute('aria-activedescendant', items[index].id);
      if (items[index].offsetTop < list.scrollTop) {
        list.scrollTop = items[index].offsetTop;
      } else if (items[index].offsetTop + items[index].offsetHeight > list.scrollTop + list.clientHeight) {
        list.scrollTop = items[index].offsetTop + items[index].offsetHeight - list.clientHeight;
      }
    }
  }

  function showMessage(text) {
    shown = [];
    active = -1;
    list.innerHTML = '<li class="search-message" role="presentation">' + escapeHtml(text) + '</li>';
    open();
  }

  function update() {
    var query = input.value.trim();
    if (query.length < MIN_QUERY_LENGTH) {
      shown = [];
      active = -1;
      list.innerHTML = '';
      close();
      return;
    }
    if (!entries) {
      showMessage('Loading…');
      load().then(update);
      return;
    }
    var terms = parse(query);
    var results = terms.length ? search(terms, query) : [];
    if (!results.length) {
      showMessage('No results for “' + query + '”');
      return;
    }
    var needles = needlesOf(terms);
    list.innerHTML = results.map(function (result, i) {
      var entry = result.entry;
      return '<li role="option" id="search-result-' + i + '">' +
        '<a href="' + escapeHtml(entry.url) + '" tabindex="-1">' +
        (entry.crumbs.length ? '<span class="search-crumbs">' + escapeHtml(entry.crumbs.join(' › ')) + '</span>' : '') +
        '<span class="search-title">' + highlight(entry.title, needles) + '</span>' +
        (entry.text ? '<span class="search-snippet">' + highlight(snippetOf(entry.text, needles), needles) + '</span>' : '') +
        '</a></li>';
    }).join('');
    shown = results;
    list.scrollTop = 0;
    setActive(0);
    open();
  }

  /* ---------- the target of a link ---------- */

  function targetOf() {
    try {
      var id = decodeURIComponent(window.location.hash.slice(1));
      return id ? document.getElementById(id) : null;
    } catch (error) {
      return null;
    }
  }

  // a row of a table which is opened by a link is scrolled to the middle of the window and highlighted
  function showTarget(flash) {
    var target = targetOf();
    if (!target || target.tagName !== 'TR') {
      return;
    }
    target.scrollIntoView({ block: 'center' });
    if (flash !== false) {
      target.classList.remove('search-target');
      void target.offsetWidth; // restarts the animation
      target.classList.add('search-target');
    }
  }

  function go(url) {
    var here = window.location.pathname.split('/').pop() + window.location.hash;
    close();
    input.blur();
    window.location.href = url;
    if (url === here) { // the same link again: there is no navigation, scroll back to it
      var target = targetOf();
      if (target && target.tagName !== 'TR') {
        target.scrollIntoView();
      }
      showTarget();
    }
  }

  // the rows of the tables of the opened page get the same ids as in the index
  function prepareRows() {
    var root = document.querySelector('.post-content');
    if (!root) {
      return;
    }
    scan(root, false).forEach(function (section) {
      section.rows.forEach(function (row) {
        if (!row.element.id) {
          row.element.id = row.id;
        }
      });
    });
    showTarget();
    window.addEventListener('hashchange', function () { showTarget(); });
    window.addEventListener('load', function () { showTarget(false); }); // the images are loaded: the row has moved
  }

  /* ---------- the events ---------- */

  function onKeyDown(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (shown.length) {
        event.preventDefault();
        setActive((active + (event.key === 'ArrowDown' ? 1 : shown.length - 1)) % shown.length);
        open();
      }
    } else if (event.key === 'Enter') {
      if (shown[active] && list.classList.contains('is-open')) {
        event.preventDefault();
        go(shown[active].entry.url);
      }
    } else if (event.key === 'Escape') {
      if (input.value) {
        input.value = '';
        update();
      } else {
        input.blur();
      }
    }
  }

  function init() {
    prepareRows();
    container = document.getElementById('search-demo-container');
    input = document.getElementById('search-input');
    list = document.getElementById('results-container');
    if (!container || !input || !list) {
      return;
    }
    input.addEventListener('focus', function () {
      load();
      if (input.value.trim().length >= MIN_QUERY_LENGTH) {
        update();
      }
    });
    input.addEventListener('input', function () {
      update();
      if (typeof window.search_ev === 'function') {
        window.search_ev(input.value); // the analytics of the queries
      }
    });
    input.addEventListener('keydown', onKeyDown);
    list.addEventListener('mousemove', function (event) {
      var item = event.target.closest('li[role="option"]');
      var index = item ? Array.prototype.indexOf.call(list.children, item) : -1;
      if (index >= 0 && index !== active) {
        setActive(index);
      }
    });
    list.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (link && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        go(link.getAttribute('href'));
      }
    });
    document.addEventListener('click', function (event) {
      if (!container.contains(event.target)) {
        close();
      }
    });
    // "/" moves the focus to the search
    document.addEventListener('keydown', function (event) {
      var target = event.target;
      var typing = target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable);
      if (event.key === '/' && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
