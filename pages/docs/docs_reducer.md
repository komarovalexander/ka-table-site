---
title: "Reducer"
keywords: ka-table, react table, reducer, kaReducer, customReducer
description: kaReducer returns the new props of ka-table by the previous props and an action; how to extend it with a custom reducer.
sidebar: mydoc_sidebar
search: include
permalink: docs_reducer.html
url: docs_reducer.html
toc: true
id: reducer
---

## Definition
Reducer is a function which takes previous props and action and returns new props

```js
kaReducer(prevProps, action) // returns new props
```

`kaReducer` doesn't mutate the previous props. Its type is `<TData>(props: ITableProps<TData>, action: TableAction | CustomAction) => ITableProps<TData>`: an action of your own code (a `type` which is not a type of the table) returns the same props.

## kaReducer
`kaReducer` processes all the [predefined actions](./docs_action.html#predefined-actions). A controlled table passes every action to it and stores the props which it returns, see the example in [Controlled mode](./docs_controlled_mode.html#basic-example). A table with its own state calls `kaReducer` itself.

## Custom Reducer
kaReducer can be combined/extended/replaced with custom reducers:

```js
// extend kaReducer
const customReducer = (prevProps, action) => {
  switch(action.type){
    case "MY_CUSTOM_ACTION": return { ...prevProps, editableCells: [] };
    default: return kaReducer(prevProps, action);
  }
};
```

A table with its own state (without `dispatch`) takes such a reducer as `customReducer` of `useTable`: it gets the props which `kaReducer` returned, the action and the previous props.

```tsx
interface ResetSearchAction { type: 'RESET_SEARCH' }

const table = useTable<Row>({
  // the own actions are added to the type of the parameter
  customReducer: (nextState, action: TableAction | ResetSearchAction, prevState) => (
    action.type === 'RESET_SEARCH' ? { ...nextState, searchText: '' } : nextState
  ),
});
table.dispatch({ type: 'RESET_SEARCH' });
```
