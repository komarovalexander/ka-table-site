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

Action is an object which contains type and payload
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
| 'CloseEditor' | {<br/>type:'CloseEditor',<br/>rowKeyValue: any,<br/>columnKey: string<br/>} | closeEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | yes | removes cell from *editableCells* |
| 'CloseRowEditors' | {<br/>type:'CloseRowEditors',<br/>rowKeyValue: any<br/>} | closeRowEditors(<br/> rowKeyValue<br/>) | no | removes row cells from *editableCells* |
| 'DeleteRow' | {<br/>type:'DeleteRow',<br/>rowKeyValue: any<br/>} | deleteRow(<br/> rowKeyValue<br/>) | no | deletes row from *data* |
| 'DeselectAllRows' | {<br/>type:'DeselectAllRows'} | deselectAllRows() | no | clears *selectedRows* |
| 'DeselectRow' | {<br/>type:'DeselectRow',<br/>rowKeyValue: any<br/>} | deselectRow(<br/> rowKeyValue<br/>) | no | removes row id from *selectedRows* |
| 'HideLoading' | {<br/>type:'HideLoading'<br/>} | hideLoading() | no | set *loading* = false |
| 'HideNewRow' | {<br/>type:'HideNewRow'<br/>} | hideNewRow() | no | removes row cells from *editableCells* |
| 'OpenEditor' | {<br/>type:'OpenEditor',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>} | openEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | yes | add cell to *editableCells* |
| 'OpenRowEditors' | {<br/>type:'OpenRowEditors',<br/>rowKeyValue: any<br/>} | openRowEditors(<br/> rowKeyValue<br/>) | no | add row cells to *editableCells* |
| 'ReorderColumns' | {<br/>type:'ReorderColumns',<br/>columnKey: any<br/>,targetColumnKey: any<br/>} | rorderColumns(<br/> columnKey<br/>, targetColumnKey<br/>) | yes | place columnKey to the position of targetColumnKey |
| 'ReorderRows' | {<br/>type:'ReorderRows',<br/>rowKeyValue: any<br/>,targetRowKeyValue: any<br/>} | reorderRows(<br/> rowKeyValue<br/>, targetRowKeyValue<br/>) | yes | place rowKeyValue to the position of targetRowKeyValue |
| 'ResizeColumn' | {<br/>type:'ResizeColumn',<br/>columnKey: string<br/>,width: number<br/>} | resizeColumn(<br/> columnKey<br/>, width<br/>) | yes | chane column width |
| 'SaveNewRow' | {<br/>type:'SaveNewRow',<br/>rowKeyValue: any,<br/>validate?: boolean<br/>} | saveNewRow(<br/> rowKeyValue,<br/> settings?: {  validate?: boolean }<br/>) | no | Saves editor values to the new item of *data* and removes row cells from *editableCells*. <br/>Settings is optional: <br/>validate - validate values before save, do not save if validation is unsuccessful. |
| 'SaveRowEditors' | {<br/>type:'SaveRowEditors',<br/>rowKeyValue: any,<br/>closeAfterSave?: boolean,<br/>validate?: boolean<br/>} | saveNewRow(<br/> rowKeyValue,<br/> settings?: {  validate?: boolean }<br/>) | no | Saves editor values to *data** and removes row cells from *editableCells*. <br/>Settings is optional: <br/>validate - validate values before save, do not save and do not close if validation is unsuccessful. |
| 'Search' | {<br/>type:'Search',<br/>searchValue: any<br/>} | search(<br/>searchValue<br/>) | no | change *search* option |
| 'SelectAllRows' | {<br/>type:'SelectAllRows'<br/>} | selectAllRows() | no | add all items ids of *data* to *selectedRows* |
| 'SelectRow' | {<br/>type:'SelectRow',<br/>rowKeyValue: any<br/>} | selectRow(<br/> rowKeyValue<br/>) | no | add row id to *selectedRows* |
| 'SelectRowsRange' | {<br/>type:'SelectRowsRange',<br/>rowKeyValueFrom: any,<br/>rowKeyValueTo: any<br/>} | selectRowsRange(<br/> rowKeyValueFrom,<br/>rowKeyValueTo<br/>) | no | rowKeyValueFrom, rowKeyValueTo describe start and end of visible elements range, all ids added to *selectedRows* |
| 'SelectSingleRow' | {<br/>type:'SelectSingleRow',<br/>rowKeyValue: any<br/>} | selectSingleRow(<br/> rowKeyValue<br/>) | no | set *selectedRows* as an array with one row id |
| 'ShowLoading' | {<br/>type:'ShowLoading',<br/>text?:string<br/>} | showLoading(text?) | no | set *loading* = true and updates the text if text is specified |
| 'ShowNewRow ' | {<br/>type:'ShowNewRow '<br/>} | showNewRow() | no | add new row cells to *editableCells* |
| 'UpdateCellValue' | {<br/>type:'UpdateCellValue',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>value: any,<br/>} | changeCellValue(<br/>rowKeyValue,<br/> columnKey,<br/>value<br/>) | yes | update *data* |
| 'UpdateData' | {<br/>type:'UpdateData',<br/>data: any[]<br/>} | updateData(<br/> data<br/>) | no | update *data* |
| 'UpdateEditorValue' | {<br/>type:'UpdateEditorValue',,<br/>rowKeyValue: any,<br/>columnKey: string<br/>value: any,<br/>} | updateEditorValue(<br/>rowKeyValue,<br/>columnKey,<br/>value<br/>) | no | update editorCell in *editableCells* |
| 'UpdateFilterRowOperator' | {<br/>type:'UpdateFilterRowOperator',<br/>columnKey: string,<br/>filterRowOperator: string<br/>} | updateFilterRowOperator(<br/> columnKey,<br/> filterRowOperator<br/>) | no | update *filterRowOperator* for specific column |
| 'UpdateFilterRowValue' | {<br/>type:'UpdateFilterRowValue',<br/>columnKey: string,<br/>filterRowValue: any<br/>} | updateFilterRowValue(<br/> columnKey,<br/> filterRowValue<br/>) | yes | update *filterRowValue* for specific column |
| 'UpdateGroupsExpanded' | {<br/>type:'UpdateGroupsExpanded',<br/>groupKey: any[]<br/>} | updateGroupsExpanded(<br/> groupKey<br/>) | yes | add/remove group id to/from *groupsExpanded* |
| 'UpdatePageIndex' | {<br/>type:'UpdatePageIndex',<br/>pageIndex: number,<br/>} | updatePageIndex(<br/> pageIndex<br/>) | yes | update *paging.pageIndex* option and show new page data |
| 'UpdateSortDirection' | {<br/>type:'UpdateSortDirection',<br/>columnKey: string<br/>} | updateSortDirection(<br/> columnKey<br/>) | yes | update *sortDirection* to the oposite for specific column |

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