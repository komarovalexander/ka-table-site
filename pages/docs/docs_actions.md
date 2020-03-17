---
title: "Actions"
keywords: ka-table, react table, flux, redux, actions
sidebar: mydoc_sidebar
search: include
permalink: docs_actions.html
url: docs_actions.html
toc: false
---


| Type | Action | ActionCreator | Notes |
| --- | --- | --- | --- |
| 'ChangeCellValue' | {<br/>type:'ChangeCellValue',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>value: any,<br/>} | changeCellValue(<br/> rowKeyValue,<br/> columnKey,<br/> value<br/>) | update value for cell |
| 'ChangeFilterRowOperator' | {<br/>type:'ChangeFilterRowOperator',<br/>columnKey: string,<br/>filterRowOperator: string<br/>} | changeFilterRowOperator(<br/> columnKey,<br/> filterRowOperator<br/>) | update filterRowOperator for column |
| 'ChangeFilterRowValue' | {<br/>type:'ChangeFilterRowValue',<br/>columnKey: string,<br/>filterRowValue: any<br/>} | changeFilterRowValue(<br/> columnKey,<br/> filterRowValue<br/>) | update filterRowValue for column |
| 'ChangeSortingDirection' | {<br/>type:'ChangeSortingDirection',<br/>columnKey: string<br/>} | changeSortingDirection(<br/> columnKey<br/>) | change sortingDirection to the opposite for column |
| 'CloseEditor' | {<br/>type:'CloseEditor',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>} | closeEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | close cell editor |
| 'DeleteRow' | {<br/>type:'DeleteRow',<br/>rowKeyValue: any<br/>} | deleteRow(<br/> rowKeyValue<br/>) | delete row by id |
| 'DeselectAllRows' | {<br/>type:'DeselectAllRows'} | deselectAllRows() | deselect all rows in table |
| 'DeselectRow' | {<br/>type:'DeselectRow',<br/>rowKeyValue: any<br/>} | deselectRow(<br/> rowKeyValue<br/>) | deselect row by id |
| 'ExpandGroup' | {<br/>type:'ExpandGroup',<br/>groupKey: any[]<br/>} | expandGroup(<br/> groupKey<br/>) | expand group item |
| 'OpenEditor' | {<br/>type:'OpenEditor',<br/>rowKeyValue: any,<br/>columnKey: string,<br/>} | openEditor(<br/> rowKeyValue,<br/> columnKey<br/>) | open cell editor |
| 'Search' | {<br/>type:'Search',<br/>searchValue: any<br/>} | search(<br/>searchValue<br/>) | search by grid data |
| 'SelectAllRows' | {<br/>type:'SelectAllRows'} | selectAllRows() | select all rows in table |
| 'SelectRow' | {<br/>type:'SelectRow',<br/>rowKeyValue: any<br/>} | selectRow(<br/> rowKeyValue<br/>) | select row by id |
| 'SelectSingleRow' | {<br/>type:'SelectSingleRow',<br/>rowKeyValue: any<br/>} | selectSingleRow(<br/> rowKeyValue<br/>) | select row by id, and deselect other rows |
