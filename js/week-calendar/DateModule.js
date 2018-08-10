var DateModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$displayMonth = $("#displaymonth");
    DOM.$displayYear = $("#displayyear");
    DOM.$consultantsTableHeadRow = $("#consultantstableheadrow");
  }

  // render DOM
  function render() {
    var currentDate = {},
      monday = {},
      currentYear = {},
      months = [];

    currentDate = new Date();
    monday = new Date();
    currentYear = currentDate.getFullYear();

    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    switch (currentDate.getDay()) {
      case 0:
        monday.setDate(monday.getDate() - 7);
        break;
      case 1:
        monday.setDate(monday.getDate());
        break;
      case 2:
        monday.setDate(monday.getDate() - 1);
        break;
      case 3:
        monday.setDate(monday.getDate() - 2);
        break;
      case 4:
        monday.setDate(monday.getDate() - 3);
        break;
      case 5:
        monday.setDate(monday.getDate() - 4);
        break;
      case 6:
        monday.setDate(monday.getDate() - 5);
        break;
    }

    DOM.$displayMonth.append(months[currentDate.getMonth()].toUpperCase());
    DOM.$displayYear.append(currentYear);

    DOM.$consultantsTableHeadRow.find(".date").each(function() {
      var day = 0;
      day = monday.getDate() + $(this).index() - 1;

      if (day > 31) {
        day = day - 31;
      }

      var dayOfWeek = $(this).html();
      $(this).html("");

      var $span = $("<span><span>").html(dayOfWeek + "  " + day);

      if (currentDate.getDate() == day) {
        //PLACEHOLDER CURRENT DAY HIGHLIGHT
        $span.addClass("highlight-day");
      }

      $(this).append($span);
    });
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    render();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
