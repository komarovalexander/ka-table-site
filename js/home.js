/*
 * The copy buttons of the main page: <button data-copy="id"> copies the text of the element with this id.
 */
(function () {
  'use strict';

  // a hidden textarea and execCommand: http, an old browser or the clipboard API is not allowed
  function copyWithTextarea(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    document.body.removeChild(area);
    if (!copied) {
      throw new Error('The text was not copied');
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        copyWithTextarea(text);
      });
    }
    return new Promise(function (resolve) {
      copyWithTextarea(text);
      resolve();
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest && event.target.closest('[data-copy]');
    var source = button && document.getElementById(button.getAttribute('data-copy'));
    if (!source) {
      return;
    }
    if (!button.hasAttribute('data-label')) {
      button.setAttribute('data-label', button.textContent);
    }
    copyText(source.innerText.replace(/\s+$/, '')).then(function () {
      button.textContent = 'Copied';
      button.classList.add('is-copied');
      window.setTimeout(function () {
        button.textContent = button.getAttribute('data-label');
        button.classList.remove('is-copied');
      }, 1600);
    }, function () {
      // the text is selected: the user copies it with the keyboard
      window.getSelection().selectAllChildren(source);
    });
  });
})();
