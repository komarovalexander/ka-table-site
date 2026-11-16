---
title: 'Customization'
keywords: ka-table, react table, customization, childComponents, custom cell, custom editor, keyboard, accessibility, fixed columns
description: How to customize the parts of ka-table with childComponents - attributes, events, content and editors - and the keyboard navigation and the fixed columns.
sidebar: mydoc_sidebar
search: include
permalink: docs_ui.html
url: docs_ui.html
id: ui
toc: true
---

The table renders its UI according to the [props](./docs_props.html), and every change of the UI is an [action](./docs_action.html). Every part of the UI can be customized without replacing the table: add attributes and event handlers to an element or render your own content in it.

## Elements

Every part of the UI (Row, GroupRow, Column, HeaderCell, Cell, Editors) is a child component: its attributes and its content are customized by the `childComponents` prop, see the [list of the child components](#childcomponents)

![Pattern](./images/customisation.svg)

## Attributes and content

A child component has two options: `elementAttributes` returns the attributes and the event handlers of its element, they are merged with the default ones, and `content` returns its content, `undefined` keeps the default one (see [Events Demo](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)).

```js
const childComponents = {
  cell: {
    elementAttributes: (props) => ({
      className: 'my-cell-class', // add custom class to cell element
      onClick: (e, extendedEvent) => {  // additional onClick handler for cell
        const { childProps: { dispatch } } = extendedEvent;
        dispatch({ type: 'MY_CELL_onClick', extendedEvent });
      },
    }),
    content: (props) => (props.column.key === 'someKey' ? <div>Custom Content</div> : undefined), // default in case nothing is returned
  },
  dataRow: {
    elementAttributes: (props) => ({
      onContextMenu: (e, extendedEvent) => { // additional onContextMenu handler for dataRow
        extendedEvent.dispatch({ type: 'MY_CELL_onContextMenu', extendedEvent });
      },
    })
  }
};
```

## Custom editor

`cellEditor` replaces the editor of a cell. The editor dispatches the actions of the table to save the value and to close itself:

```tsx
import { closeEditor, updateCellValue } from 'ka-table/actionCreators';

// custom lookup editor example

// define editor component
const CustomLookupEditor: React.FC<ICellEditorProps> = ({
  column, dispatch, rowKeyValue, value,
}) => {
  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };
  // value is unknown: the column has booleans
  const [editorValue, setValue] = useState(value === true);
  return (
    <div>
      <select
        className='form-control'
        autoFocus={true}
        defaultValue={String(editorValue)}
        onBlur={() => {
          dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
          close();
        }}
        onChange={(event) => {
          setValue(event.currentTarget.value === 'true');
        }}>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};
const childComponents = {
    cellEditor: {
        content: (props) => {
            switch (props.column.key) {
              case 'passed': return <CustomLookupEditor {...props}/>;
            }
        }
    }
};

// set editor for specific column of tableProps
<Table
  columns={[
    // ...
    {
      dataType: DataType.Boolean,
      key: 'passed',
      title: 'Passed',
    }
    // ...
  ]}
  childComponents={childComponents}
  // ...
/>
```

Demo: [Custom Editor](https://komarovalexander.github.io/ka-table/#/custom-editor)

## ChildComponents
All the child components of the table. Every one is a [`ChildComponent`](#childcomponentt) with the props of its element; the types of the props are in [props.ts](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts).

Demos: [Events Demo](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)

<!-- generated:start ChildComponents: from the JSDoc of src/lib/Models/ChildComponents.ts, edit it and run yarn docs -->

| Name | Type | Element | Demo |
| --- | --- | --- | --- |
| cell | [<code>ChildComponent</code>](#childcomponentt)<[ICellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td |  |
| cellEditor | [<code>ChildComponent</code>](#childcomponentt)<[ICellEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Custom Editor](https://komarovalexander.github.io/ka-table/#/custom-editor) |
| cellEditorInput | [<code>ChildComponent</code>](#childcomponentt)<[ICellEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | input | [Keyboard Navigation](https://komarovalexander.github.io/ka-table/#/keyboard-navigation) |
| cellText | [<code>ChildComponent</code>](#childcomponentt)<[ICellTextProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell) |
| dataRow | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Custom Row](https://komarovalexander.github.io/ka-table/#/custom-data-row) |
| detailsRow | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Details Row](https://komarovalexander.github.io/ka-table/#/details-row) |
| detailsCell | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Details Row](https://komarovalexander.github.io/ka-table/#/details-row) |
| filterRowCell | [<code>ChildComponent</code>](#childcomponentt)<[IFilterRowEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Filter Row - Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor) |
| filterRowCellInput | [<code>ChildComponent</code>](#childcomponentt)<[IFilterRowEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | input |  |
| groupCell | [<code>ChildComponent</code>](#childcomponentt)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Grouping Custom Cell](https://komarovalexander.github.io/ka-table/#/grouping-custom-cell) |
| groupExpandButton | [<code>ChildComponent</code>](#childcomponentt)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| groupPanel | [<code>ChildComponent</code>](#childcomponentt)<[IGroupPanelProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Grouping](https://komarovalexander.github.io/ka-table/#/grouping) |
| groupPanelCell | [<code>ChildComponent</code>](#childcomponentt)<[IGroupPanelCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Grouping](https://komarovalexander.github.io/ka-table/#/grouping) |
| groupRow | [<code>ChildComponent</code>](#childcomponentt)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Grouping Custom Row](https://komarovalexander.github.io/ka-table/#/grouping-custom-row) |
| groupSummaryCell | [<code>ChildComponent</code>](#childcomponentt)<[IGroupSummaryCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Grouping Summary](https://komarovalexander.github.io/ka-table/#/grouping-summary) |
| groupSummaryRow | [<code>ChildComponent</code>](#childcomponentt)<[IGroupSummaryRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr |  |
| headCell | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | th | [Custom Header Cell](https://komarovalexander.github.io/ka-table/#/custom-header-cell) |
| headCellContent | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Column Reordering](https://komarovalexander.github.io/ka-table/#/column-reordering) |
| headCellResize | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellResizeProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| headerFilterButton | [<code>ChildComponent</code>](#childcomponentt)<[IHeaderFilterButtonProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | span |  |
| headerFilterPopupSearchInput | [<code>ChildComponent</code>](#childcomponentt)<[IFilterRowEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | input |  |
| headRow | [<code>ChildComponent</code>](#childcomponentt)<[IHeadRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr |  |
| loading | [<code>ChildComponent</code>](#childcomponentt)<[ILoadingProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| emptyCell | [<code>ChildComponent</code>](#childcomponentt)<[IEmptyCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td |  |
| noDataCell | [<code>ChildComponent</code>](#childcomponentt)<[INoDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td |  |
| noDataRow | [<code>ChildComponent</code>](#childcomponentt)<[INoDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Search](https://komarovalexander.github.io/ka-table/#/search) |
| paging | [<code>ChildComponent</code>](#childcomponentt)<[IPagingProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| pagingIndex | [<code>ChildComponent</code>](#childcomponentt)<[IPagingIndexProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | li | [Bootstrap](https://komarovalexander.github.io/ka-table/#/bootstrap) |
| pagingPages | [<code>ChildComponent</code>](#childcomponentt)<[IPagingProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | ul | [Bootstrap](https://komarovalexander.github.io/ka-table/#/bootstrap) |
| pagingSize | [<code>ChildComponent</code>](#childcomponentt)<[IPagingSizeProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | li | [Paging](https://komarovalexander.github.io/ka-table/#/paging) |
| pagingSizes | [<code>ChildComponent</code>](#childcomponentt)<[IPagingProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | ul | [Paging](https://komarovalexander.github.io/ka-table/#/paging) |
| headerFilterPopupContent | [<code>ChildComponent</code>](#childcomponentt)<[IPopupContentProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| headerFilterPopupRow | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps&lt;HeaderFilterItem&gt;](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Header Filter - Logic](https://komarovalexander.github.io/ka-table/#/header-filter-logic) |
| headerFilterPopupTextCell | [<code>ChildComponent</code>](#childcomponentt)<[ICellProps&lt;HeaderFilterItem&gt;](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Header Filter - Logic](https://komarovalexander.github.io/ka-table/#/header-filter-logic) |
| rootDiv | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](./docs_props.html#table)> | div.ka |  |
| sortIcon | [<code>ChildComponent</code>](#childcomponentt)<[ISortIconProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | span | [Sorting](https://komarovalexander.github.io/ka-table/#/sorting) |
| summaryCell | [<code>ChildComponent</code>](#childcomponentt)<[ISummaryCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Summary](https://komarovalexander.github.io/ka-table/#/summary) |
| summaryRow | [<code>ChildComponent</code>](#childcomponentt)<[ISummaryRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr |  |
| table | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](./docs_props.html#table)> | table |  |
| tableBody | [<code>ChildComponent</code>](#childcomponentt)<[ITableBodyProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tbody |  |
| tableFoot | [<code>ChildComponent</code>](#childcomponentt)<[ITableFootProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tfoot |  |
| tableHead | [<code>ChildComponent</code>](#childcomponentt)<[ITableHeadProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | thead |  |
| tableWrapper | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](./docs_props.html#table)> | div |  |

<!-- generated:end -->

### ChildComponent&lt;T&gt;

<!-- generated:start ChildComponent: from the JSDoc of src/lib/Models/ChildComponent.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| elementAttributes | <code>(props: PropsWithChildren&lt;T&gt;) =&gt; </code>[<code>ChildAttributesItem</code>](#childattributesitemt)<code>&lt;T&gt; &#124; void</code> | (Demo: [Events Demo](https://komarovalexander.github.io/ka-table/#/events)) |
| content | <code>(props: PropsWithChildren&lt;T&gt;) =&gt; ReactNode &#124; Promise&lt;ReactNode&gt;</code> | `undefined` renders the default content. A function component can be passed as `content` (Demo: [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |

<!-- generated:end -->

With `memoizedRows` declare `childComponents` outside of the component (or memoize it), otherwise all the rows are re-rendered.

### ChildAttributesItem&lt;T&gt;
This object is an extension for React HTMLAttributes. It contains all attributes and all [react Synthetic Events](https://react.dev/reference/react-dom/components/common#react-event-object), but in each event it adds a second parameter which contains additional data with [<code>AttributeTableData type</code>](#attributetabledatat).


### AttributeTableData&lt;T&gt;
A second parameter in each [react Synthetic Event](https://react.dev/reference/react-dom/components/common#react-event-object). Contains component-related information.

<!-- generated:start AttributeTableData: from the JSDoc of src/lib/Models/AttributeTableData.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| baseFunc | <code>(...args: unknown[]) =&gt; void</code> | Contains the default function of the overridden attribute, e.g. the `onClick` which the table sets: it is easy to add additional logic and execute the default behaviour where you want it |
| childElementAttributes | <code>AllHTMLAttributes&lt;HTMLElement&gt;</code> | Default HTMLAttributes of the component |
| childProps | <code>T</code> | Props of the component |
| dispatch | <code>(action: </code>[<code>TableAction</code>](./docs_action.html#typescript)<code> &#124; </code>[<code>CustomAction</code>](./docs_action.html#custom-actions)<code>) =&gt; void</code> | Dispatches an action of the table or of your own code |

<!-- generated:end -->

## UI Actions

There are [actions](./docs_action.html) which ka-table UI dispatches in response to user interaction out-of-the-box:

| Action Type | UI event |
| --- | --- |
| `'CloseEditor'` | click outside editor or Enter Key press (to apply value) or ESC press (to discard changes) |
| `'GroupColumn'` | drag and drop the column to the group panel |
| `'OpenEditor'` | click by data cell, Enter or F2 on the focused cell |
| `'ReorderColumns'` | drag and drop the column |
| `'ReorderRows'` | drag and drop the row |
| `'ResizeColumn'` | drag and drop of the right border of the column |
| `'ScrollTable'` | scrolling of a table with virtual scrolling to other rows or columns |
| `'SetFocused'` | a cell or a group row gets the focus: by a click, Tab or the keys of the keyboard navigation |
| `'UngroupColumn'` | click by the cross of a column in the group panel |
| `'UpdateCellValue'` | click outside editor or Enter Key press - executes before `'CloseEditor'` action |
| `'UpdateEditorValue'` | click outside editor or Enter Key press after the value is changed, when `editingMode` is not `'cell'` (the editors of `openRowEditors` and `openAllEditors`): the value is kept in _editableCells_ |
| `'UpdateFilterRowValue'` | each change of value in filter row editor |
| `'UpdateGroupsExpanded'` | click by group arrow cell |
| `'UpdateHeaderFilterPopupState'` | click by the header filter button of a column: the popup is shown or hidden |
| `'UpdateHeaderFilterSearchValue'` | each change of the search text in the header filter popup |
| `'UpdateHeaderFilterValues'` | a value is checked or unchecked in the header filter popup |
| `'UpdatePageIndex'` | click by page number |
| `'UpdatePageSize'` | click by page size |
| `'UpdatePopupPosition'` | the header filter popup is shown |
| `'UpdateSortDirection'` | click by sort button |
| `'UpdateTreeGroupsExpanded'` | click by the arrow of a tree row |

## Keyboard and accessibility

The keyboard navigation is enabled by default (`keyboardNavigation={false}` turns it off): the table is a WAI-ARIA grid (a treegrid for a tree) with a single Tab stop.

| Keys | Action |
| --- | --- |
| Tab | focuses the table: the last focused cell or the first one |
| Arrows | move the focus between the cells, with Ctrl or Cmd to the last one |
| Home, End | the first and the last cell of the row, with Ctrl or Cmd of the page |
| PageUp, PageDown | change the page if `paging` is enabled |
| Enter, F2 | open the editor of the cell (`EditingMode.Cell`), the focus returns to the cell when the editor is closed |
| Enter, Space, Left, Right on a group row | expand and collapse the group |
| Enter, Space on the cell with the arrow of a tree row | expand and collapse the row |

The focused cell is kept in `focused.cell` (a group row in `focused.group`). A controlled table has to pass `SetFocused` actions to `kaReducer` as all the other actions. Sorting, paging, the group panel, the header filter and the validation messages have ARIA roles, states and names.

Demo: [Keyboard Navigation](https://komarovalexander.github.io/ka-table/#/keyboard-navigation)

## Fixed columns

`fixed: 'left'` or `fixed: 'right'` of a column makes it stick to the edge of the table when it is scrolled horizontally. The fixed columns need a numeric `width`: the offset of a column is the width of the other fixed columns of its edge.

```js
columns={[
  { key: 'name', title: 'Name', width: 200, fixed: 'left' },
  // ...
  { key: 'actions', width: 80, fixed: 'right' },
]}
```

Demo: [Fixed Column](https://komarovalexander.github.io/ka-table/#/fixed-column)

## Themes

The themes, the CSS custom properties and the styles of Bootstrap and Material UI are described in [Themes](./docs_themes.html).
