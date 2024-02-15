---
title: "UI"
keywords: ka-table, react table, flux, redux, actions
sidebar: mydoc_sidebar
search: include
permalink: docs_ui.html
url: docs_ui.html
id: ui
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
  <Table
    columns={[
      // ...
      {
        dataType: DataType.String,
        key: 'passed',
        title: 'Passed',
      }
      // ...
    ]}
    childComponents={{
        cellEditor: {
            content: (props) => {
                switch (props.column.key) {
                  case 'passed': return <CustomLookupEditor {...props}/>;
                }
            }
        }
    }}
    // ...
  />
```


## Child Components
Attributes & Components of the child UI elements also can be customized using [childComponents](./docs_props.html#childcomponents) (see [Events Demo](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)).

```js
  const childComponents = {
    cell: {
      elementAttributes: (props) => ({
        className: 'my-cell-class', // add custom class to cell element
        onClick: (e, extendedEvent) => {  // additional onClick handler for cell
          const { childProps: { dispatch } } = extendedEvent;
          dispatch('MY_CELL_onClick', { extendedEvent });
        },
      }),
      content: (props) => props.column.key === 'someKey' && <div>Custom Content</div>; // default in case nothing is returned
    }
    dataRow: {
      elementAttributes: (props) => ({
        onContextMenu: (e, extendedEvent) => { // additional onContextMenu handler for dataRow
          extendedEvent.dispatch('MY_CELL_onContextMenu', { extendedEvent });
        },
      })
    }
  };
```

## UI Actions
There are [actions](./docs_action.html) which ka-table UI dispatches in response to user interaction out-of-the-box:

| Action Type | UI event |
| --- | --- |
| 'CloseEditor' | click outside editor or Enter Key press (to apply value) or ESC press (to discard changes) |
| 'OpenEditor' | click by data cell |
| 'ReorderColumns' | drag and prop the column |
| 'ReorderRows' | drag and prop the row |
| 'ResizeColumn' | drag and drop of the right border of the column |
| 'UpdateCellValue' | click outside editor or Enter Key press - executes before 'CloseEditor' action |
| 'UpdateFilterRowValue' | each change of value in filter row editor |
| 'UpdateGroupsExpanded' | click by group arrow cell |
| 'UpdatePageIndex' | click by page number |
| 'UpdateSortDirection' | click by sort button |

## Themes
##### Customization
To override colors, sizes and paddings you can use sass valiables: [default.scss](https://github.com/komarovalexander/ka-table/blob/master/src/lib/static/themes/default.scss)

Demo: [Custom Theme](https://komarovalexander.github.io/ka-table/#/custom-theme)

##### 3-rd party libraries
As ka-table is a real html table it can be easily used with bootstrap, material or other frameworks.

To use other frameworks styles add required css classes for table elements using [childComponents](#child-components):

[Bootstrap Demo](https://komarovalexander.github.io/ka-table/#/bootstrap)
or
[Material UI Demo](https://komarovalexander.github.io/ka-table/#/material)

In most cases there is no need to include ka-table/styles.scss - ka-table can be used with 3rd parties styles only.