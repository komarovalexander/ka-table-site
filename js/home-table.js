/*
 * The live ka-table of the first screen of the main page (pages/index.html).
 *
 * React and ka-table are loaded from npm through esm.sh after the page is shown, so the text of the page does not wait
 * for them. Until the table is rendered the page shows its preview; if they can't be loaded, a link to the demos.
 *
 * The table is rendered in a shadow root with the styles of ka-table only: the styles of the site and Bootstrap
 * do not reach it, and it looks as it does in an app with the default styles.
 */
const KA_TABLE_VERSION = '13.0.0'; // the version of ka-table on npm the live table is loaded from
const REACT_VERSION = '19.3.1';
// react-dom and ka-table get the same copy of React
const DEPS = `deps=react@${REACT_VERSION},react-dom@${REACT_VERSION}`;

const container = document.getElementById('home-table');

const DATA = [
  ['Ava Brooks', 'Brightlane', 92, true, '2026-12-03'],
  ['Liam Carter', 'Northfield', 78, true, '2026-12-10'],
  ['Mia Chen', 'Bluepeak', 55, false, '2026-12-01'],
  ['Noah Patel', 'Brightlane', 64, false, '2026-11-28'],
  ['Emma Novak', 'Redwood Labs', 88, true, '2027-01-15'],
  ['Lucas Silva', 'Northfield', 41, false, '2026-12-20'],
  ['Zoe Martin', 'Silverline', 97, true, '2027-02-02'],
  ['Ethan Wright', 'Bluepeak', 73, true, '2026-12-18'],
  ['Sofia Rossi', 'Redwood Labs', 59, false, '2026-12-07'],
  ['Mason Lee', 'Silverline', 85, true, '2027-01-09'],
  ['Chloe Dubois', 'Brightlane', 48, false, '2026-12-14'],
  ['Leo Fischer', 'Northfield', 90, true, '2027-01-22'],
  ['Isla Moreno', 'Bluepeak', 67, true, '2026-12-28'],
  ['Jack Wilson', 'Redwood Labs', 36, false, '2026-12-05'],
  ['Nora Kim', 'Silverline', 81, true, '2027-01-30'],
].map(([name, company, score, passed, nextTry], index) => ({
  id: index + 1,
  name,
  company,
  score,
  passed,
  nextTry: new Date(`${nextTry}T00:00`), // the local midnight
}));

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function loadStyle(href, parent) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = () => reject(new Error(`${href} was not loaded`));
    parent.appendChild(link);
  });
}

// the browser defaults inside, as in an app; only the font of the page is inherited
const HOST_STYLE = ':host { all: initial; display: block; font-family: inherit; }';

async function renderTable() {
  // the shadow root is hidden next to the preview until the table is rendered
  const host = document.createElement('div');
  host.hidden = true;
  const shadow = host.attachShadow({ mode: 'open' });
  const hostStyle = document.createElement('style');
  hostStyle.textContent = HOST_STYLE;
  const root = document.createElement('div');
  shadow.append(hostStyle, root);
  container.appendChild(host);

  const [reactModule, clientModule, kaTable] = await Promise.all([
    import(`https://esm.sh/react@${REACT_VERSION}`),
    import(`https://esm.sh/react-dom@${REACT_VERSION}/client?${DEPS}`),
    // ka-table 13 is built as separate modules: bundle makes them one file instead of 100+ requests
    import(`https://esm.sh/ka-table@${KA_TABLE_VERSION}?bundle&${DEPS}`),
    loadStyle(`https://cdn.jsdelivr.net/npm/ka-table@${KA_TABLE_VERSION}/style.css`, shadow),
  ]);
  const React = reactModule.default || reactModule;
  const createRoot = clientModule.createRoot || clientModule.default.createRoot;

  // the columns which fit the width of the table: five on a wide screen, three on a phone
  const width = container.clientWidth;
  const columns = [
    { key: 'name', title: 'Name', dataType: 'string' },
    { key: 'company', title: 'Company', dataType: 'string', visible: width >= 600 },
    { key: 'score', title: 'Score', dataType: 'number', filterRowOperator: '>=', width: 96 },
    { key: 'passed', title: 'Passed', dataType: 'boolean', width: 96 },
    // the filter of a date shows the mask of the date of the browser: the column is wide enough for it
    { key: 'nextTry', title: 'Next try', dataType: 'date', width: 160, visible: width >= 480 },
  ];
  // the text of the date and boolean cells, the other ones show their values
  const format = ({ column, value }) => {
    if (value instanceof Date) {
      return dateFormat.format(value);
    }
    if (column.dataType === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return undefined;
  };

  createRoot(root).render(React.createElement(kaTable.Table, {
    columns,
    data: DATA,
    rowKeyField: 'id',
    format,
    sortingMode: 'single',
    editingMode: 'cell',
    filteringMode: 'filterRow',
    paging: { enabled: true, pageSize: 5, pageIndex: 0 },
    noData: { text: 'No rows match the filters' },
  }));
  // the preview and the link to the demos are not needed any more
  [...container.children].filter((child) => child !== host).forEach((child) => child.remove());
  host.hidden = false;
  container.classList.add('is-live');
}

if (container) {
  renderTable().catch((error) => {
    container.classList.add('is-failed');
    console.warn('The live table of the main page was not loaded:', error);
  });
}
