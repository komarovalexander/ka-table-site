---
title: "API"
keywords: ka-table, react table, flux, redux, api
sidebar: mydoc_sidebar
search: include
permalink: docs_api.html
url: docs_api.html
---

<a name="Table"></a>
### Table
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| childAttributes | <code>[ChildAttributes](#ChildAttributes)</code> | Object describes attributes for data grid child components (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events)) |
| columns | [<code>Column[]</code>](#Column) | Columns in table and their look and behaviour |
| data | <code>any[]</code> | The Table's data |
| dataRow | [<code>DataRowFunc</code>](#DataRowFunc) | Returns Data Row Template (Demo: [Custom Data Row Example](https://komarovalexander.github.io/ka-table/#/custom-data-row)) |
| editableCells | [<code>Cell[]</code>](#Cell) | Array of cells currently editing (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| editingMode | [<code>EditingMode</code>](#EditingMode) | Sets the table's editing mode (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| filteringMode | [<code>FilteringMode</code>](#FilteringMode) | Show filter UI elements in Table (Demo: [Filter Row Example](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| groupRow | [<code>GroupRowFunc</code>](#GroupRowFunc) | Returns Group Row Template |
| groups | [<code>Group[]</code>](#Group) | Group's in the table (Demo: [Grouping Example](https://komarovalexander.github.io/ka-table/#/grouping)) |
| groupsExpanded | <code>any[][]</code> | Expanded groups - array of group keys |
| noDataRow | <code>() => any</code> | The function returns string or a component which should appear when there are no data to show |
| dispatch | <code>(action) => any</code> | The function takes action as an argument, is used as a notification about any changes and events in the Table |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| search <a name="Table.search"></a> | <code>string</code> | Specifies the text for search by data (Demo: [Search Example](https://komarovalexander.github.io/ka-table/#/search)) |
| selectedRows | <code>any[]</code> | Array of selected rows keys (Demo: [Selection Example](https://komarovalexander.github.io/ka-table/#/selection)) |
| sortingMode | [<code>SortingMode</code>](#SortingMode)  | Sorting mode (Demo: [Sorting Example](https://komarovalexander.github.io/ka-table/#/sorting)) |
| virtualScrolling | [<code>VirtualScrolling</code>](#VirtualScrolling) | Virtual scrolling options (Demo: [Many Rows Example](https://komarovalexander.github.io/ka-table/#/many-rows)) |

<a name="Column"></a>
### Column
Describes column of table its look and behaviour
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| cell | [<code>CellFunc</code>](#CellFunc) | Returns a custom cell if Table is not in editable mode (Demo: [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| dataType | [<code>DataType</code>](#DataType) | Specifies the type of column |
| editor | [<code>EditorFunc</code>](#EditorFunc) | Returns an editor if cell is in editable mode (Demo: [Custom Editor Example](https://komarovalexander.github.io/ka-table/#/custom-editor)) |
| filterRowCell | [<code>FilterRowFunc</code>](#FilterRowFunc) | Returns an editor for filter row cell (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)) |
| filterRowOperator | <code>string</code> | Sets filter row operator (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)). See the list of predefined filter operators [<code>FilterOperatorName</code>](#FilterOperatorName) |
| filterRowValue | <code>any</code> | Sets filter row value (Demo: [Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| field | <code>string</code> | Specifies the property of data's object which value will be used in column, if null value from key option will be used |
| fieldParents | <code>string[]</code> | Array contains names of parents for specific field (Demo: [Overview Demo](https://komarovalexander.github.io/ka-table/#/overview)) |
| format | [<code>FormatFunc</code>](#FormatFunc) | Returns formated cell string (Demo: [Example](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| groupCell | <code>[<code>GroupCellFunc</code>](#GroupCellFunc)</code> | Returns a custom group cell |
| headCell | <code>[<code>HeaderCellFunc</code>](#HeaderCellFunc)</code> | Returns a custom header cell (Demo: [Custom Head Cell Example](https://komarovalexander.github.io/ka-table/#/custom-header-cell)) |
| isEditable | <code>boolean</code> | Specifies can column be editable or not |
| key | <code>string</code> | Mandatory field, specifies unique key for the column |
| search | [<code>SearchFunc</code>](#SearchFunc) | Overrides the default search method for the cell. Executes if (Demo: [Table.search](#Table.search)) option is set |
| sortDirection | [<code>SortDirection</code>](#SortDirection) | Sets the direction of sorting for the column |
| style | <code>React.CSSProperties</code> | Sets the style options of the elements |
| title | <code>string</code> | Specifies the text of the header |
| validation | [<code>ValidationFunc</code>](#ValidationFunc) | Returns the validation error string or does not return anything in case of passed validation (Demo: [Validation Example](https://komarovalexander.github.io/ka-table/#/validation)) |



<a name="Cell"></a>
### Cell
Describes the position of a cell in  the table

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The field of specific column |
| rowKeyValue | <code>any</code> | Data's key value of every specific row |


<a name="ChildAttributes"></a>
### ChildAttributes
Describes the attributes for a specific child component
It is possible to override default behaviour just specify particular handler [Events Demo](https://komarovalexander.github.io/ka-table/#/events)

| Name | Type | Description |
| --- | --- | --- |
| cell | <code>[ChildAttributesItem](#ChildAttributesItem)<[ICellContentProps](#ICellContentProps)></code> | Sets custom attributes for cell element |
| dataRow | <code>[ChildAttributesItem](#ChildAttributesItem)<[IDataRowProps](#IDataRowProps)></code> | Sets custom attributes for table element |
| table | <code>[ChildAttributesItem](#ChildAttributesItem)<[Table](#ITableAllProps)></code> | Sets custom attributes for table element |


<a name="ChildAttributesItem"></a>
#### ChildAttributesItem&lt;T&gt;
This object is an extension for React HTMLAttributes. It contains all attributes and all [react Synthetic Events](https://reactjs.org/docs/events.html), but in each event it adds a second parameter which contains additional data with <code>[AttributeTableData type](#AttributeTableData)</code>.

<a name="AttributeTableData"></a>
#### AttributeTableData&lt;T&gt;
A second parameter in each [react Synthetic Event](https://reactjs.org/docs/events.html). Contains component-related information.

| Name | Type | Description |
| --- | --- | --- |
| baseFunc | <code>any</code> | Contains default function for overrided function - it is easy to add additional logic and execute default behaviour where you want it |
| childElementAttributes | <code>HTMLAttributes&lt;HTMLElement&gt;</code> | Default HTMLAttributes of the component |
| childProps | <code>T</code> | Props of the component |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |

<a name="Group"></a>
### Group

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| field | <code>string</code> | The grouped column's field |


<a name="VirtualScrolling"></a>
### VirtualScrolling

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| scrollPosition | <code>number</code> | Current scroll top position |
| itemHeight | <code>((data: any) => number)</code> \| <code>number</code> | Returns height of specific row |
| tbodyHeight | <code>number</code> | tbody height |

You can set VirtualScrolling as empty object {} to enable virtual scrolling and auto calculate its parameters

<a name="DataType"></a>
### DataType

| Property | String value |
| --- | --- |
| Boolean | 'boolean' |
| Date | 'date' |
| Number | 'number' |
| Object | 'object' |
| String | 'string' |


<a name="EditingMode"></a>
### EditingMode

| Property | String value | Description |
| --- | --- | --- |
| None | 'none' | Editing is disabled |
| Cell | 'cell' | Data is edited by cell to cell, click by cell activates editing |


<a name="FilteringMode"></a>
### FilteringMode

| Property | String value | Description |
| --- | --- | --- |
| None | 'none' | All filtering elements are hidden |
| FilterRow | 'filterRow' | Filter row is shown |


<a name="FilterOperatorName"></a>
### FilterOperatorName

| Property | String value |
| --- | --- |
| Equal | '=' |
| MoreThan | '>' |
| LessThan | '<' |
| MoreThanOrEqual | '>=' |
| LessThanOrEqual | '<=' |
| Contains | 'contains' |


<a name="SortDirection"></a>
### SortDirection

| Property | String value |
| --- | --- |
| Ascend | 'ascend' |
| Descend | 'descend' |


<a name="SortingMode"></a>
### SortingMode

| Property | String value |
| --- | --- |
| None | 'none' |
| Single | 'single' |



<a name="CellFunc"></a>
### CellFunc

<code>(props: [ICellContentProps](#ICellContentProps)) => any;</code>

Function which obtains [<code>ICellContentProps</code>](#ICellContentProps) as parameter and returns React component which should be shown instead of cell content.

<a name="DataRowFunc"></a>
### DataRowFunc

<code>(props: [IDataRowProps](#IDataRowProps)) => any;</code>

Function which obtains [<code>IDataRowProps</code>](#IDataRowProps) as parameter and returns React component which should be shown instead of Row content.

<a name="EditorFunc"></a>
### EditorFunc

<code>(props: [ICellEditorProps](#ICellEditorProps)) => any;</code>

Function which obtains [<code>ICellEditorProps</code>](#ICellEditorProps) as parameter and returns React component which should be shown instead of default editor.

<a name="FilterRowFunc"></a>
### FilterRowFunc

<code>(props: [IFilterRowEditorProps](#IFilterRowEditorProps)) => any;</code>

Function which obtains [<code>IFilterRowEditorProps</code>](#IFilterRowEditorProps) as parameter and returns React component which should be shown instead of default filter row's editor.

<a name="FormatFunc"></a>
### FormatFunc

<code>(value: any) => any;</code>

Function which obtains value as parameter and returns formated value which will be shown in cell.

<a name="GroupCellFunc"></a>
### GroupCellFunc

<code>(props:[<code>IGroupRowProps</code>](#IGroupRowProps)) => any;</code>

Function which obtains [<code>IGroupRowProps</code>](#IGroupRowProps) as parameter and returns group cell content.

<a name="GroupRowFunc"></a>
### GroupRowFunc

<code>(props:[<code>IGroupRowProps</code>](#IGroupRowProps)) => any;</code>

Function which obtains [<code>IGroupRowProps</code>](#IGroupRowProps) as parameter and returns group row content.

<a name="HeaderCellFunc"></a>
### HeaderCellFunc

<code>(props:[<code>IHeadCellProps</code>](#IHeadCellProps)) => any;</code>

Function which obtains [<code>IHeadCellProps</code>](#IHeadCellProps) as parameter and returns header cell content.


<a name="SearchFunc"></a>
### SearchFunc

<code>(searchText?: string, rowData?: any, column?: Column) => boolean;</code>

Function which obtains <code>searchText?: string, rowData?: any, column?: Column</code> - as parameters and returns <code>boolean</code> value which is true if cell's value is matched with searched value and false otherwise.


<a name="ValidationFunc"></a>
### ValidationFunc

<code>(value: any, rowData: any) => string | void;</code>

Function which obtains value of specific cell and row - as parameters and returns validation error string or does not return anything in case of passed validation.


<a name="ICellEditorProps"></a>
### ICellEditorProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#Column) | column of the editor |
| dispatch | <code>(type: string, data: any) => void</code> | can forse Table make change in data, close the editor, and other actions |
| field | <code>string</code> | field name of current column |
| isSelectedRow | <code>boolean</code> | selection state of the current row |
| rowData | <code>any</code> | data of the row in which editor is shown |
| rowKeyField | <code>string</code> | field which is used to identify row |
| rowKeyValue | <code>any</code> | value of the field which is used to identify row |

<a name="IFilterRowEditorProps"></a>
### IFilterRowEditorProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#Column) | column of the editor |
| dispatch | <code>(type: string, data: any) => void</code> |  can forse Table make change in filter data and other actions  |


<a name="ICellContentProps"></a>
### ICellContentProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| childAttributes | <code>[ChildAttributes](#ChildAttributes)</code> | Object describes attributes for data grid child components (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events)) |
| column | [<code>Column</code>](#Column) | column of the cell |
| dispatch | <code>(type: string, data: any) => void</code> | can forse Table make change in data, open the editor, and other actions |
| editingMode | [<code>EditingMode</code>](#EditingMode) | Editing mode of cell column |
| field | <code>string</code> | field name of cell column |
| isSelectedRow | <code>boolean</code> | selection state of the cell row |
| rowData | <code>any</code> | data of the row in which editor is shown |
| rowKeyField | <code>string</code> | field which is used to identify row |
| rowKeyValue | <code>any</code> | value of the field which is used to identify cell row |
| value | <code>any</code> | value of the cell |


<a name="IDataRowProps"></a>
### IDataRowProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| columns | [<code>Column[]</code>](#Column) | Columns in table and their look and behaviour |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |
| editableCells | [<code>Cell[]</code>](#Cell) | Array of cells that are in edit mode |
| editingMode | [<code>EditingMode</code>](#EditingMode) | Table's editing mode |
| rowData | <code>any</code> | Data of current row |
| isSelectedRow | <code>boolean</code> | Describes selected state of current row |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| selectedRows | <code>any[]</code> | Array of rows keys which are marked as selected |


<a name="IGroupRowProps"></a>
### IGroupRowProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| column | [<code>Column</code>](#Column) | Grouped column |
| contentColSpan | <code>number</code> | colSpan for content cell |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |
| groupIndex | <code>number</code> | grouped column index relative another grouped columns |
| groupKey | <code>any[]</code> | key of current row, array because group could be inner for another: <code>['parentGroupKey', 'currentGroupKey']</code> |
| isExpanded | <code>boolean</code> | Expanded state of current group |
| text | <code>string</code> | Formatted text of group row |

<a name="IHeadCellProps"></a>
### IHeadCellProps
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| areAllRowsSelected | <code>boolean</code> | Indicates selection state of all columns |
| column | [<code>Column</code>](#Column) | Grouped column |
| sortingMode | <code>number</code> | [<code>SortingMode</code>](#SortingMode) of current cell column |
| dispatch | <code>(type: string, data: any) => void</code> | Executes specific action with specific data |
