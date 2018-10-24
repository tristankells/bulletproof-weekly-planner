var InfoModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};
  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$infoBtn = $("#infoBtn");
    DOM.$infoPopup = $("#infoPopup");
    DOM.body = $("body");
  }
  // bind events
  function bindEvents() {
    DOM.$infoBtn.click(handleInfoBtnClick);
    DOM.body.click(handleClickAway);
  }
  // handle click events
  function handleInfoBtnClick(e) {
    e.stopPropagation();
    renderInfoBox();
  }
  // render DOM
  function renderInfoBox() {
    DOM.$infoPopup.toggle();
  }

  function handleClickAway() {
    DOM.$infoPopup.hide();
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
