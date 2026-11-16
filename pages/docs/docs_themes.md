---
title: 'Themes'
keywords: ka-table, react table, theme, dark theme, css custom properties, bootstrap, material ui
description: The themes of ka-table - CSS custom properties, the dark theme and the styles of Bootstrap, Material UI and other libraries.
sidebar: mydoc_sidebar
search: include
permalink: docs_themes.html
url: docs_themes.html
id: themes
toc: true
---

The default theme is one CSS file:

```js
import 'ka-table/style.css';
```

## Customization

`ka-table/style.css` is plain CSS: every colour and size of the default theme is a CSS custom property (`--ka-*`) declared on the root element of the table (`.ka`). A theme is a rule which overrides the properties, for every table or for the tables inside a container. The properties are listed in the [readme](https://github.com/komarovalexander/ka-table#theming).

```css
.ka {
  --ka-background-color: #2c2c2c;
  --ka-thead-background-color: #1b1b1b;
  --ka-color-base: #fefefe;
}
```

The rule has to match `.ka` itself: a property set only on an ancestor (`:root`) is overridden by the defaults of the table. The package has no Sass files since 13.0.0.

Demo: [Custom Theme](https://komarovalexander.github.io/ka-table/#/custom-theme)

## Dark theme

```js
import 'ka-table/style.css';
import 'ka-table/themes/dark.css';
```

The theme is applied by the class `ka-dark` on the table or on an ancestor, e.g. `<body class="ka-dark">`.

Demo: [Dark Theme](https://komarovalexander.github.io/ka-table/#/dark-theme)

## Third-party libraries

As ka-table is a real html table it can be easily used with bootstrap, material or other frameworks.

To use other frameworks styles add required css classes for table elements using [childComponents](./docs_ui.html#attributes-and-content):

[Bootstrap Demo](https://komarovalexander.github.io/ka-table/#/bootstrap)
or
[Material UI Demo](https://komarovalexander.github.io/ka-table/#/material)

In most cases there is no need to include ka-table/style.css - ka-table can be used with 3rd parties styles only.
