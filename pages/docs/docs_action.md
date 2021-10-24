---
title: "Action"
keywords: ka-table, react table, flux, redux, actions
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

Predefined actions have action creator functions for shorter way to create actions. <br/>
UI has predefined behavior and some actions are executed out-of-the-box (OOTB) in the response on events in the UI. <br/>
All of actions below are processed by kaReducer:

| Type | Action | ActionCreator | <nobr>UI OOTB</nobr> | kaReducer |
| --- | --- | --- | --- |
| 'ClearFocused' | {<br/>type:'ClearFocused'<br/>} | clearFocused() | no | sets focused as undefined |
| 'ClearSingleAction' | {<br/>type:'ClearSingleAction'<br/>} | clearSingleAction() | no | sets singleAction as undefined |
| 'CloseEditor' | {<br/>type:'CloseEditor',<br/>rowKeyValue: any,<br/>columnKey: string<br/>} | closeEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | yes | removes cell from *editableCells* |
| 'CloseRowEditors' | {<br/>type:'CloseRowEditors',<br/>rowKeyValue: any<br/>} | closeRowEditors(<br/> rowKeyValue<br/>) | no | removes row cells from *editableCells* |
| 'DeleteRow' | {<br/>type:'DeleteRow',<br/>rowKeyValue: any<br/>} | deleteRow(<br/> rowKeyValue<br/>) | no | deletes row from *data* |
| 'DeselectAllFilteredRows' | {<br/>type:'DeselectAllFilteredRows'} | deselectAllFilteredRows() | no | remove all filtered items ids of *data* to *selectedRows* |
| 'DeselectAllRows' | {<br/>type:'DeselectAllRows'} | deselectAllRows() | no | clears *selectedRows* |
| 'DeselectAllVisibleRows' | {<br/>type:'DeselectAllVisibleRows'} | deselectAllVisibleRows() | no | remove all visible items ids of *data* to *selectedRows* |
| 'DeselectRow' | {<br/>type:'DeselectRow',<br/>rowKeyValue: any<br/>} | deselectRow(<br/> rowKeyValue<br/>) | no | removes row id from *selectedRows* |
| 'HideColumn' | {<br/>type:'HideColumn',<br/>columnKey: any<br/>} | hideColumn(<br/> rowKeyValue<br/>) | no | sets *visible=false* for specific column |
| 'HideLoading' | {<br/>type:'HideLoading'<br/>} | hideLoading() | no | set *loading* = false |
| 'HideNewRow' | {<br/>type:'HideNewRow'<br/>} | hideNewRow() | no | removes row cells from *editableCells* |
| 'InserRow' | {<br/>type:'InsetRow',<br/> rowData: any,<br/> options: { rowKeyValue: any, insertRowPosition: 'after' | 'before'} <br/>} | insertRow(<br/> rowData,<br/> options) | no | Inserts row to specific position in the *data* |
| 'LoadData' | {<br/>type:'LoadData'<br/>} | loadData() | no | notifies grid about time to reload its data |
| 'MoveFocusedDown' | {<br/>type:'MoveFocusedDown',<br/>settings?: { end?: boolean } <br/>} | moveFocusedDown(settings) | no | move focused one cell down |
| 'MoveFocusedLeft' | {<br/>type:'MoveFocusedLeft',<br/>settings?: { end?: boolean } <br/>} | moveFocusedLeft(settings) | no | move focused one cell left |
| 'MoveFocusedRight' | {<br/>type:'MoveFocusedRight',<br/>settings?: { end?: boolean } <br/>} | moveFocusedRight(settings) | no | move focused one cell right |
| 'MoveFocusedUp' | {<br/>type:'MoveFocusedUp',<br/>settings?: { end?: boolean } <br/>} | moveFocusedUp(settings) | no | move focused one cell up |
| 'OpenAllEditors' | {<br/>type:'OpenAllEditors'} | openAllEditors() | no | adds each data cell to *editableCells* |
| 'OpenEditor' | {<br/>type:'OpenEditor',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>} | openEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | yes | add cell to *editableCells* |
| 'OpenRowEditors' | {<br/>type:'OpenRowEditors',<br/>rowKeyValue: any<br/>} | openRowEditors(<br/> rowKeyValue<br/>) | no | add row cells to *editableCells* |
| 'ReorderColumns' | {<br/>type:'ReorderColumns',<br/>columnKey: any<br/>,targetColumnKey: any<br/>} | rorderColumns(<br/> columnKey<br/>, targetColumnKey<br/>) | yes | place columnKey to the position of targetColumnKey |
| 'ReorderRows' | {<br/>type:'ReorderRows',<br/>rowKeyValue: any<br/>,targetRowKeyValue: any<br/>} | reorderRows(<br/> rowKeyValue<br/>, targetRowKeyValue<br/>) | yes | place rowKeyValue to the position of targetRowKeyValue |
| 'ResizeColumn' | {<br/>type:'ResizeColumn',<br/>columnKey: string<br/>,width: number<br/>} | resizeColumn(<br/> columnKey<br/>, width<br/>) | yes | chane column width |
| 'SaveAllEditors' | {<br/>type:'SaveAllEditors'} | saveAllEditors() | no | saves *editableCells* editorValues to *data* |
| 'SaveNewRow' | {<br/>type:'SaveNewRow',<br/>rowKeyValue: any,<br/>validate?: boolean<br/>} | saveNewRow(<br/> rowKeyValue,<br/> settings?: {  validate?: boolean }<br/>) | no | Saves editor values to the new item of *data* and removes row cells from *editableCells*. <br/>Settings is optional: <br/>validate - validate values before save, do not save if validation is unsuccessful. |
| 'SaveRowEditors' | {<br/>type:'SaveRowEditors',<br/>rowKeyValue: any,<br/>closeAfterSave?: boolean,<br/>validate?: boolean<br/>} | saveNewRow(<br/> rowKeyValue,<br/> settings?: {  validate?: boolean }<br/>) | no | Saves editor values to *data** and removes row cells from *editableCells*. <br/>Settings is optional: <br/>validate - validate values before save, do not save and do not close if validation is unsuccessful. |
| 'Search' | {<br/>type:'Search',<br/>searchText: string<br/>} | search(<br/>searchText<br/>) | no | change *searchText* option |
| 'SelectAllRows' | {<br/>type:'SelectAllRows'<br/>} | selectAllRows() | no | add all items ids of *data* to *selectedRows* |
| 'SelectAllFilteredRows' | {<br/>type:'SelectAllFilteredRows'<br/>} | selectAllFilteredRows() | no | add all filtered items ids of *data* to *selectedRows* |
| 'SelectAllVisibleRows' | {<br/>type:'SelectAllVisibleRows'<br/>} | selectAllVisibleRows() | no | add all visible items ids of *data* to *selectedRows* |
| 'SelectRow' | {<br/>type:'SelectRow',<br/>rowKeyValue: any<br/>} | selectRow(<br/> rowKeyValue<br/>) | no | add row id to *selectedRows* |
| 'SelectRowsRange' | {<br/>type:'SelectRowsRange',<br/>rowKeyValueFrom: any,<br/>rowKeyValueTo: any<br/>} | selectRowsRange(<br/> rowKeyValueFrom,<br/>rowKeyValueTo<br/>) | no | rowKeyValueFrom, rowKeyValueTo describe start and end of visible elements range, all ids added to *selectedRows* |
| 'SelectSingleRow' | {<br/>type:'SelectSingleRow',<br/>rowKeyValue: any<br/>} | selectSingleRow(<br/> rowKeyValue<br/>) | no | set *selectedRows* as an array with one row id |
| 'SetFocused' | {<br/>type:'SetFocused',<br/>focused: any<br/>} | setFocused(<br/> focused<br/>) | no | set *focused* property |
| 'SetSingleAction' | {<br/>type:'SetSingleAction',<br/>singleAction: any<br/>} | setSingleAction(<br/> singleAction<br/>) | no | set *singleAction* property |
| 'ShowColumn' | {<br/>type:'ShowColumn',<br/>columnKey: any<br/>} | showColumn(<br/> rowKeyValue<br/>) | no | sets *visible=true* for specific column |
| 'ShowLoading' | {<br/>type:'ShowLoading',<br/>text?:string<br/>} | showLoading(text?) | no | set *loading* = true and updates the text if text is specified |
| 'ShowNewRow ' | {<br/>type:'ShowNewRow '<br/>} | showNewRow() | no | add new row cells to *editableCells* |
| 'UpdateCellValue' | {<br/>type:'UpdateCellValue',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>value: any,<br/>} | changeCellValue(<br/>rowKeyValue,<br/> columnKey,<br/>value<br/>) | yes | update *data* |
| 'UpdateData' | {<br/>type:'UpdateData',<br/>data: any[]<br/>} | updateData(<br/> data<br/>) | no | update *data* |
| 'UpdateEditorValue' | {<br/>type:'UpdateEditorValue',,<br/>rowKeyValue: any,<br/>columnKey: string<br/>value: any,<br/>} | updateEditorValue(<br/>rowKeyValue,<br/>columnKey,<br/>value<br/>) | no | update editorCell in *editableCells* |
| 'UpdateFilterRowOperator' | {<br/>type:'UpdateFilterRowOperator',<br/>columnKey: string,<br/>filterRowOperator: string<br/>} | updateFilterRowOperator(<br/> columnKey,<br/> filterRowOperator<br/>) | no | update *filterRowOperator* for specific column |
| 'UpdateFilterRowValue' | {<br/>type:'UpdateFilterRowValue',<br/>columnKey: string,<br/>filterRowValue: any<br/>} | updateFilterRowValue(<br/> columnKey,<br/> filterRowValue<br/>) | yes | update *filterRowValue* for specific column |
| 'UpdateGroupsExpanded' | {<br/>type:'UpdateGroupsExpanded',<br/>groupKey: any[]<br/>} | updateGroupsExpanded(<br/> groupKey<br/>) | yes | add/remove group id to/from *groupsExpanded* |
| 'UpdateHeaderFilterValues' | {<br/>type:'UpdateHeaderFilterValues',<br/>columnKey: string,<br/> item: any,<br/> checked: boolean<br/>} | updateHeaderFilterValues(<br/> columnKey,<br/> item,<br/> checked<br/>) | yes | fires when user selects/deselects value in the header filter |
| 'UpdateHeaderFilterPopupState' | {<br/>type:'UpdateHeaderFilterPopupState',<br/>columnKey: string,<br/> isHeaderFilterPopupShown?: boolean<br/>} | updateHeaderFilterPopupState(<br/> columnKey,<br/>isHeaderFilterPopupShown<br/>) | yes | shows/hides the header filter popup |
| 'UpdatePopupPosition' | {<br/>type:'UpdatePopupPosition',<br/>x: number,<br/> y: number<br/>} | updatePopupPosition(<br/> popupPosition: { x: number, y: number }<br/>) | yes | fires when header filter popup is shown |
| 'UpdatePageIndex' | {<br/>type:'UpdatePageIndex',<br/>pageIndex: number,<br/>} | updatePageIndex(<br/> pageIndex<br/>) | yes | update *paging.pageIndex* option and show new page data |
| 'UpdateSortDirection' | {<br/>type:'UpdateSortDirection',<br/>columnKey: string<br/>} | updateSortDirection(<br/> columnKey<br/>) | yes | update *sortDirection* to the oposite for specific column |
| 'UpdateTreeGroupsExpanded' | {<br/>type:'UpdateTreeGroupsExpanded',<br/>rowKeyValue: any<br/>} | updateTreeGroupsExpanded(<br/> rowKeyValue<br/>) | yes | adds/removes *rowKeyValue* to/from *treeGroupsExpanded* |
| 'Validate' | {<br/>type:'Validate'} | validate() | no | adds/removes *validationMessage* to/from *editableCells* items |

## Custom actions

Custom actions also can be dispatched and processed by dispatch function or custom reducer:
```js
  // declare const and action creator (optional)
  export const CUSTOM_ACTION_TYPE = "CUSTOM_ACTION_TYPE";

  export customAction = (myData) => ({
    type: CUSTOM_ACTION_TYPE, // required
    myData // optional payload
  });
```
```js
  // dispatch custom action
  dispatch(customAction({ value: 5 }))
```

```js
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  // process action in the dispatch or pass it to custom reducer
  const dispatch: DispatchFunc = (action) => {
    switch(action.type){
      case CUSTOM_ACTION_TYPE:
        // action.myData.value == 5
        // do action things or pass it to the custom reducer
        break;
      default: changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
    }
  };

  return (
    <Table
      {...tableProps}
      dispatch={dispatch} // pass dispatch to be able to obtain actions from Table
    />
  );
```