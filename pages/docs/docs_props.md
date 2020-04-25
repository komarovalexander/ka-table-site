---
title: "Props"
keywords: ka-table, react table, flux, redux, api
sidebar: mydoc_sidebar
search: include
permalink: docs_props.html
url: docs_props.html
toc: true
---

## ka-table Props

| Name | Type | Description |
| --- | --- | --- |
| childAttributes | [<code>ChildAttributes</code>](#childattributes)| Object describes attributes for data grid child components (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events)) |
| columns | [<code>Column[]</code>](#column) | Columns in table and their look and behaviour |
| data | <code>any[]</code> | The Table's data |
| dataRow | (props: [IDataRowProps](#idatarowprops)) => any; | Returns Data Row Template (Demo: [Custom Data Row Example](https://komarovalexander.github.io/ka-table/#/custom-data-row)) |
| dispatch | <code>(action) => any</code> | The function takes action as an argument, is used as a notification about any changes and events in the Table |
| editableCells | [<code>Cell[]</code>](#cell) | Array of cells currently editing (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| editingMode | 'cell' <br/> 'none' | Sets the table's editing mode (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| filteringMode | 'filterRow' <br/> 'none' | Show filter UI elements in Table (Demo: [Filter Row Example](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| groupRow | (props:[<code>IGroupRowProps</code>](#igrouprowprops)) => any; | Returns Group Row Template |
| groups | [<code>Group[]</code>](#group) | Group's in the table (Demo: [Grouping Example](https://komarovalexander.github.io/ka-table/#/grouping)) |
| groupsExpanded | <code>any[][]</code> | Expanded groups - array of group keys |
| loading | [<code>ILoadingProps</code>](#iloadingprops) | Loading indicator options (Demo: [Loading](https://komarovalexander.github.io/ka-table/#/loading)) |
| noDataRow | <code>() => any</code> | The function returns string or a component which should appear when there are no data to show |
| pagingProps | [<code>IPagingProps</code>](#ipagingprops) | Paging settings (Demo: [Paging](https://komarovalexander.github.io/ka-table/#/paging)) |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| search <a name="Table.search"></a> | <code>string</code> | Specifies the text for search by data (Demo: [Search Example](https://komarovalexander.github.io/ka-table/#/search)) |
| selectedRows | <code>any[]</code> | Array of selected rows keys (Demo: [Selection Example](https://komarovalexander.github.io/ka-table/#/selection)) |
| sortingMode | 'single' <br/> 'none' | Sorting mode (Demo: [Sorting Example](https://komarovalexander.github.io/ka-table/#/sorting)) |
| virtualScrolling | [<code>VirtualScrolling</code>](#virtualscrolling) | Virtual scrolling options (Demo: [Many Rows Example](https://komarovalexander.github.io/ka-table/#/many-rows)) |

## Column
Describes column of table its look and behaviour

| Name | Type | Description |
| --- | --- | --- |
| cell | (props: [ICellContentProps](#icellcontentprops)) => any; | Returns a custom cell if Table is not in editable mode (Demo: [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| dataType | 'boolean' <br /> 'date' <br /> 'number' <br /> 'object' <br /> 'string' | Specifies the type of column |
| editor | (props: [ICellEditorProps](#icelleditorprops)) => any; | Returns an editor if cell is in editable mode (Demo: [Custom Editor Example](https://komarovalexander.github.io/ka-table/#/custom-editor)) |
| filterRowCell | (props: [IFilterRowEditorProps](#ifilterroweditorprops)) => any; | Returns an editor for filter row cell (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)) |
| filterRowOperator | <code>string</code> | Sets filter row operator (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)). Predefined filter operators are:  '=', '>', '<', '>=', '<=', 'contains'  |
| filterRowValue | <code>any</code> | Sets filter row value (Demo: [Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| field | <code>string</code> | Specifies the property of data's object which value will be used in column, if null value from key option will be used |
| fieldParents | <code>string[]</code> | Array contains names of parents for specific field (Demo: [Overview Demo](https://komarovalexander.github.io/ka-table/#/overview)) |
| format | (value: any) => string; | Returns formated cell string (Demo: [Example](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| groupCell | (props:[<code>IGroupRowProps</code>](#igrouprowprops)) => any; | Returns a custom group cell |
| headCell | (props:[<code>IHeadCellProps</code>](#iheadcellprops)) => any; | Returns a custom header cell (Demo: [Custom Head Cell Example](https://komarovalexander.github.io/ka-table/#/custom-header-cell)) |
| isEditable | <code>boolean</code> | Specifies can column be editable or not |
| key | <code>string</code> | Mandatory field, specifies unique key for the column |
| search | (searchText?: string, rowData?: any, column?: Column) => boolean; | Overrides the default search method for the cell. Executes if [Table.search](#Table.search) option is set |
| sortDirection | 'ascend' <br/> 'descend' | Sets the direction of sorting for the column |
| style | <code>React.CSSProperties</code> | Sets the style options of the elements |
| title | <code>string</code> | Specifies the text of the header |
| validation | (value: any, rowData: any) => string \| void; | Returns the validation error string or does not return anything in case of passed validation (Demo: [Validation Example](https://komarovalexander.github.io/ka-table/#/validation)) |



## Cell
Describes the position of a cell in  the table

| Name | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field of specific column |
| rowKeyValue | <code>any</code> | Data's key value of every specific row |


## ChildAttributes
Describes the attributes for a specific child component

It is possible to override default behaviour just specify particular handler (see [Events Demo](https://komarovalexander.github.io/ka-table/#/events))

| Name | Type | Description |
| --- | --- | --- |
| cell | [<code>ChildAttributesItem</code>](#ChildAttributesItem)<[ICellContentProps](#ICellContentProps)> | Sets custom attributes for cell element |
| dataRow | [<code>ChildAttributesItem</code>](#ChildAttributesItem)<[IDataRowProps](#idatarowprops)> | Sets custom attributes for table element |
| table | [<code>ChildAttributesItem</code>](#ChildAttributesItem)<[Table](#ITableAllProps)> | Sets custom attributes for table element |


### ChildAttributesItem&lt;T&gt;
This object is an extension for React HTMLAttributes. It contains all attributes and all [react Synthetic Events](https://reactjs.org/docs/events.html), but in each event it adds a second parameter which contains additional data with [<code>AttributeTableData type</code>](#AttributeTableData).


### AttributeTableData&lt;T&gt;
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


## ICellContentProps

| Name | Type | Description |
| --- | --- | --- |
| childAttributes | [<code>ChildAttributes</code>](#childattributes) | Object describes attributes for data grid child components (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events)) |
| column | [<code>Column</code>](#column) | column of the cell |
| dispatch | <code>(type: string, data: any) => void</code> | can forse Table make change in data, open the editor, and other actions |
| editingMode | 'cell' <br/> 'none' | Editing mode of cell column |
| field | <code>string</code> | field name of cell column |
| isSelectedRow | <code>boolean</code> | selection state of the cell row |
| rowData | <code>any</code> | data of the row in which editor is shown |
| rowKeyField | <code>string</code> | field which is used to identify row |
| rowKeyValue | <code>any</code> | value of the field which is used to identify cell row |
| value | <code>any</code> | value of the cell |

## ICellEditorProps

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#column) | column of the editor |
| dispatch | <code>(type: string, data: any) => void</code> | can forse Table make change in data, close the editor, and other actions |
| field | <code>string</code> | field name of current column |
| isSelectedRow | <code>boolean</code> | selection state of the current row |
| rowData | <code>any</code> | data of the row in which editor is shown |
| rowKeyField | <code>string</code> | field which is used to identify row |
| rowKeyValue | <code>any</code> | value of the field which is used to identify row |

<a name="IFilterRowEditorProps"></a>
## IFilterRowEditorProps

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#column) | column of the editor |
| dispatch | <code>(type: string, data: any) => void</code> |  can forse Table make change in filter data and other actions  |


## IDataRowProps

| Name | Type | Description |
| --- | --- | --- |
| columns | [<code>Column[]</code>](#column) | Columns in table and their look and behaviour |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |
| editableCells | [<code>Cell[]</code>](#Cell) | Array of cells that are in edit mode |
| editingMode | 'cell' <br/> 'none' | Table's editing mode |
| rowData | <code>any</code> | Data of current row |
| isSelectedRow | <code>boolean</code> | Describes selected state of current row |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| selectedRows | <code>any[]</code> | Array of rows keys which are marked as selected |

## IHeadCellProps

| Name | Type | Description |
| --- | --- | --- |
| areAllRowsSelected | <code>boolean</code> | Indicates selection state of all columns |
| column | [<code>Column</code>](#column) | Grouped column |
| sortingMode |  'single' <br/> 'none'  | SortingMode of current cell column |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |

## IGroupRowProps

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#column) | Grouped column |
| contentColSpan | <code>number</code> | colSpan for content cell |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |
| groupIndex | <code>number</code> | grouped column index relative another grouped columns |
| groupKey | <code>any[]</code> | key of current row, array because group could be inner for another: <code>['parentGroupKey', 'currentGroupKey']</code> |
| isExpanded | <code>boolean</code> | Expanded state of current group |
| text | <code>string</code> | Formatted text of group row |

## ILoadingProps

Demo: [Loading](https://komarovalexander.github.io/ka-table/#/loading)

| Name | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | Show/hide loading indicator |
| text | <code>string</code> | Set text of loading indicator |

## IPagingProps

Demo: [Paging](https://komarovalexander.github.io/ka-table/#/paging)

| Name | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | Show/hide Paging |
| pageIndex | <code>number</code> | Active page index |
| pageSize | <code>number</code> | Data items count on one page |
