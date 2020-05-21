---
title: "ka-table - React table component"
hide_title: true
keywords: ka-table table react grid component flux redux
toc: false
search: include
style: main-page
hide_sidebar: true
permalink: index.html
layout: index_layout
---


<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  AOS.init({
    duration: 700,
    once: true,
    anchorPlacement: 'top-center',
    mirror: true,
  });
</script>

<div class="main-page">
  <div class="main-banner-container">
    <div class="main-banner-image main-banner-background">
    </div>
    <div class="main-banner-image main-banner-fon">
    </div>
    <div class="main-banner-image main-banner-blur">
    </div>
    <div class="main-banner-image main-banner-grid show">
    </div>
    <div class="main-banner-image main-banner-filter show">
    </div>
    <div class="main-banner-image main-banner-alert show">
    </div>
    <div class="main-banner-image main-banner-buble show">
    </div>
  </div>
  <div class="container">
    <div class="row main-banner-row">
      <div class="col-md-5">
        <div class="main-banner-text">
          <h3 class="header-tag">component</h3>
          <h1 class="post-title-main">React Table</h1>
          <p>Controllable MIT React Table component with Sorting, Filtering, Grouping, Virtualization, Editing and many more</p>
          <a class="btn btn-primary" href="https://komarovalexander.github.io/ka-table/#/overview">View Demos</a>
          <a class="btn btn-outline-primary" href="/docs_props.html">Read Documentation</a>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row reducer-row">
      <div class="col-md-7">
        <img src="images/shema.svg" alt='ka-table schema'  data-aos="zoom-in"
        data-aos-anchor-placement="center-bottom" />
      </div>
      <div class="col-md-5">
        <div class="main-banner-text">
          <h3 class="header-tag">IDEA</h3>
          <h2 class="post-title-main">props-UI-action-reducer</h2>
          <p>
            ka-table UI is rendered according to props passed to the component. All changes are performed by dispatching an action, and kaReducer generates new props. This approach allows having full control over every change. Because of it ka-table easily integrates with Redux but also can be used without it
          </p>
        </div>
      </div>
    </div>
    <div class="row customizable-row">
      <div class="col-md-12">
        <div class="main-banner-text">
          <h3 class="header-tag">CUSTOMIZABLE</h3>
          <h2 class="post-title-main">High view customization</h2>
          <p>Every part can be customized and required additional events can be added</p>
        </div>
        <img data-aos="fade-up"
        data-aos-anchor-placement="center-center" src="images/customisation.svg" alt='ka-table customisation'/>
      </div>
    </div>
  </div>
  <div class="row open-source-absolute">
    <div class="col-md-6">
    </div>
    <div class="col-md-6 computer-block">
      <img  data-aos="fade-left"
        data-aos-anchor-placement="top-top" src="images/computer.svg" alt='ka-table open source'/>
    </div>
  </div>
  <div class="container">
    <div class="row open-source">
      <div class="col-md-5">
        <div class="main-banner-text">
          <h3 class="header-tag">FREE COMPONENT</h3>
          <h2 class="post-title-main">Open source MIT component</h2>
          <p>ka-table is under MIT license, and it can be used everywhere for free. Contribution and feedback are always welcome in the <a href="https://github.com/komarovalexander/ka-table" target="_blank">ka-table repo</a></p>
          <a class="btn btn-primary" href="https://github.com/komarovalexander/ka-table">Open on GitHub</a>
        </div>
      </div>
      <div class="col-md-7 computer-block">
      </div>
    </div>
    <div class="row features">
      <div class="col-md-12">
        <h3 class="header-tag">FEATURES</h3>
        <h2 class="post-title-main">Main Features</h2>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Editing.svg" alt="Editing"/></div>
        <h4>Editing</h4>
        <p>Editors for different data types out-of-the-box, and good ability for customization</p>
        <a href="https://komarovalexander.github.io/ka-table/#/editing">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Events.svg" alt="Events"/></div>
        <h4>Events</h4>
        <p>All possible events can be added to childElements</p>
        <a href="https://komarovalexander.github.io/ka-table/#/events">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Filtering.svg" alt="Filtering"/></div>
        <h4>Filtering</h4>
        <p>Use predefined filter row with customizable editors or use an extended filter</p>
        <a href="https://komarovalexander.github.io/ka-table/#/filter-row">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Grouping.svg" alt="Grouping"/></div>
        <h4>Grouping</h4>
        <p>Grouping is supported with cell and row customization</p>
        <a href="https://komarovalexander.github.io/ka-table/#/grouping">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Search.svg" alt="Search"/></div>
        <h4>Search</h4>
        <p>Search by the whole Table is easy</p>
        <a href="https://komarovalexander.github.io/ka-table/#/search">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Selection.svg" alt="Selection"/></div>
        <h4>Selection</h4>
        <p>Multiple & single selection</p>
        <a href="https://komarovalexander.github.io/ka-table/#/selection">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/StateStoring.svg" alt="StateStoring"/></div>
        <h4>State Storing</h4>
        <p>Save Table's state and restore it after page reload</p>
        <a href="https://komarovalexander.github.io/ka-table/#/state-storing">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/Validation.svg" alt="Validation"/></div>
        <h4>Validation</h4>
        <p>Validate editor value before applying it</p>
        <a href="https://komarovalexander.github.io/ka-table/#/validation">View Demo</a>
      </div>
      <div class="col-md-4">
        <div class="img"><img src="images/icons/VirtualScrolling.svg" alt="VirtualScrolling"/></div>
        <h4>Virtual Scrolling</h4>
        <p>Virtualization work well with the big amount of data and grouping</p>
        <a href="https://komarovalexander.github.io/ka-table/#/many-rows">View Demo</a>
      </div>
    </div>
  </div>
</div>