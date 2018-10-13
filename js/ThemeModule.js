var ThemeModule = (function() {
  "use strict";
  var global = {},
    DOM = {};
  // bind events
  function bindEvents() {
    $("input#one").change(function() {
      updateTheme($(this).prop("checked"));
    });
  }

  //Event trigered by checkbox, that updates the class on the
  function updateTheme(checked) {
    var theme = 0;
    if (checked) {
      theme = 1;
      DOM.$consultantTable.removeClass("theme-one");
      DOM.$consultantTable.addClass("theme-two");

       DOM.$clientTable.removeClass("theme-one");
       DOM.$clientTable.addClass("theme-two");
    } else {
      theme = 0;
      DOM.$consultantTable.removeClass("theme-two");
      DOM.$consultantTable.addClass("theme-one");

       DOM.$clientTable.removeClass("theme-two");
       DOM.$clientTable.addClass("theme-one");
    }

    updateThemeInDB(theme).done(function(data) {
      console.log(data);
      console.log("Updated in db");
    });
  }

  function updateThemeInDB(theme) {
    return $.post("php/user-profile/updateTheme.php", { theme: theme });
  }

  /* =================== public methods ================== */
  // main init method
  function init(theme, $consultantTable, $clientTable) {
    DOM.$consultantTable = $consultantTable;
    DOM.$clientTable = $clientTable;
    bindEvents();
    //If theme is set to zero, add the default theme-one class to both tables
    if (theme === 0) {
      $("input#one").prop("checked", false);
      DOM.$consultantTable.addClass("theme-one");
       DOM.$clientTable.addClass("theme-one");
    }

    //If theme is set to 1, add the theme-two class to both tables
    if (theme === 1) {
      $("input#one").prop("checked", true);
      DOM.$consultantTable.addClass("theme-two");
       DOM.$clientTable.addClass("theme-two");
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
