---
title: "Props"
keywords: ka-table, react table, props, api, columns, sorting, filtering, paging, editing, grouping, virtual scrolling
description: The props of the ka-table Table component and of its columns, grouped by feature.
sidebar: mydoc_sidebar
search: include
permalink: docs_props.html
url: docs_props.html
toc: true
id: props
---

These are the props of ka-table 13. In TypeScript the type of the rows (`TData`) is inferred from `data`; the values of the cells and the keys of the rows are `unknown`.

## Table

The props of the `Table` component, grouped by feature. Only `columns`, `data` and `rowKeyField` are required.

<!-- generated:start Table: from the JSDoc of ITableProps and IKaTableProps in src/lib/Components/Table/Table.tsx, edit it and run yarn docs -->

### Data and columns

| Name | Type | Description |
| --- | --- | --- |
| columns | [<code>Column[]</code>](#column) | Columns in table and their look and behaviour |
| data | <code>TData[]</code> | The Table's data. Change it immutably: the data is processed again when the reference changes |
| rowKeyField | <code>string</code> | Data's field which is used to identify row |
| format | <code>(props: { value: unknown, column: </code>[<code>Column</code>](#column)<code>, rowData?: TData; }) =&gt; ReactNode</code> | Returns the content of the cell; `undefined`, `null` and `false` show the value itself. The search, the groups and the header filter use its text (Demo: [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| groupedColumns | [<code>GroupedColumn[]</code>](#groupedcolumn) | (Demo: [Grouped Columns](https://komarovalexander.github.io/ka-table/#/grouped-columns)) |
| columnReordering | <code>boolean</code> | Enables columns reordering using drag and drop |
| columnResizing | <code>boolean</code> | The columns are resized by the mouse. While a column is resized, the rows are not processed and rendered again: they don't use the widths, and they are rendered with the new width when the mouse is released. A controlled table doesn't render the rows only if the props which the parent passes keep their references between its renders (dispatch, childComponents, format...), as with memoizedRows (Demo: [Column Resizing](https://komarovalexander.github.io/ka-table/#/column-resizing)) |
| rowReordering | <code>boolean</code> | Enables rows reordering using drag and drop |

### Sorting

| Name | Type | Description |
| --- | --- | --- |
| sortingMode | <code>'none'<br/>'single'<br/>'singleTripleState'<br/>'singleRemote'<br/>'singleTripleStateRemote'<br/>'multipleRemote'<br/>'multipleTripleStateRemote'</code> | Sorting mode. <br/>*Remote* - means only grid elements are updated but data should be sorted outside of the grid. <br/>*TripleState* - means: "ascend - descend - no sorting" (Demo: [Sorting Example](https://komarovalexander.github.io/ka-table/#/sorting)) |
| sort | <code>(props: { column: </code>[<code>Column</code>](#column)<code> }) =&gt; ((valueA: unknown, valueB: unknown, rowDataA: TData, rowDataB: TData) =&gt; number) &#124; void</code> | Returns the comparator of the sorted column, as the one of `Array.prototype.sort`: e.g. `Intl.Collator().compare` or `(a, b) => a - b`. It sorts in the direction of the column (Demo: [Sorting Custom Logic](https://komarovalexander.github.io/ka-table/#/sorting-custom-logic)) |
| extendedSort | <code>(data: TData[], columns: </code>[<code>Column</code>](#column)<code>[]) =&gt; TData[]</code> | Sorts the data instead of the default sorting (Demo: [Sorting Extended](https://komarovalexander.github.io/ka-table/#/sorting-extended)) |

### Filtering and search

| Name | Type | Description |
| --- | --- | --- |
| filteringMode | <code>'none'<br/>'filterRow'<br/>'headerFilter'<br/>'filterRowAndHeaderFilter'</code> | Show filter UI elements in Table (Demo: [Filter Row Example](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| filter | <code>(props: { column: </code>[<code>Column</code>](#column)<code> }) =&gt; ((value: unknown, filterRowValue: unknown, rowData?: TData) =&gt; boolean) &#124; void</code> | Returns filter function |
| extendedFilter | <code>(data: TData[]) =&gt; TData[]</code> | Adds additional filtering layer (Demo: [Filter Extended](https://komarovalexander.github.io/ka-table/#/filter-extended)) |
| searchText | <code>string</code> | Specifies the text for search by data: the text which the cells of the visible columns show is searched (Demo: [Search Example](https://komarovalexander.github.io/ka-table/#/search)) |
| search | <code>(props: { searchText: string, rowData: TData, column: </code>[<code>Column</code>](#column)<code> }) =&gt; boolean &#124; void</code> | Overrides the default search method for the cell, `undefined` keeps the default search of the column. Executes if `searchText` is set |

### Editing

| Name | Type | Description |
| --- | --- | --- |
| editingMode | <code>'none'<br/>'cell'</code> | Sets the table's editing mode <br/>note: when *EditingMode.Cell* is enabled table calls *CloseEditor* action each time editor loses focus (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| editableCells | [<code>EditableCell[]</code>](#editablecell) | Array of cells currently editing (Demo: [Editing Example](https://komarovalexander.github.io/ka-table/#/editing)) |
| validation | <code>(props: { value: unknown, rowData: TData, column: </code>[<code>Column</code>](#column)<code> }) =&gt; string &#124; void</code> | Returns the validation error string or does not return anything in case of passed validation; `rowData` has the edited values of the row (Demo: [Validation Example](https://komarovalexander.github.io/ka-table/#/validation)) |

### Grouping and tree

| Name | Type | Description |
| --- | --- | --- |
| groups | [<code>Group[]</code>](#group) | Groups in the table (Demo: [Grouping Example](https://komarovalexander.github.io/ka-table/#/grouping)) |
| groupsExpanded | <code>unknown[][]</code> | Expanded groups - array of group keys |
| groupPanel | <code>{<br/>enabled?: boolean;<br/>text?: string;<br/>deep?: number;<br/>}</code> | Allows users to select grouping columns in the UI. (Demo: [Grouping](https://komarovalexander.github.io/ka-table/#/grouping)) |
| treeGroupKeyField | <code>string</code> | Group key field (Demo: [Tree Mode](https://komarovalexander.github.io/ka-table/#/tree-mode)) |
| treeGroupsExpanded | <code>unknown[]</code> | Array of ids of expanded rows, if it is `undefined` - all rows are expanded (Demo: [Tree Mode](https://komarovalexander.github.io/ka-table/#/tree-mode)) |
| treeExpandButtonColumnKey | <code>string</code> | Sets the column key where tree expanded button will be rendered, by default it is rendered in the first column of the table |

### Paging and virtual scrolling

| Name | Type | Description |
| --- | --- | --- |
| paging | <code>{<br/>enabled?: boolean;<br/>pageIndex?: number;<br/>pageSize?: number;<br/>pageSizes?: number[];<br/>pagesCount?: number;<br/>position?: ('bottom' &#124; 'top' &#124; 'topAndBottom');<br/>}</code> | Paging settings, `pagesCount` is set for remote paging (Demo: [Paging](https://komarovalexander.github.io/ka-table/#/paging)) |
| virtualScrolling | [<code>VirtualScrolling</code>](#virtualscrolling) | Virtual scrolling options of the rows and the columns (Demo: [Many Rows Example](https://komarovalexander.github.io/ka-table/#/many-rows), [Many Columns](https://komarovalexander.github.io/ka-table/#/many-columns)) |
| memoizedRows | <code>boolean</code> | Rows and their cells are re-rendered only when their own props change, which is much faster for big tables. Customizations of rows and cells (childComponents) have to render from their props then: values read from table.props or from closures during rendering are not updated. childComponents, format, validation and dispatch should keep their references between renders (be declared outside of the component or memoized), otherwise all the rows are re-rendered. (Demo: [300K Rows & memo](https://komarovalexander.github.io/ka-table/#/many-rows-memo)) |

### Selection, details rows and focus

| Name | Type | Description |
| --- | --- | --- |
| selectedRows | <code>unknown[]</code> | Array of selected rows keys (Demo: [Selection Example](https://komarovalexander.github.io/ka-table/#/selection)) |
| detailsRows | <code>unknown[]</code> | Keys of the rows whose details rows are shown (Demo: [Details Row](https://komarovalexander.github.io/ka-table/#/details-row)) |
| focused | <code>{<br/>cell?: { columnKey: string; rowKeyValue: unknown; };<br/>cellEditorInput?: { columnKey: string; rowKeyValue: unknown; };<br/>group?: unknown[];<br/>}</code> | Stores information about the currently focused element: the cell or the group row (its key) focused by the keyboard navigation (Demo: [Keyboard navigation](https://komarovalexander.github.io/ka-table/#/keyboard-navigation)) |
| keyboardNavigation | <code>boolean</code> | Navigation by the cells with the keyboard (the grid pattern of WAI-ARIA, treegrid for a tree), enabled by default: the table is a single stop of Tab, arrows move the focus between the cells (with Ctrl to the last one), Home and End to the first and the last cell of the row (with Ctrl of the page), PageUp and PageDown change the page, Enter and F2 open the editor. Group rows get the focus as rows: Enter, Space and the arrows Left and Right expand and collapse them. Enter and Space on the cell of the arrow of a tree row expand and collapse it (F2 opens the editor of this cell). The focus is kept in focused.cell (focused.group for a group row). false turns the navigation off, e.g. for an own handling of the keys. (Demo: [Keyboard navigation](https://komarovalexander.github.io/ka-table/#/keyboard-navigation)) |

### Appearance

| Name | Type | Description |
| --- | --- | --- |
| childComponents | [<code>ChildComponents</code>](./docs_ui.html#childcomponents) | Customization logic for ka-table parts (cells, rows, editors, etc.) (Demo: [Events](https://komarovalexander.github.io/ka-table/#/events), [Custom Cell](https://komarovalexander.github.io/ka-table/#/custom-cell)) |
| height | <code>number &#124; string</code> | Height of the component |
| width | <code>number &#124; string</code> | Width of the component |
| loading | <code>{<br/>enabled?: boolean;<br/>text?: string;<br/>}</code> | Loading indicator options (Demo: [Loading](https://komarovalexander.github.io/ka-table/#/loading)) |
| noData | <code>{<br/>text?: string;<br/>hideHeader?: boolean;<br/>}</code> | No data settings (for deeper UI customization childComponents.noDataRow also) (Demo: [Search](https://komarovalexander.github.io/ka-table/#/search)) |
| oddEvenRows | <code>boolean &#124; 'treeRoots'</code> | The rows get the classes ka-odd and ka-even in turn, counted from the first row of the page, also with the virtual scrolling. `'treeRoots'`: a root of a tree and all its children get the class of the root, the stripes change at the roots only (Demo: [100K Rows](https://komarovalexander.github.io/ka-table/#/many-rows)) |

### State

| Name | Type | Description |
| --- | --- | --- |
| dispatch | <code>(action: </code>[<code>TableAction</code>](./docs_action.html#typescript)<code> &#124; </code>[<code>CustomAction</code>](./docs_action.html#custom-actions)<code>) =&gt; void</code> | The function takes action as an argument, is used as a notification about any changes and events in the Table. `dispatch` enables controlled mode in the table |
| table | [<code>ITableInstance</code>](./docs_hooks_utils.html#usetable) | Object is used only by *uncontrolled mode* to get/set table props, use [`useTable()`](./docs_hooks_utils.html#usetable) to create your own instance and handle changes using `onDispatch`, and use [`useTableInstance()`](./docs_hooks_utils.html#usetableinstance) to get instance of table from context |
| controlledPropsKeys | <code>(keyof </code>[<code>ITableProps</code>](#table)<code>)[]</code> | The props which the table with its own state (without dispatch) applies when the parent changes them. By default these are all the props: they are compared by value and the objects are merged by the changed fields, so the state of the table (sorting, page, widths...) is kept when the parent passes equal props again. During a loading (loading.enabled) data, columns, paging and selectedRows are applied when the loading ends. The functions (format, filter, search, sort, validation...) are not the state: the latest ones are always used. |
| singleAction | [<code>TableAction</code>](./docs_action.html#typescript)<code> &#124; </code>[<code>CustomAction</code>](./docs_action.html#custom-actions) | Is dispatched only once after Table render, after this action ka-table will dispatch `'ClearSingleAction'` to set singleAction as undefined (Demo: [Remote Data](https://komarovalexander.github.io/ka-table/#/remote-data)) |

<!-- generated:end -->

## Column

<!-- generated:start Column: from the JSDoc of src/lib/Models/Column.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| colGroup | <code>ColHTMLAttributes&lt;HTMLElement&gt;</code> | Sets attributes for col element in table colGroup |
| dataType | <code>'boolean'<br/>'date'<br/>'number'<br/>'object'<br/>'string'</code> | Specifies the type of column |
| filter | <code>(value: unknown, filterValue: unknown, rowData?: TData) =&gt; boolean</code> | Returns filter function for particular column (Demo: [Filter Custom Logic](https://komarovalexander.github.io/ka-table/#/filter-row-custom-logic)) |
| filterRowOperator | <code>string</code> | Sets filter row operator. Predefined filter operators are: `'='`, `'!='`, `'>'`, `'<'`, `'>='`, `'<='`, `'contains'`, `'IsEmpty'`, `'IsNotEmpty'` (Demo: [Filter Row Custom Editor](https://komarovalexander.github.io/ka-table/#/filter-row-custom-editor)) |
| filterRowValue | <code>unknown</code> | Sets filter row value (Demo: [Filter Row](https://komarovalexander.github.io/ka-table/#/filter-row)) |
| field | <code>string</code> | Specifies the property of data's object which value will be used in column, if null value from key option will be used |
| fixed | <code>'left' &#124; 'right'</code> | The column sticks to the edge of the table when it is scrolled horizontally, after the other fixed columns of the edge. The offsets are calculated from the numeric `width` of the fixed columns. The horizontal virtual scrolling always renders the fixed columns (Demo: [Fixed Column](https://komarovalexander.github.io/ka-table/#/fixed-column)) |
| headerFilterListItems | <code>(props: { data?: TData[] }) =&gt; string[]</code> | Returns array of header filter items (Demo: [Header Filter - Logic](https://komarovalexander.github.io/ka-table/#/header-filter-logic)) |
| headerFilterSearch | <code>(value: string, searchValue: string, rowData?: HeaderFilterItem) =&gt; boolean</code> | Used to customize header filter search logic, `HeaderFilterItem` is `{ value: string, isSelected: boolean }` (Demo: [Header Filter - Logic](https://komarovalexander.github.io/ka-table/#/header-filter-logic)) |
| headerFilterSearchValue | <code>string</code> | Stores value for search by `headerFilterValues` (Demo: [Header Filter - Logic](https://komarovalexander.github.io/ka-table/#/header-filter-logic)) |
| headerFilterValues | <code>string[]</code> | Array of selected values |
| headerFilterPopupPosition | <code>{<br/>x?: number;<br/>y?: number;<br/>}</code> | Header filter popup position |
| isDraggable | <code>boolean</code> | Specifies can a column be dragged or not |
| isEditable | <code>boolean</code> | Specifies can a column be editable or not |
| isFilterable | <code>boolean</code> | If `false` then header filter cell content will not be shown for a column |
| isHeaderFilterPopupShown | <code>boolean</code> | Shows/hides header filter popup for specific column |
| isHeaderFilterSearchable | <code>boolean</code> | Enables search in header filter |
| isResizable | <code>boolean</code> | Specifies can a column be resized or not (Demo: [Column Resizing](https://komarovalexander.github.io/ka-table/#/column-resizing)) |
| isSortable | <code>boolean</code> | Specifies can a column be sorted or not (Demo: [Sorting](https://komarovalexander.github.io/ka-table/#/sorting)) |
| key | <code>string</code> | Mandatory field, specifies unique key for the column |
| sortDirection | <code>'ascend'<br/>'descend'</code> | Sets the direction of sorting for the column (Demo: [Sorting](https://komarovalexander.github.io/ka-table/#/sorting)) |
| sortIndex | <code>number</code> | The priority of the column for sorting (Demo: [Sorting](https://komarovalexander.github.io/ka-table/#/sorting)) |
| style | <code>CSSProperties</code> | Sets the style options of the elements |
| title | <code>string</code> | Specifies the text of the header |
| visible | <code>boolean</code> | Shows/Hides columns |
| width | <code>number &#124; string</code> | Column width. A number (pixels) is required for `fixed` offsets and for `virtualScrolling.horizontal` |

<!-- generated:end -->


## EditableCell
Describes the editor of a cell in the table

<!-- generated:start EditableCell: from the JSDoc of src/lib/Models/EditableCell.ts and Cell.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| columnKey | <code>string</code> | The key of specific column |
| rowKeyValue | <code>unknown</code> | Data's key value of every specific row |
| editorValue | <code>unknown</code> | Value of the editor |
| validationMessage | <code>string</code> | Validation message of the column |

<!-- generated:end -->


## Group

<!-- generated:start Group: from the JSDoc of src/lib/Models/Group.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| columnKey | <code>string</code> | The key of the grouped column |
| enableSummary | <code>boolean</code> | Enable summary row for the group |
| enabled | <code>boolean</code> | false keeps the settings of the group without grouping the rows: the group is enabled when its column is grouped (e.g. dropped on the group panel). Ungrouping disables a group with settings instead of removing it <br/>Skip such groups in the code which reads `groups` |

<!-- generated:end -->

## GroupedColumn

Demo: [Grouped Columns](https://komarovalexander.github.io/ka-table/#/grouped-columns)

<!-- generated:start GroupedColumn: from the JSDoc of src/lib/Models/GroupedColumn.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Unique identifier |
| title | <code>string</code> | Used to show text in the cell |
| columnsKeys | <code>string[]</code> | List of children's keys |

<!-- generated:end -->


## VirtualScrolling

**Properties**

<!-- generated:start VirtualScrolling: from the JSDoc of src/lib/Models/VirtualScrolling.ts, edit it and run yarn docs -->

| Name | Type | Description |
| --- | --- | --- |
| enabled | <code>boolean</code> | Enables virtual scrolling: only the visible rows are rendered. `false` shows all the rows |
| scrollTop | <code>number</code> | Current scroll top position (the state of the table) |
| itemHeight | <code>((data: unknown) =&gt; number) &#124; number</code> | The height of the rows, or a function which returns the height of a row of the shown data: a row of the data, a group row, a tree row... |
| tbodyHeight | <code>number</code> | Tbody height |
| topInvisibleCount | <code>number</code> | Amount of rows which should be rendered over visible area (useful for scrolling - in that case some items will be already visible and it will be more smooth) |
| bottomInvisibleCount | <code>number</code> | Amount of rows which should be rendered under visible area |
| horizontal | <code>boolean</code> | The columns are virtualized too: only the visible columns are rendered, and the fixed ones and the ones without a numeric `width`; spacers keep the width of the table. Is not applied with `groupedColumns` (Demo: [Many Columns](https://komarovalexander.github.io/ka-table/#/many-columns)) |
| scrollLeft | <code>number</code> | Horizontal: scroll left position at the last change of the rendered columns (the state of the table) |
| tableWidth | <code>number</code> | Horizontal: the width of the visible part of the table, measured when it is not set |
| leftInvisibleCount | <code>number</code> | Horizontal: amount of columns rendered before the visible ones (2 by default) |
| rightInvisibleCount | <code>number</code> | Horizontal: amount of columns rendered after the visible ones (2 by default) |

<!-- generated:end -->

You can set VirtualScrolling as empty object {} to enable virtual scrolling and auto calculate its parameters. The table needs its own scrolling: limit its height, e.g. `childComponents.tableWrapper` with `style: { maxHeight: 600 }`.

```js
// 2 000 rows of 500 columns: only the visible rows and columns are rendered
const virtualScrolling = { enabled: true, horizontal: true };
// the table is scrolled inside its wrapper
const childComponents = {
  tableWrapper: {
    elementAttributes: () => ({ style: { maxHeight: 600 } }),
  },
};

<Table
  columns={columns} // every column has a numeric width
  data={data}
  rowKeyField={'id'}
  virtualScrolling={virtualScrolling}
  childComponents={childComponents}
/>
```

## See also

- [ChildComponents](./docs_ui.html#childcomponents): the customization of the parts of the table.
- [Hooks and Utils](./docs_hooks_utils.html): `useTable()`, `useTableInstance()`, `useTableSelector()`, `kaPropsUtils`, `kaDateUtils` and `kaPagingUtils`.
