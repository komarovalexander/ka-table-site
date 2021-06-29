---
title: "Props"
keywords: ka-table, react table, flux, redux, api
sidebar: mydoc_sidebar
search: include
permalink: docs_props.html
url: docs_props.html
toc: true
id: props
---

## Table

| Name | Type &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description |
| --- | --- | --- |
| childComponents | [<code>ChildComponents</code>](#childcomponents)| customization logic for ka-table parts (cells, rows, editors, etc.) (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| columnReordering | <code>boolean</code> | Enables columns reordering using drag and drop |
| columnResizing | <code>boolean</code> | Enables columns resizing |
| columns | [<code>Column[]</code>](#column) | Columns in table and their look and behaviour |
| data | <code>any[]</code> | The Table's data |
| dispatch | <code>(action) => any</code> | The function takes action as an argument, is used as a notification about any changes and events in the Table |
| editableCells | [<code>EditableCell[]</code>](#editablecell) | Array of cells currently editing (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| editingMode | 'cell' <br/> 'none' | Sets the table's editing mode (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| extendedFilter | <code>(data: any[]) => boolean</code> | adds additional filtering layer [Demo](http://localhost:3000/ka-table/#/filter-extended) |
| filter | <code>(props: { <br/>column: Column  <br/>}) => ((value: any, filterRowValue: any) => boolean) | void;</code> | Returns filter function (Demo: [Filter Custom Logic](https://komarovalexander.github.io/ka-table/#/filter-row-custom-logic)) |
| filteringMode | 'filterRow' <br/> 'none' | Show filter UI elements in Table (Demo: [Filter Row Example](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| focused | <code>{<br/> cell?: {<br/>  columnKey: string,<br/>  rowKeyValue: any<br/> },<br/> cellEditorInput?: {<br/>  columnKey: string,<br/>  rowKeyValue: any<br/> },<br/>}</code> | stores information about the currently focused element (Demo: [Keyboard navigation](https://komarovalexander.github.io/ka-table/#/keyboard-navigation))  |
| format | <code>(props: { <br/>value: any, <br/>column: Column <br/>}) => any</code> | Returns formated cell string (Demo: [Example](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| groups | [<code>Group[]</code>](#group) | Group's in the table (Demo: [Grouping Example](https://komarovalexander.github.io/ka-table/#/grouping)) |
| groupsExpanded | <code>any[][]</code> | Expanded groups - array of group keys |
| height | <code>string | number</code> | height of the component |
| loading | <code>{ <br/>enabled?: boolean, <br/>text?: string <br/>}</code>| Loading indicator options (Demo: [Loading](https://komarovalexander.github.io/ka-table/#/loading)) |
| paging | <code>{<br/>enabled?: boolean;<br/>pageIndex?: number;<br/>pageSize?: number;<br/>pagesCount?: number;<br/>position: ('bottom'|'top'|'topAndBottom') <br/>}</code> | Paging settings (Demo: [Paging](https://komarovalexander.github.io/ka-table/#/paging)) |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| rowReordering | <code>boolean</code> | Enables rows reordering using drag and drop |
| search | <code>(props: { <br/>searchText: string, <br/>rowData: any, <br/>column: Column <br/>}) => boolean</code> | Overrides the default search method for the cell. Executes if [Table.search](#Table.searchText) option is set |
| searchText <a name="Table.searchText"></a> | <code>string</code> | Specifies the text for search by data (Demo: [Search Example](https://komarovalexander.github.io/ka-table/#/search)) |
| selectedRows | <code>any[]</code> | Array of selected rows keys (Demo: [Selection Example](https://komarovalexander.github.io/ka-table/#/selection)) |
| singleAction | <code>any</code> | dispathes only ones after Table render (Demo: [Remote Data](https://komarovalexander.github.io/ka-table/#/remote-data)), after this action ka-table will dispatch 'ClearSingleAction' to set singleAction as undefined |
| sort | <code>(props: { <br/>column: Column</br> }) =>  ((value1: any, value2: any) => 0 | 1 | -1) | void;</code> | Returns sorting function (Demo: [Sorting Custom Logic](https://komarovalexander.github.io/ka-table/#/sorting-custom-logic)) |
| sortingMode | 'single' <br/> 'singleTripleState' <br/> 'singleRemote' <br/> 'singleTripleStateRemote' <br/> 'multipleRemote' <br/> 'multipleTripleStateRemote' <br/> 'none' | Sorting mode. <br/> *Remote* - means only grid elements are updated but data should be sorted outside of the grid. <br/>*TripleState* - means: "ascend - descend - no sorting" <br/>(Demo: [Sorting Example](https://komarovalexander.github.io/ka-table/#/sorting)) |
| validation | <code>(props: { <br/>value: any, <br/>rowData: any, <br/>column: Column <br/>}) => (string | void)</code> | Returns the validation error string or does not return anything in case of passed validation (Demo: [Validation Example](https://komarovalexander.github.io/ka-table/#/validation)) |
| virtualScrolling | [<code>VirtualScrolling</code>](#virtualscrolling) | Virtual scrolling options (Demo: [Many Rows Example](https://komarovalexander.github.io/ka-table/#/many-rows)) |
| width | <code>string | number</code> | width of the component |


## Column

| Name | Type  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | Description |
| --- | --- | --- |
| dataType | 'boolean' <br /> 'date' <br /> 'number' <br /> 'object' <br /> 'string' | Specifies the type of column |
| filterRowOperator | <code>string</code> | Sets filter row operator (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)). Predefined filter operators are:  '=', '>', '<', '>=', '<=', 'contains'  |
| filterRowValue | <code>any</code> | Sets filter row value (Demo: [Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| field | <code>string</code> | Specifies the property of data's object which value will be used in column, if null value from key option will be used |
| isEditable | <code>boolean</code> | Specifies can a column be editable or not |
| isResizable | <code>boolean</code> | Specifies can a column be resized or not (Demo: [Column Resizing](https://komarovalexander.github.io/ka-table/#/column-resizing)) |
| key | <code>string</code> | Mandatory field, specifies unique key for the column |
| sortDirection | 'ascend' <br/> 'descend' | Sets the direction of sorting for the column (Demo: [Sorting](https://komarovalexander.github.io/ka-table/#/sorting)) |
| sortIndex | <code>number</code>  | The priority of the column for sorting (Demo: [Sorting](https://komarovalexander.github.io/ka-table/#/sorting)) |
| style | <code>React.CSSProperties</code> | Sets the style options of the elements |
| title | <code>string</code> | Specifies the text of the header |
| visible | <code>boolean</code> | Shows/Hides columns |


## EditableCell
Describes the editor of a cell in the table

| Name | Type | Description |
| --- | --- | --- |
| columnKey | <code>string</code> | the key of specific column |
| rowKeyValue | <code>any</code> | data's key value of every specific row |
| editorValue | <code>any</code> | value of the editor |
| validationMessage | <code>any</code> | validation message of the column |


## ChildComponents
Provides ability to customize grid inner components

Demos: [Events Demo](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)

| Name | Type | Element | Demo |
| --- | --- | --- | --- |
| cell | [<code>ChildComponent</code>](#childcomponentt)<[ICellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | |
| cellEditor | [<code>ChildComponent</code>](#childcomponentt)<[ICellEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/custom-editor) |
| cellEditorInput | [<code>ChildComponent</code>](#childcomponentt)<[ICellEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | input | [Demo](https://komarovalexander.github.io/ka-table/#/keyboard-navigation) |
| cellText | [<code>ChildComponent</code>](#childcomponentt)<[ICellTextProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/custom-cell) |
| dataRow | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/custom-data-row) |
| detailsRow | [<code>ChildComponent</code>](#childcomponentt)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/details-row) |
| filterRowCell | [<code>ChildComponent</code>](#childcomponentt)<[IFilterRowEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Demo](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor) |
| pagingIndex | [<code>ChildComponent</code>](#childcomponentt)<[IPagingIndexProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/bootstrap) |
| pagingPages | [<code>ChildComponent</code>](#childcomponentt)<[IPagingPagesProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/bootstrap) |
| groupCell | [<code>ChildComponent</code>](#childcomponentt)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Demo](https://komarovalexander.github.io/ka-table/#/grouping-custom-cell) |
| groupRow | [<code>ChildComponent</code>](#childcomponentt)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/grouping-custom-row) |
| groupSummaryCell | [<code>ChildComponent</code>](#childcomponentt)<[IGroupSummaryCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts)> | td | [Demo](https://komarovalexander.github.io/ka-table/#/grouping-summary) |
| groupSummaryRow | [<code>ChildComponent</code>](#childcomponentt)<[IGroupSummaryRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts)> | tr |  |
| headCell | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | th | [Demo](https://komarovalexander.github.io/ka-table/#/custom-header-cell) |
| headCellContent | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/column-reordering) |
| headCellResize | [<code>ChildComponent</code>](#childcomponentt)<[IHeadCellResizeProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |
| noDataRow | [<code>ChildComponent</code>](#childcomponentt)<[INoDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/search) |
| rootDiv | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](#table)> | .ka div |  |
| summaryCell | [<code>ChildComponent</code>](#childcomponentt)<[ISummaryCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts)> | td | [Demo](https://komarovalexander.github.io/ka-table/#/summary) |
| summaryRow | [<code>ChildComponent</code>](#childcomponentt)<[ISummaryRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts)> | tr |  |
| table | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](#table)> | table |  |
| tableBody | [<code>ChildComponent</code>](#childcomponentt)<[ITableBodyProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tbody |  |
| tableFoot | [<code>ChildComponent</code>](#childcomponentt)<[ITableFootProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts)> | tfoot |  |
| tableHead | [<code>ChildComponent</code>](#childcomponentt)<[ITableHeadProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | thead |  |
| tableWrapper | [<code>ChildComponent</code>](#childcomponentt)<[ITableProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div |  |

#### ChildComponent&lt;T&gt;

| Name | Type | Element |
| --- | --- | --- |
| elementAttributes | <code>(props: PropsWithChildren&lt;T&gt;) => </code> [<code>ChildAttributesItem&lt;T&gt;</code>](#childattributesitemt) | [Events Demo](https://komarovalexander.github.io/ka-table/#/events) |
| content | <code>(props: PropsWithChildren&lt;TProps&gt;) => any </code> | [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell) |

#### ChildAttributesItem&lt;T&gt;
This object is an extension for React HTMLAttributes. It contains all attributes and all [react Synthetic Events](https://reactjs.org/docs/events.html), but in each event it adds a second parameter which contains additional data with [<code>AttributeTableData type</code>](#attributetabledatat).


#### AttributeTableData&lt;T&gt;
A second parameter in each [react Synthetic Event](https://reactjs.org/docs/events.html). Contains component-related information.

| Name | Type | Description |
| --- | --- | --- |
| baseFunc | <code>any</code> | Contains default function for overrided function - it is easy to add additional logic and execute default behaviour where you want it |
| childElementAttributes | <code>HTMLAttributes&lt;HTMLElement&gt;</code> | Default HTMLAttributes of the component |
| childProps | <code>T</code> | Props of the component |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |


## Group

| Name | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The grouped column's field |
| enableSummary | <code>boolean</code> | Enable summary row for the group |


## VirtualScrolling

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | Enables virtual scrolling |
| scrollPosition | <code>number</code> | Current scroll top position |
| itemHeight | <code>((data: any) => number)</code> \| <code>number</code> | Returns height of specific row |
| tbodyHeight | <code>number</code> | tbody height |

You can set VirtualScrolling as empty object {} to enable virtual scrolling and auto calculate its parameters

## kaPropsUtils

Set of specific functions used for parsing table props
```js
import { kaPropsUtils } from 'ka-table/utils';
```

#### kaPropsUtils.getData(tableProps)

Obtains sorted, filtered, grouped, paged data for table according to current props
(Demo: [Get Data By Props](https://komarovalexander.github.io/ka-table/#/get-data-by-props))

```js
  const data = kaPropsUtils.getData(tableProps);
```

#### kaPropsUtils.getSelectedData(tableProps)

Obtains selected data for table according to current props
(Demo: [Selection - Single](https://komarovalexander.github.io/ka-table/#/selection-single))

```js
  const data = kaPropsUtils.getSelectedData(tableProps);
```

#### kaPropsUtils.areAllFilteredRowsSelected(tableProps)

returns true if all filtered rows are selected

```js
  const data = kaPropsUtils.areAllFilteredRowsSelected(tableProps);
```

#### kaPropsUtils.areAllVisibleRowsSelected(tableProps)

returns true if all visible rows are selected

```js
  const data = kaPropsUtils.areAllVisibleRowsSelected(tableProps);
```

#### kaPropsUtils.getSortedColumns(tableProps)

returns array of columns with sortDirection only, and they are sorted by sortIndex (if it is set)

```js
  const data = kaPropsUtils.getSortedColumns(tableProps);
```


