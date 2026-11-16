---
title: Getting Started
keywords: ka-table, react table, install, getting started, useTable, typescript
description: Install ka-table, render your first React table, turn on sorting, filtering, paging and editing, and read the state of the table with useTable.
sidebar: mydoc_sidebar
search: include
permalink: docs_get_started.html
url: docs_get_started.html
id: getstarted
---

ka-table is a React table component with sorting, filtering, grouping, editing, paging and virtual scrolling. This page takes you from the installation to a working table, and then shows how to read and change its state.

## Installation

```sh
npm install ka-table
# or
yarn add ka-table
# or
pnpm add ka-table
```

Import the styles once, for example in the root of the application:

```js
import 'ka-table/style.css';
```

ka-table 13 works with React 18 and 19. The styles are plain CSS with custom properties, see [Themes](./docs_themes.html). The package has CommonJS and ES modules and is built for ES2019.

## Your first table

A table needs three props: `columns`, `data` and `rowKeyField` (the field which identifies a row).

```jsx
import 'ka-table/style.css';

import React from 'react';
import { Table } from 'ka-table';
import { DataType } from 'ka-table/enums';

const columns = [
  { key: 'name', title: 'Name', dataType: DataType.String },
  { key: 'country', title: 'Country', dataType: DataType.String },
  { key: 'age', title: 'Age', dataType: DataType.Number },
];

const data = [
  { id: 1, name: 'Mike Wazowski', country: 'USA', age: 31 },
  { id: 2, name: 'Billi Bob', country: 'Canada', age: 45 },
  { id: 3, name: 'Tom Williams', country: 'UK', age: 28 },
  { id: 4, name: 'Kurt Cobain', country: 'USA', age: 27 },
];

const UsersTable = () => (
  <Table columns={columns} data={data} rowKeyField="id" />
);

export default UsersTable;
```

[Open the live demo](https://komarovalexander.github.io/ka-table/#/overview)

## Turn on features

Every feature is a prop. The table below sorts by a click on the header, edits a cell by a click on it, filters by the row under the header and shows five rows per page:

```jsx
import { Table } from 'ka-table';
import { EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';

const paging = { enabled: true, pageSize: 5 };

const UsersTable = () => (
  <Table
    columns={columns}
    data={data}
    rowKeyField="id"
    sortingMode={SortingMode.Single}
    editingMode={EditingMode.Cell}
    filteringMode={FilteringMode.FilterRow}
    paging={paging}
  />
);
```

The table keeps its own state here: the sorting, the page, the filter values and the edited data. You don't write any handlers.

| Feature | Prop | Demo |
| --- | --- | --- |
| Sorting | `sortingMode` | [Sorting](https://komarovalexander.github.io/ka-table/#/sorting) |
| Editing | `editingMode` | [Editing](https://komarovalexander.github.io/ka-table/#/editing) |
| Filtering | `filteringMode` | [Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row) |
| Paging | `paging` | [Paging](https://komarovalexander.github.io/ka-table/#/paging) |
| Search | `searchText` | [Search](https://komarovalexander.github.io/ka-table/#/search) |
| Grouping | `groups` | [Grouping](https://komarovalexander.github.io/ka-table/#/grouping) |
| Selection | `selectedRows` | [Selection](https://komarovalexander.github.io/ka-table/#/selection) |
| Virtual scrolling | `virtualScrolling` | [Many Rows](https://komarovalexander.github.io/ka-table/#/many-rows) |

All the props are in [Props](./docs_props.html).

## Read and change the state

Use `useTable()` when your code has to know what happens in the table or to change it: `table.props` is the current state, the methods of `table` are the [actions](./docs_action.html#predefined-actions), and `onDispatch` gets every action of the table.

```jsx
import { Table, useTable } from 'ka-table';
import { ActionType, EditingMode } from 'ka-table/enums';

const paging = { enabled: true, pageSize: 5 };

const UsersTable = () => {
  const table = useTable({
    onDispatch: (action, tableProps) => {
      if (action.type === ActionType.UpdateCellValue) {
        // a cell was edited: e.g. send the new value to your server here
        console.log(action.rowKeyValue, action.columnKey, action.value);
      }
    },
  });

  return (
    <>
      <button onClick={() => table.updatePageIndex(0)}>First page</button>
      <span>Page: {(table.props.paging?.pageIndex ?? 0) + 1}</span>
      <Table
        table={table}
        columns={columns}
        data={data}
        rowKeyField="id"
        editingMode={EditingMode.Cell}
        paging={paging}
      />
    </>
  );
};
```

See [Hooks and Utils](./docs_hooks_utils.html) for all the options of `useTable()`, and for `useTableInstance()` and `useTableSelector()`, which give the table to the nested components.

## TypeScript

The type of the rows is inferred from `data`, so `rowData` in `format`, `search`, `validation` and `childComponents` is typed. The values of the cells and the keys of the rows are `unknown`: check their type before using them.

```tsx
type User = { id: number; name: string; birthday: Date };

const table = useTable<User>(); // table.props.data is User[]

<Table
  table={table}
  columns={[
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'birthday', title: 'Birthday', dataType: DataType.Date },
  ]}
  data={users}
  rowKeyField="id"
  format={({ column, value }) =>
    column.dataType === DataType.Date && value instanceof Date && value.toLocaleDateString()
  }
/>
```

Use `ITableProps<User>` for the props of a [controlled](./docs_controlled_mode.html) table and `ChildComponents<User>` (`ka-table/models`) for the customization:

```tsx
import { ChildComponents } from 'ka-table/models';

const childComponents: ChildComponents<User> = {
  cellText: {
    // rowData is User
    content: ({ column, rowData }) => (column.key === 'name' ? <b>{rowData.name}</b> : undefined),
  },
};
```

## Next steps

- [Demos](https://komarovalexander.github.io/ka-table/#/overview): every feature has a separate example with the code.
- [Props](./docs_props.html): the options of the table and the columns, grouped by feature.
- [Hooks and Utils](./docs_hooks_utils.html): `useTable()` and the utils which read the data of the table.
- [Customization](./docs_ui.html): `childComponents`, custom cells and editors, the keyboard navigation.
- [Themes](./docs_themes.html): CSS custom properties, the dark theme, Bootstrap and Material UI.
- [Controlled mode](./docs_controlled_mode.html): the "props - UI - action - reducer" idea and the table whose state is stored in your code.
- [Actions](./docs_action.html): the predefined actions and your own ones.
- [Reducer](./docs_reducer.html): `kaReducer` and custom reducers.
- Upgrading from 12.x: the [migration guide](https://github.com/komarovalexander/ka-table/blob/master/MIGRATION.md) and the [changelog](https://github.com/komarovalexander/ka-table/blob/master/CHANGELOG.md).

ka-table is free and open-source under the MIT license. Contribution and feedback are always welcome on [GitHub](https://github.com/komarovalexander/ka-table).
