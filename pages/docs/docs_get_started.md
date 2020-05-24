---
title: Getting Started
keywords: ka-table, react table, flux, redux
sidebar: mydoc_sidebar
search: include
permalink: docs_get_started.html
url: docs_get_started.html
id: getstarted
---

## Installation
npm
```sh
npm install ka-table
```
yarn
```sh
yarn add ka-table
```

## License
ka-table is a MIT component. It is fully free, and contribution and feedback are always welcome

## Main idea
ka-table is "props - UI - action - reducer". *(Thanks to Redux & Flux for the inspiration)*

 ka-table UI is rendered according to props -> all changes are performed by dispatching an action -> previous props and action are passed to the kaReducer -> kaReducer generates new props

![Pattern](./images/schema-docs.svg)

 ka-table easily integrates with Redux but also can be used without it

 ka-table is controllable - props should be changed to perform changing UI - this approach gives full control of component and every change

 Props of ka-table can be obtained from every type of storage. Examples of storage: state of parent component, remote server, redux store, custom store, etc


All changes of ka-table are performed by dispatching action

    dispatch({
      type: 'ACTION_TYPE',
      ...payload
    })

### Basic example

```js
import "ka-table/style.css";
// or import "ka-table/style.scss";

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

// data for ka-table
const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

// initial value of the *props
const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OverviewDemo: React.FC = () => {
  // in this case *props are stored in the state of parent component
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => { // dispatch has an *action as an argument
    // *kaReducer returns new *props according to previous state and *action, and saves new props to the state
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...tableProps} // (2) ka-table UI is rendered according to props
      dispatch={dispatch} // dispatch is required for obtain new actions from the UI
    />
  );
};

export default OverviewDemo;
```
*: [props](./docs_props.html) |
[UI](./docs_ui.html) |
[action](./docs_action.html) |
[kaReducer](./docs_reducer.html)

[Example link](https://komarovalexander.github.io/ka-table/#/sorting)

## Examples
kaTable has [big set of Examples](https://komarovalexander.github.io/ka-table/#/overview) where all features are covered by separate cases for easier and faster start.
