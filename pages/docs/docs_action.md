---
title: 'Actions'
keywords: ka-table, react table, actions, action creators, dispatch, TableAction
description: The actions of ka-table - the predefined actions with their action creators, grouped by feature, and your own actions.
sidebar: mydoc_sidebar
search: include
permalink: docs_action.html
url: docs_action.html
toc: true
id: action
---

## Definition

Action is an object which contains the type and payload

```js
{
  type: string,
  ...payload
}
```

## Predefined actions

All the actions below are processed by `kaReducer`. Every action has an action creator: a function which returns the action. There are two ways to dispatch a predefined action:

```js
// a table with its own state: the action creators are the methods of the instance
const table = useTable();
table.selectRow(1);
table.updatePageIndex(2);
```

```js
// a controlled table, or dispatch of a child component
import { selectRow } from 'ka-table/actionCreators';

dispatch(selectRow(1)); // the same as dispatch({ type: 'SelectRow', rowKeyValue: 1 })
```

The column "UI" shows the actions which the table dispatches itself in response to the events of the UI (see [UI Actions](./docs_ui.html#ui-actions)).

<!-- generated:start actions: from the JSDoc of src/lib/actionCreators.ts, edit it and run yarn docs -->

### Editing

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'OpenEditor'</code><br/><code class="creator">openEditor(<wbr/>rowKeyValue, columnKey)</code> | <code class="action">{<br/>type: 'OpenEditor',<br/>rowKeyValue: unknown,<br/>columnKey: string<br/>}</code> | yes | Add cell to _editableCells_ |
| <code class="action">'OpenRowEditors'</code><br/><code class="creator">openRowEditors(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'OpenRowEditors',<br/>rowKeyValue: unknown<br/>}</code> | no | Add row cells to _editableCells_ |
| <code class="action">'OpenAllEditors'</code><br/><code class="creator">openAllEditors()</code> | <code class="action">{<br/>type: 'OpenAllEditors'<br/>}</code> | no | Adds each data cell to _editableCells_ |
| <code class="action">'CloseEditor'</code><br/><code class="creator">closeEditor(<wbr/>rowKeyValue, columnKey)</code> | <code class="action">{<br/>type: 'CloseEditor',<br/>rowKeyValue: unknown,<br/>columnKey: string<br/>}</code> | yes | Removes cell from _editableCells_ <br/>note: when _EditingMode.Cell_ is enabled table calls _CloseEditor_ action each time editor loses focus |
| <code class="action">'CloseRowEditors'</code><br/><code class="creator">closeRowEditors(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'CloseRowEditors',<br/>rowKeyValue: unknown<br/>}</code> | no | Removes row cells from _editableCells_ |
| <code class="action">'UpdateEditorValue'</code><br/><code class="creator">updateEditorValue(<wbr/>rowKeyValue, columnKey, value)</code> | <code class="action">{<br/>type: 'UpdateEditorValue',<br/>rowKeyValue: unknown,<br/>columnKey: string,<br/>value: unknown<br/>}</code> | yes | Update editorCell in _editableCells_ |
| <code class="action">'UpdateCellValue'</code><br/><code class="creator">updateCellValue(<wbr/>rowKeyValue, columnKey, value)</code> | <code class="action">{<br/>type: 'UpdateCellValue',<br/>rowKeyValue: unknown,<br/>columnKey: string,<br/>value: unknown<br/>}</code> | yes | Update _data_ |
| <code class="action">'SaveRowEditors'</code><br/><code class="creator">saveRowEditors(<wbr/>rowKeyValue, settings?)</code> | <code class="action">{<br/>type: 'SaveRowEditors',<br/>rowKeyValue: unknown,<br/>validate?: boolean<br/>}</code> | no | Saves editor values to _data_ and removes row cells from _editableCells_. <br/>Settings is optional: <br/>validate - validate values before save, do not save and do not close if validation is unsuccessful. |
| <code class="action">'SaveAllEditors'</code><br/><code class="creator">saveAllEditors()</code> | <code class="action">{<br/>type: 'SaveAllEditors'<br/>}</code> | no | Saves _editableCells_ editorValues to _data_ |
| <code class="action">'Validate'</code><br/><code class="creator">validate()</code> | <code class="action">{<br/>type: 'Validate'<br/>}</code> | no | Adds/removes _validationMessage_ to/from _editableCells_ items |
| <code class="action">'ShowNewRow'</code><br/><code class="creator">showNewRow()</code> | <code class="action">{<br/>type: 'ShowNewRow'<br/>}</code> | no | Add new row cells to _editableCells_ |
| <code class="action">'HideNewRow'</code><br/><code class="creator">hideNewRow()</code> | <code class="action">{<br/>type: 'HideNewRow'<br/>}</code> | no | Removes row cells from _editableCells_ |
| <code class="action">'SaveNewRow'</code><br/><code class="creator">saveNewRow(<wbr/>rowKeyValue, settings?)</code> | <code class="action">{<br/>type: 'SaveNewRow',<br/>rowKeyValue: unknown,<br/>validate?: boolean<br/>}</code> | no | Saves editor values to the new item of _data_ and removes row cells from _editableCells_. <br/>Settings is optional: <br/>validate - validate values before save, do not save if validation is unsuccessful. |

### Data and loading

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'UpdateData'</code><br/><code class="creator">updateData(<wbr/>data)</code> | <code class="action">{<br/>type: 'UpdateData',<br/>data: unknown[]<br/>}</code> | no | Update _data_ |
| <code class="action">'UpdateRow'</code><br/><code class="creator">updateRow(<wbr/>rowData)</code> | <code class="action">{<br/>type: 'UpdateRow',<br/>rowData: unknown<br/>}</code> | no | Replaces the row with the same key in _data_ |
| <code class="action">'InsertRow'</code><br/><code class="creator">insertRow(<wbr/>rowData, options?)</code> | <code class="action">{<br/>type: 'InsertRow',<br/>rowData: unknown,<br/>options?: { rowKeyValue?: unknown, insertRowPosition?: ('before' &#124; 'after') }<br/>}</code> | no | Inserts row to specific position in the _data_ |
| <code class="action">'DeleteRow'</code><br/><code class="creator">deleteRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'DeleteRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Deletes row from _data_ and its key from _selectedRows_, _detailsRows_, _treeGroupsExpanded_, _editableCells_ and _focused_ |
| <code class="action">'ReorderRows'</code><br/><code class="creator">reorderRows(<wbr/>rowKeyValue, targetRowKeyValue)</code> | <code class="action">{<br/>type: 'ReorderRows',<br/>rowKeyValue: unknown,<br/>targetRowKeyValue: unknown<br/>}</code> | yes | Place rowKeyValue to the position of targetRowKeyValue |
| <code class="action">'LoadData'</code><br/><code class="creator">loadData()</code> | <code class="action">{<br/>type: 'LoadData'<br/>}</code> | no | Notifies grid about time to reload its data |
| <code class="action">'ShowLoading'</code><br/><code class="creator">showLoading(<wbr/>text?)</code> | <code class="action">{<br/>type: 'ShowLoading',<br/>text?: string<br/>}</code> | no | Set _loading_ = true and updates the text if text is specified |
| <code class="action">'HideLoading'</code><br/><code class="creator">hideLoading()</code> | <code class="action">{<br/>type: 'HideLoading'<br/>}</code> | no | Set _loading_ = false |

### Columns

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'ShowColumn'</code><br/><code class="creator">showColumn(<wbr/>columnKey)</code> | <code class="action">{<br/>type: 'ShowColumn',<br/>columnKey: string<br/>}</code> | no | Sets _visible=true_ for specific column |
| <code class="action">'HideColumn'</code><br/><code class="creator">hideColumn(<wbr/>columnKey)</code> | <code class="action">{<br/>type: 'HideColumn',<br/>columnKey: string<br/>}</code> | no | Sets _visible=false_ for specific column |
| <code class="action">'InsertColumn'</code><br/><code class="creator">insertColumn(<wbr/>column, index)</code> | <code class="action">{<br/>type: 'InsertColumn',<br/>column: Column,<br/>index: number<br/>}</code> | no | Inserts column to specific position in the _columns_ |
| <code class="action">'MoveColumnBefore'</code><br/><code class="creator">moveColumnBefore(<wbr/>columnKey, targetColumnKey)</code> | <code class="action">{<br/>type: 'MoveColumnBefore',<br/>columnKey: string,<br/>targetColumnKey: string<br/>}</code> | no | Move _columnKey_ to position before _targetColumnKey_ in _columns_ |
| <code class="action">'MoveColumnToIndex'</code><br/><code class="creator">moveColumnToIndex(<wbr/>columnKey, index)</code> | <code class="action">{<br/>type: 'MoveColumnToIndex',<br/>columnKey: string,<br/>index: number<br/>}</code> | no | Move _columnKey_ to _index_ position in _columns_ |
| <code class="action">'ReorderColumns'</code><br/><code class="creator">reorderColumns(<wbr/>columnKey, targetColumnKey)</code> | <code class="action">{<br/>type: 'ReorderColumns',<br/>columnKey: string,<br/>targetColumnKey: string<br/>}</code> | yes | Place columnKey to the position of targetColumnKey |
| <code class="action">'ResizeColumn'</code><br/><code class="creator">resizeColumn(<wbr/>columnKey, width)</code> | <code class="action">{<br/>type: 'ResizeColumn',<br/>columnKey: string,<br/>width: number<br/>}</code> | yes | Change column width |

### Sorting, filtering and search

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'UpdateSortDirection'</code><br/><code class="creator">updateSortDirection(<wbr/>columnKey)</code> | <code class="action">{<br/>type: 'UpdateSortDirection',<br/>columnKey: string<br/>}</code> | yes | Update _sortDirection_ to the opposite for specific column |
| <code class="action">'UpdateFilterRowValue'</code><br/><code class="creator">updateFilterRowValue(<wbr/>columnKey, filterRowValue)</code> | <code class="action">{<br/>type: 'UpdateFilterRowValue',<br/>columnKey: string,<br/>filterRowValue: unknown<br/>}</code> | yes | Update _filterRowValue_ for specific column |
| <code class="action">'UpdateFilterRowOperator'</code><br/><code class="creator">updateFilterRowOperator(<wbr/>columnKey, filterRowOperator)</code> | <code class="action">{<br/>type: 'UpdateFilterRowOperator',<br/>columnKey: string,<br/>filterRowOperator: string<br/>}</code> | no | Update _filterRowOperator_ for specific column |
| <code class="action">'UpdateHeaderFilterValues'</code><br/><code class="creator">updateHeaderFilterValues(<wbr/>columnKey, item, checked)</code> | <code class="action">{<br/>type: 'UpdateHeaderFilterValues',<br/>columnKey: string,<br/>item: string,<br/>checked: boolean<br/>}</code> | yes | Fires when user selects/deselects value in the header filter |
| <code class="action">'UpdateHeaderFilterPopupState'</code><br/><code class="creator">updateHeaderFilterPopupState(<wbr/>columnKey, isHeaderFilterPopupShown?)</code> | <code class="action">{<br/>type: 'UpdateHeaderFilterPopupState',<br/>columnKey: string,<br/>isHeaderFilterPopupShown?: boolean<br/>}</code> | yes | Shows/hides the header filter popup |
| <code class="action">'UpdateHeaderFilterSearchValue'</code><br/><code class="creator">updateHeaderFilterSearchValue(<wbr/>columnKey, headerFilterSearchValue)</code> | <code class="action">{<br/>type: 'UpdateHeaderFilterSearchValue',<br/>columnKey: string,<br/>headerFilterSearchValue: string<br/>}</code> | yes | Updates the search text of the header filter popup |
| <code class="action">'UpdatePopupPosition'</code><br/><code class="creator">updatePopupPosition(<wbr/>popupPosition)</code> | <code class="action">{<br/>type: 'UpdatePopupPosition',<br/>popupPosition: { x?: number; y?: number; }<br/>}</code> | yes | Fires when header filter popup is shown |
| <code class="action">'ClearAllFilters'</code><br/><code class="creator">clearAllFilters()</code> | <code class="action">{<br/>type: 'ClearAllFilters'<br/>}</code> | no | Clears all table filters |
| <code class="action">'Search'</code><br/><code class="creator">search(<wbr/>searchText)</code> | <code class="action">{<br/>type: 'Search',<br/>searchText: string<br/>}</code> | no | Change _searchText_ option |

### Grouping, tree and details rows

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'GroupColumn'</code><br/><code class="creator">groupColumn(<wbr/>columnKey)</code> | <code class="action">{<br/>type: 'GroupColumn',<br/>columnKey: string<br/>}</code> | yes | Groups _columnKey_ |
| <code class="action">'UngroupColumn'</code><br/><code class="creator">ungroupColumn(<wbr/>columnKey)</code> | <code class="action">{<br/>type: 'UngroupColumn',<br/>columnKey: string<br/>}</code> | yes | Ungroups _columnKey_ |
| <code class="action">'UpdateGroupsExpanded'</code><br/><code class="creator">updateGroupsExpanded(<wbr/>groupKey)</code> | <code class="action">{<br/>type: 'UpdateGroupsExpanded',<br/>groupKey: unknown[]<br/>}</code> | yes | Add/remove group id to/from _groupsExpanded_ |
| <code class="action">'UpdateTreeGroupsExpanded'</code><br/><code class="creator">updateTreeGroupsExpanded(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'UpdateTreeGroupsExpanded',<br/>rowKeyValue: unknown<br/>}</code> | yes | Adds/removes _rowKeyValue_ to/from _treeGroupsExpanded_ |
| <code class="action">'ShowDetailsRow'</code><br/><code class="creator">showDetailsRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'ShowDetailsRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Adds the row key to _detailsRows_ |
| <code class="action">'HideDetailsRow'</code><br/><code class="creator">hideDetailsRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'HideDetailsRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Removes the row key from _detailsRows_ |

### Paging and scrolling

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'UpdatePageIndex'</code><br/><code class="creator">updatePageIndex(<wbr/>pageIndex)</code> | <code class="action">{<br/>type: 'UpdatePageIndex',<br/>pageIndex: number<br/>}</code> | yes | Update _paging.pageIndex_ option and show new page data |
| <code class="action">'UpdatePageSize'</code><br/><code class="creator">updatePageSize(<wbr/>pageSize)</code> | <code class="action">{<br/>type: 'UpdatePageSize',<br/>pageSize: number<br/>}</code> | yes | Update _paging.pageSize_, the first row of the page stays shown |
| <code class="action">'UpdatePagesCount'</code><br/><code class="creator">updatePagesCount(<wbr/>pagesCount)</code> | <code class="action">{<br/>type: 'UpdatePagesCount',<br/>pagesCount: number<br/>}</code> | no | Update _paging.pagesCount_ (remote paging) |

### Selection

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'SelectRow'</code><br/><code class="creator">selectRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'SelectRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Add row id to _selectedRows_ |
| <code class="action">'SelectRows'</code><br/><code class="creator">selectRows(<wbr/>rowsKeyValues)</code> | <code class="action">{<br/>type: 'SelectRows',<br/>rowsKeyValues: unknown[]<br/>}</code> | no | Add rows ids to _selectedRows_ |
| <code class="action">'SelectRowsRange'</code><br/><code class="creator">selectRowsRange(<wbr/>rowKeyValueFrom, rowKeyValueTo)</code> | <code class="action">{<br/>type: 'SelectRowsRange',<br/>rowKeyValueFrom: unknown,<br/>rowKeyValueTo: unknown<br/>}</code> | no | rowKeyValueFrom, rowKeyValueTo describe start and end of visible elements range, all ids added to _selectedRows_ |
| <code class="action">'SelectSingleRow'</code><br/><code class="creator">selectSingleRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'SelectSingleRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Set _selectedRows_ as an array with one row id |
| <code class="action">'SelectAllRows'</code><br/><code class="creator">selectAllRows()</code> | <code class="action">{<br/>type: 'SelectAllRows'<br/>}</code> | no | Add all items ids of _data_ to _selectedRows_ |
| <code class="action">'SelectAllFilteredRows'</code><br/><code class="creator">selectAllFilteredRows()</code> | <code class="action">{<br/>type: 'SelectAllFilteredRows'<br/>}</code> | no | Add all filtered items ids of _data_ to _selectedRows_ |
| <code class="action">'SelectAllVisibleRows'</code><br/><code class="creator">selectAllVisibleRows()</code> | <code class="action">{<br/>type: 'SelectAllVisibleRows'<br/>}</code> | no | Add all visible items ids of _data_ to _selectedRows_ |
| <code class="action">'DeselectRow'</code><br/><code class="creator">deselectRow(<wbr/>rowKeyValue)</code> | <code class="action">{<br/>type: 'DeselectRow',<br/>rowKeyValue: unknown<br/>}</code> | no | Removes row id from _selectedRows_ |
| <code class="action">'DeselectRows'</code><br/><code class="creator">deselectRows(<wbr/>rowsKeyValues)</code> | <code class="action">{<br/>type: 'DeselectRows',<br/>rowsKeyValues: unknown[]<br/>}</code> | no | Removes rows ids from _selectedRows_ |
| <code class="action">'DeselectAllRows'</code><br/><code class="creator">deselectAllRows()</code> | <code class="action">{<br/>type: 'DeselectAllRows'<br/>}</code> | no | Clears _selectedRows_ |
| <code class="action">'DeselectAllFilteredRows'</code><br/><code class="creator">deselectAllFilteredRows()</code> | <code class="action">{<br/>type: 'DeselectAllFilteredRows'<br/>}</code> | no | Remove all filtered items ids of _data_ to _selectedRows_ |
| <code class="action">'DeselectAllVisibleRows'</code><br/><code class="creator">deselectAllVisibleRows()</code> | <code class="action">{<br/>type: 'DeselectAllVisibleRows'<br/>}</code> | no | Remove all visible items ids of _data_ to _selectedRows_ |

### Focus

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'SetFocused'</code><br/><code class="creator">setFocused(<wbr/>focused)</code> | <code class="action">{<br/>type: 'SetFocused',<br/>focused: Focused<br/>}</code> | yes | Set _focused_ property: the cell or the group row focused by a click, Tab or the keyboard navigation |
| <code class="action">'ClearFocused'</code><br/><code class="creator">clearFocused()</code> | <code class="action">{<br/>type: 'ClearFocused'<br/>}</code> | no | Sets focused as undefined |
| <code class="action">'MoveFocusedUp'</code><br/><code class="creator">moveFocusedUp(<wbr/>settings?)</code> | <code class="action">{<br/>type: 'MoveFocusedUp',<br/>settings?: { end?: boolean; }<br/>}</code> | no | Move focused one cell up |
| <code class="action">'MoveFocusedDown'</code><br/><code class="creator">moveFocusedDown(<wbr/>settings?)</code> | <code class="action">{<br/>type: 'MoveFocusedDown',<br/>settings?: { end?: boolean; }<br/>}</code> | no | Move focused one cell down |
| <code class="action">'MoveFocusedLeft'</code><br/><code class="creator">moveFocusedLeft(<wbr/>settings?)</code> | <code class="action">{<br/>type: 'MoveFocusedLeft',<br/>settings?: { end?: boolean; }<br/>}</code> | no | Move focused one cell left |
| <code class="action">'MoveFocusedRight'</code><br/><code class="creator">moveFocusedRight(<wbr/>settings?)</code> | <code class="action">{<br/>type: 'MoveFocusedRight',<br/>settings?: { end?: boolean; }<br/>}</code> | no | Move focused one cell right |

### Single action

| Type and action creator | Action | UI | kaReducer |
| --- | --- | --- | --- |
| <code class="action">'SetSingleAction'</code><br/><code class="creator">setSingleAction(<wbr/>singleAction)</code> | <code class="action">{<br/>type: 'SetSingleAction',<br/>singleAction: CustomAction<br/>}</code> | no | Set _singleAction_ property |
| <code class="action">'ClearSingleAction'</code><br/><code class="creator">clearSingleAction()</code> | <code class="action">{<br/>type: 'ClearSingleAction'<br/>}</code> | no | Sets singleAction as undefined |

<!-- generated:end -->

### TypeScript

In TypeScript the actions of the table are `TableAction` (`ka-table/types`): a union which is narrowed by `action.type`, so `onDispatch`, `customReducer` and `dispatch` of a controlled table get typed actions:

```tsx
import { ActionType } from 'ka-table/enums';

const table = useTable({
  onDispatch: (action) => {
    if (action.type === ActionType.UpdatePageIndex) {
      loadPage(action.pageIndex); // number
    }
  },
});
```

## Custom actions

Custom actions also can be dispatched and processed by dispatch function or custom reducer:

```js
// declare const and action creator (optional)
export const CUSTOM_ACTION_TYPE = "CUSTOM_ACTION_TYPE";

export const customAction = (myData) => ({
  type: CUSTOM_ACTION_TYPE, // required
  myData // optional payload
});
```

```js
// dispatch custom action
dispatch(customAction({ value: 5 }));
```

```tsx
const [tableProps, changeTableProps] = useState(tablePropsInit);

// process action in the dispatch or pass it to custom reducer
const dispatch: DispatchFunc = (action) => {
  switch (action.type) {
    case CUSTOM_ACTION_TYPE:
      // action.myData.value == 5
      // do action things or pass it to the custom reducer
      break;
    default:
      changeTableProps((prevState) => kaReducer(prevState, action));
  }
};

return (
  <Table
    {...tableProps}
    dispatch={dispatch} // pass dispatch to be able to obtain actions from Table
  />
);
```

In TypeScript `dispatch` accepts the actions of the table and the actions of your own code (`CustomAction`: a `type` and any other fields). `onDispatch` and `customReducer` of `useTable` get `TableAction`: add the type of your actions to the parameter.

```tsx
interface LoadMoreAction { type: 'LOAD_MORE' }

const table = useTable({
  onDispatch: (action: TableAction | LoadMoreAction) => {
    if (action.type === 'LOAD_MORE') { /* ... */ }
  },
});
table.dispatch({ type: 'LOAD_MORE' });
```
