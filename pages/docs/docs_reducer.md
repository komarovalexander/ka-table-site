---
title: "Reducer"
keywords: ka-table, react table, flux, redux, actions
sidebar: mydoc_sidebar
search: include
permalink: docs_reducer.html
url: docs_reducer.html
toc: false
---

Reducer is an object which takes previous props and action and returns new props

There is predefined kaReducer

```js
  // example with hooks,
  // in this case props are stored in the state
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => { // describe how to behave when action is dispatched
    changeTableProps((prevProps: ITableOption) =>
      kaReducer(prevProps, action) // kaReducer returns new props to the state to update the Table
    );
  };
  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
    />
  );
```

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
