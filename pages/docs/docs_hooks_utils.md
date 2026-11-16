---
title: "Hooks and Utils"
keywords: ka-table, react table, useTable, useTableInstance, useTableSelector, kaPropsUtils, hooks, utils
description: The hooks of ka-table (useTable, useTableInstance, useTableSelector) and the utils to read the data of the table from its props.
sidebar: mydoc_sidebar
search: include
permalink: docs_hooks_utils.html
url: docs_hooks_utils.html
toc: true
id: hooksutils
---

The hooks give your code the state of a table which keeps its own state (a table without `dispatch`, see [Getting Started](./docs_get_started.html#read-and-change-the-state)). The utils read the data of any table from its props.

## useTable()

Returns a value to pass to `table` property of the component
```js
import { Table, useTable } from 'ka-table';

const table = useTable({
  onDispatch: (action, tableState, prevState) => { // subscription to all actions in the table (optional) 

  },
  customReducer: (nextState, action, prevState) => { // add additional actions or override current behavior (optional) 
    //...
    return newState;
  }
});

return <Table 
        table={table} 
        rowKeyField="id"
        columns={[]}
        data={[]} />
```

In TypeScript `useTable<Row>()` creates a typed instance: `table.props.data` is `Row[]`. `onDispatch` and `customReducer` get a `TableAction`, which is narrowed by `action.type`; add the types of your own actions to the parameter: `onDispatch: (action: TableAction | MyAction) => {}`. `getTable()` creates an instance outside of function components.

## useTableInstance()

Returns a value which was passed to `table` property of the component, can be used if table is in uncontrolled mode
```js
import { useTableInstance } from 'ka-table';

const table = useTableInstance(); // useTableInstance<Row>() in TypeScript
```

## useTableSelector()

Returns a value selected from the state of the table and re-renders the component only when this value changes
(Demo: [Selection - Single](https://komarovalexander.github.io/ka-table/#/selection-single))
```js
import { useTable, useTableSelector } from 'ka-table';

const table = useTable();
const selectedId = useTableSelector(table, (props) => props.selectedRows?.[0]);
// isEqual (the third argument) compares the values when the selector returns a new object every time
```


## kaPropsUtils

Set of specific functions used for parsing table props
```js
import { kaPropsUtils } from 'ka-table/utils';
```

### kaPropsUtils.getData(tableProps)

Obtains sorted, filtered, grouped, paged data for table according to current props
(Demo: [Get Data By Props](https://komarovalexander.github.io/ka-table/#/get-data-by-props))

```js
const data = kaPropsUtils.getData(tableProps);
```

### kaPropsUtils.getFilteredData(tableProps)

Obtains filtered data

```js
const filteredData = kaPropsUtils.getFilteredData(tableProps);
```

### kaPropsUtils.getSelectedData(tableProps)

Obtains selected data for table according to current props
(Demo: [Selection - Single](https://komarovalexander.github.io/ka-table/#/selection-single))

```js
const selectedData = kaPropsUtils.getSelectedData(tableProps);
```

### kaPropsUtils.areAllFilteredRowsSelected(tableProps)

returns true if all filtered rows are selected

```js
const areAllFilteredRowsSelected = kaPropsUtils.areAllFilteredRowsSelected(tableProps);
```

### kaPropsUtils.areAllVisibleRowsSelected(tableProps)

returns true if all visible rows are selected

```js
const areAllVisibleRowsSelected = kaPropsUtils.areAllVisibleRowsSelected(tableProps);
```

### kaPropsUtils.getSortedColumns(tableProps)

returns array of columns with sortDirection only, and they are sorted by sortIndex (if it is set)

```js
const sortedColumns = kaPropsUtils.getSortedColumns(tableProps);
```

### kaPropsUtils.isValid(tableProps)

returns true if the open editors have no validation errors

```js
const isValid = kaPropsUtils.isValid(tableProps);
```

## kaDateUtils

```js
import { kaDateUtils } from 'ka-table/utils';

kaDateUtils.getDate('2021-11-08'); // a Date of a date, a timestamp or a string; a date without time is the local date
kaDateUtils.getDateInputValue(date); // the value of <input type='date'> (YYYY-MM-DD)
kaDateUtils.getDateFromInputValue(inputValue, previousValue); // the value of the input in the type of the previous value
```

## kaPagingUtils

```js
import { kaPagingUtils } from 'ka-table/utils';

kaPagingUtils.getPagesCount(data, paging);
kaPagingUtils.getPageData(data, paging);
kaPagingUtils.getPageIndex(paging, pagesCount); // the page index inside the pages
kaPagingUtils.getPagingWithPageSize(paging, pageSize); // the paging which keeps the first row of the page shown
```
