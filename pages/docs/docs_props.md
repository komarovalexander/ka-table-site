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
| childComponents | [<code>ChildComponents</code>](#childcomponents)| Object describes contains customization logic for child components (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| columns | [<code>Column[]</code>](#column) | Columns in table and their look and behaviour |
| data | <code>any[]</code> | The Table's data |
| dispatch | <code>(action) => any</code> | The function takes action as an argument, is used as a notification about any changes and events in the Table |
| editableCells | [<code>EditableCell[]</code>](#editablecell) | Array of cells currently editing (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| editingMode | 'cell' <br/> 'none' | Sets the table's editing mode (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| filteringMode | 'filterRow' <br/> 'none' | Show filter UI elements in Table (Demo: [Filter Row Example](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| format | <code>(props: { <br/>value: any, <br/>column: Column <br/>}) => any</code> | Returns formated cell string (Demo: [Example](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| groups | [<code>Group[]</code>](#group) | Group's in the table (Demo: [Grouping Example](https://komarovalexander.github.io/ka-table/#/grouping)) |
| groupsExpanded | <code>any[][]</code> | Expanded groups - array of group keys |
| loading | <code>{ <br/>enabled?: boolean, <br/>text?: string <br/>}</code>| Loading indicator options (Demo: [Loading](https://komarovalexander.github.io/ka-table/#/loading)) |
| paging | <code>{<br/>enabled?: boolean;<br/>pageIndex?: number;<br/>pageSize?: number;<br/>pagesCount?: number;<br/>}</code> | Paging settings (Demo: [Paging](https://komarovalexander.github.io/ka-table/#/paging)) |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| rowReordering | <code>boolean</code> | Enables rows reordering using drag and drop |
| search | <code>(props: { <br/>searchText: string, <br/>rowData: any, <br/>column: Column <br/>}) => boolean</code> | Overrides the default search method for the cell. Executes if [Table.search](#Table.searchText) option is set |
| searchText <a name="Table.searchText"></a> | <code>string</code> | Specifies the text for search by data (Demo: [Search Example](https://komarovalexander.github.io/ka-table/#/search)) |
| selectedRows | <code>any[]</code> | Array of selected rows keys (Demo: [Selection Example](https://komarovalexander.github.io/ka-table/#/selection)) |
| sortingMode | 'single' <br/> 'none' | Sorting mode (Demo: [Sorting Example](https://komarovalexander.github.io/ka-table/#/sorting)) |
| validation | <code>(props: { <br/>value: any, <br/>rowData: any, <br/>column: Column <br/>}) => (string | void)</code> | Returns the validation error string or does not return anything in case of passed validation (Demo: [Validation Example](https://komarovalexander.github.io/ka-table/#/validation)) |
| virtualScrolling | [<code>VirtualScrolling</code>](#virtualscrolling) | Virtual scrolling options (Demo: [Many Rows Example](https://komarovalexander.github.io/ka-table/#/many-rows)) |


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
| sortDirection | 'ascend' <br/> 'descend' | Sets the direction of sorting for the column |
| style | <code>React.CSSProperties</code> | Sets the style options of the elements |
| title | <code>string</code> | Specifies the text of the header |


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
| cell | [<code>ChildComponent</code>](#childcomponent)<[ICellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | |
| cellEditor | [<code>ChildComponent</code>](#childcomponent)<[ICellEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/custom-editor) |
| cellText | [<code>ChildComponent</code>](#childcomponent)<[ICellTextProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | div | [Demo](https://komarovalexander.github.io/ka-table/#/custom-cell) |
| dataRow | [<code>ChildComponent</code>](#childcomponent)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/custom-data-row) |
| detailsRow | [<code>ChildComponent</code>](#childcomponent)<[IDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/details-row) |
| filterRowCell | [<code>ChildComponent</code>](#childcomponent)<[IFilterRowEditorProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Demo](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor) |
| groupCell | [<code>ChildComponent</code>](#childcomponent)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | td | [Demo](https://komarovalexander.github.io/ka-table/#/grouping-custom-cell) |
| groupRow | [<code>ChildComponent</code>](#childcomponent)<[IGroupRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/grouping-custom-row) |
| headCell | [<code>ChildComponent</code>](#childcomponent)<[IHeadCellProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/custom-header-cell) |
| noDataRow | [<code>ChildComponent</code>](#childcomponent)<[INoDataRowProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | tr | [Demo](https://komarovalexander.github.io/ka-table/#/search) |
| rootDiv | [<code>ChildComponent</code>](#childcomponent)<[ITableProps](#table)> | .ka div |  |
| table | [<code>ChildComponent</code>](#childcomponent)<[ITableProps](#table)> | table |  |
| tableHead | [<code>ChildComponent</code>](#childcomponent)<[ITableHeadProps](https://github.com/komarovalexander/ka-table/blob/master/src/lib/props.ts){:target="_blank"}> | thead |  |

#### ChildComponent&lt;T&gt;

| Name | Type | Element |
| --- | --- | --- |
| elementAttributes | <code>(props: PropsWithChildren&lt;T&gt;) => </code> [<code>ChildAttributesItem&lt;T&gt;</code>](#childattributesitemt) | [Events Demo](https://komarovalexander.github.io/ka-table/#/events) |
| content | <code>(props: PropsWithChildren<TProps>) => any</code> | [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell) |

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


## VirtualScrolling

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| scrollPosition | <code>number</code> | Current scroll top position |
| itemHeight | <code>((data: any) => number)</code> \| <code>number</code> | Returns height of specific row |
| tbodyHeight | <code>number</code> | tbody height |

You can set VirtualScrolling as empty object {} to enable virtual scrolling and auto calculate its parameters

## kaPropsUtils

Set of specific functions used for parsing table props
```js
import { kaPropsUtils } from 'ka-table/utils';
```

#### kaPropsUtils.getData

Obtains sorted, filtered, grouped, paged data for table according to current properties
(Demo: [Get Data By Props](https://komarovalexander.github.io/ka-table/#/get-data-by-props))

```js
  const data = kaPropsUtils.getData(tableProps);
```

