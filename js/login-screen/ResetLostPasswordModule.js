var Module1 = (function() {
    "use strict";
    // placeholder for cached DOM elements
    var DOM = {};
  
    /* =================== private methods ================= */
    // cache DOM elements
    function cacheDom() {
      DOM.$someElement = $("#some-element");
    }
    // bind events
    function bindEvents() {
      DOM.$someElement.click(handleClick);
    }
    // handle click events
    function handleClick(e) {
      render(); // etc
    }
    // render DOM
    function render() {
      DOM.$someElement.html("<p>Yeah!</p>");
    }
  
    /* =================== public methods ================== */
    // main init method
    function init() {
      cacheDom();
      bindEvents();
    }
  
    /* =============== export public methods =============== */
    return {
      init: init
    };
  })();
  