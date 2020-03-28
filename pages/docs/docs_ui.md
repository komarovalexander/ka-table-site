---
title: "UI"
keywords: ka-table, react table, flux, redux, actions
sidebar: mydoc_sidebar
search: include
permalink: docs_ui.html
url: docs_ui.html
toc: false
---

Table UI is stateless - every change of the UI only can dispatch action

There are [predefined and custom actions](./docs_action.html) which ka-table UI dispatches in response to user interaction

Every part of the UI (Row, GroupRow, Column, HeaderCell, Cell, Editors) is customizable and can be set up as a custom component ([see props](./docs_props.html))

![Pattern](./images/customisation.svg)

Attributes of the UI elements also can be customized using [childAttributes](./docs_props.html#childattributes) ([see Events demo](https://komarovalexander.github.io/ka-table/#/events){:target="_blank"}).

```js
  const childAttributes: ChildAttributes = {
    cell: {
      className: 'my-cell-class', // add custom class to cell element
      onClick: (e, extendedEvent) => {  // additional onClick handler for cell
        const { childProps: { dispatch } } = extendedEvent;
        dispatch('MY_CELL_onClick', { extendedEvent });
      },
    },
    dataRow: {
      onContextMenu: (e, extendedEvent) => { // additional onContextMenu handler for dataRow
        extendedEvent.dispatch('MY_CELL_onContextMenu', { extendedEvent });
      },
    }
  };
```



