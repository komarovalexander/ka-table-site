---
title: Controlled mode
keywords: ka-table, react table, flux, redux, controlled, dispatch, kaReducer
description: The controlled mode of ka-table - the props-UI-action-reducer idea, dispatch and kaReducer, and when to choose it.
toc: true
sidebar: mydoc_sidebar
search: include
permalink: docs_controlled_mode.html
url: docs_controlled_mode.html
id: controlledmode
---

Pass `dispatch` to the table and it stops keeping its state: you store the props and decide how every action changes them. Use it when the state of the table lives outside of it, e.g. in a Redux store or in the URL, or when every change has to pass through your code.

## Which mode to choose

| You need | Use |
| --- | --- |
| A table which sorts, filters, pages and edits by itself | `<Table />` without `dispatch` |
| To react to the changes (save the edits, load a page) or to call the actions from your code | [`useTable()`](./docs_get_started.html#read-and-change-the-state) and the `table` prop |
| To change how the table handles some actions | `useTable({ customReducer })` |
| To store the state of the table in your own store (Redux, the URL, the parent component) | `dispatch` and `kaReducer` (this page) |

Start without `dispatch`: `useTable()` covers most of the cases. The columns, the data and the customization are the same in both modes, so you can switch later.

## Main idea

ka-table is "props - UI - action - reducer" *(thanks to Redux & Flux for the inspiration)*:

1. the UI is rendered according to the [props](./docs_props.html);
2. every change of the UI dispatches an [action](./docs_action.html);
3. [kaReducer](./docs_reducer.html) takes the previous props and the action and returns the new props.

![Pattern](./images/schema-docs.svg)

The props can be stored anywhere: in the state of the parent component, in a Redux store, in your own store or on a remote server.

## Basic example

```tsx
import 'ka-table/style.css';

import React, { useState } from 'react';
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

type User = { id: number; name: string; country: string; age: number };

const data: User[] = [
  { id: 1, name: 'Mike Wazowski', country: 'USA', age: 31 },
  { id: 2, name: 'Billi Bob', country: 'Canada', age: 45 },
  { id: 3, name: 'Tom Williams', country: 'UK', age: 28 },
  { id: 4, name: 'Kurt Cobain', country: 'USA', age: 27 },
];

// the initial props of the table
const tablePropsInit: ITableProps<User> = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'country', title: 'Country', dataType: DataType.String },
    { key: 'age', title: 'Age', dataType: DataType.Number },
  ],
  data,
  rowKeyField: 'id',
  editingMode: EditingMode.Cell,
  sortingMode: SortingMode.Single,
};

const UsersTable: React.FC = () => {
  // the props are stored in the state of the parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  // kaReducer returns the new props according to the previous props and the action
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  return <Table {...tableProps} dispatch={dispatch} />;
};

export default UsersTable;
```

[Open the live demo](https://komarovalexander.github.io/ka-table/#/sorting)

{% include warning.html content="Pass every action of the table to `kaReducer`, not only the ones you handle: the keyboard navigation moves the focus by `SetFocused` actions and the virtual scrolling renders the rows by `ScrollTable`." %}

## Next steps

To change the default behavior or to add your own actions, wrap `kaReducer`: see [Custom Reducer](./docs_reducer.html#custom-reducer) and [Custom actions](./docs_action.html#custom-actions).

The parts of the idea have their own pages: [Props](./docs_props.html), [Actions](./docs_action.html) and [Reducer](./docs_reducer.html).
