---
title: "UI"
keywords: ka-table, react table, flux, redux, actions
sidebar: mydoc_sidebar
search: include
permalink: docs_ui.html
url: docs_ui.html
toc: false
---

## Definition
ka-table UI is the Table component

Table is stateless - every change of the UI can dispatch the action
```js
  <Table
    {...tableProps} // render according to props
    dispatch={dispatch} // subscribe to dispatch to be able to change tableProps
  />
```

## Elements
Every part of the UI (Row, GroupRow, Column, HeaderCell, Cell, Editors) is customizable and can be set up as a custom component ([see props](./docs_props.html))

![Pattern](./images/customisation.svg)

```js
  // custom lookup editor example

  // define editor component
  const CustomLookupEditor: React.FC<EditorFuncPropsWithChildren> = ({
    column, dispatch, rowKeyValue, value,
  }) => {
    const close = () => {
      dispatch(closeEditor(rowKeyValue, column.key));
    };
    const [editorValue, setValue] = useState(value);
    return (
      <div>
        <select
          className='form-control'
          autoFocus={true}
          defaultValue={editorValue}
          onBlur={() => {
            dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
            close();
          }}
          onChange={(event) => {
            setValue(typeUtils.toBoolean(event.currentTarget.value));
          }}>
          <option value={'true'}>True</option>
          <option value={'false'}>False</option>
        </select>
      </div >
    );
  };

  // set editor for specific column of tableProps
  const tableProps: ITableProps = {
    columns: [
      // ...
      {
        dataType: DataType.Boolean,
        editor: CustomLookupEditor,
        key: 'passed',
        title: 'Passed',
      }
      // ...
    ],
    // ...
  };
```


## Attributes
Attributes of the UI elements also can be customized using [childAttributes](./docs_props.html#childattributes) ([see Events demo](https://komarovalexander.github.io/ka-table/#/events){:target="_blank"}).

```js
  const childAttributes = {
    cell: {
      className: 'my-cell-class', // add custom class to cell element
      onClick: (e, extendedEvent) => {  // additional onClick handler for cell
        const { childProps: { dispatch } } = extendedEvent;
        dispatch('MY_CELL_onClick', { extendedEvent });
      },
    },
    dataRow: {
      onContextMenu: (e, extendedEvent) => { // additional onContextMenu handler for dataRow
        extendedEvent.dispatch('MY_CELL_onContextMenu', { extendedEvent });
      },
    }
  };
```

## UI Actions
There are [actions](./docs_action.html) which ka-table UI dispatches in response to user interaction out-of-the-box:

| Action Type | UI event |
| --- | --- |
| 'CloseEditor' | click outside editor or Enter Key press (to apply value) or ESC press (to discard changes) |
| 'UpdateGroupsExpanded' | click by group arrow cell |
| 'OpenEditor' | click by data cell |
| 'UpdateCellValue' | click outside editor or Enter Key press - executes before 'CloseEditor' action |
| 'UpdateFilterRowValue' | each change of value in filter row editor |
| 'UpdatePageIndex' | click by page number |
| 'UpdateSortDirection' | click by sort button |
