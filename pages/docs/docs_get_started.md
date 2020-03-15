---
title: Getting Started
keywords: ka-table, react table, flux, redux
sidebar: mydoc_sidebar
search: include
permalink: docs_get_started.html
url: docs_get_started.html
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

## Usage

### ka-table implements "state - view - action - reducer" pattern
*Thanks to Redux for the inspiration*

![Pattern](./images/pattern.png)

All changes of grid performs by dispatching action

    dispatch({
      type: 'ACTION_TYPE',
      ...payload
    })

Because of it every change in Table can be controlled:

    // (1) state - (2) view - (3) action - (4) reducer
    const OverviewDemo: React.FC = () => {
      const [option, changeOptions] = useState(tableOption); // (1) state
      const dispatch: DispatchFunc = (action) => {
        // subscribe to dispatch: takes (3) action as an argument
        // and change (1) state by passing previous state and action to kaReducer
        changeOptions((prevState: ITableOption) => kaReducer(prevState, action)); // (4) reducer
      };

      return (
        <Table
          {...option}
          dispatch={dispatch}
        /> // (2) table is only view logic and it renders by state
           //and dispatches action using 'dispatch' function
      );
    };

### Basic example


```js
import React, { useState } from 'react';

import { ITableOption, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { kaReducer } from 'ka-table/reducers';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableOption = {
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
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default OverviewDemo;
```

[Example link](https://komarovalexander.github.io/ka-table/#/sorting)