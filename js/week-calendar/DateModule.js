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

  //Return date object containing this weeks monday and sunday
  function thisWeeksMondaySunday(week) {
    var dates = {};
    dates.monday = new Date();
    dates.sunday = new Date();

    //Store current monday and sunday
    dates.monday = getMonday();
    dates.monday.setDate(dates.monday.getDate() + week * 7);
    dates.monday.setHours(0, 0, 0);
    dates.sunday.setDate(dates.monday.getDate() + 7);
    dates.sunday.setHours(11, 59, 59);

    return dates;
  }

  //Return a string with the date of this week's friday in the format yyyy-mm-dd
  function getSundayString(week) {
    var sundayString = "";
    var monday = getMonday(week);
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);
    
    var sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);
    sunday.setHours(22, 59, 59);
    sunday = new Date(sunday.getTime() + 1000 * 60 * 60 * 14);

    sundayString = sunday
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    return sundayString;
  }

  function getMondayString(week) {
    var mondayString = "";
    var monday = getMonday(week);
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);

    //Correct for the change to iso
    monday = new Date(monday.getTime() + 1000 * 60 * 60 * 13);

    mondayString = monday
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    return mondayString;
  }

  function thisWeeksMondaySundayStringified(week) {
    var monday, sunday;

    monday = DateModule.getMonday();
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);
    sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);
    sunday.setHours(23, 59, 59);

    monday = monday.toLocaleDateString();
    sunday = sunday.toLocaleDateString();

    return { monday: monday, sunday: sunday };
  }

  function getMonday(week) {
    var monday = new Date();
    switch (monday.getDay()) {
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

    return monday;
  }

  // render DOM
  function render() {
    var currentDate = {},
      monday = {},
      currentYear = {},
      months = [];

    monday = new Date();
    currentDate = new Date();

    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      currentDate.setDate(currentDate.getDate() + 7);
      monday.setDate(monday.getDate() + 7);
    }

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

    monday = getMonday();

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
    init: init,
    getMonday: getMonday,
    getSundayString: getSundayString,
    getMondayString: getMondayString,
    thisWeeksMondaySunday: thisWeeksMondaySunday,
    thisWeeksMondaySundayStringified: thisWeeksMondaySundayStringified
  };
})();
