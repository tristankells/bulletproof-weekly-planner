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

   //Return a date object for Monday of the current week (offset by the week parameter to look 
  //at Sundays of weeks in the past or future) with the time set to 00:00:00
  function updatedGetMonday(week) {
    var monday = new Date();
    switch (monday.getDay()) {
      case 0:
        monday.setDate(monday.getDate() - 6);
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
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);
    return monday;
  }

  //Return a date object for Sunday of the current week (offset by the week parameter to look 
  //at Sundays of weeks in the past or future) with the time set to 23:59:59
  function updatedGetSunday(week) {
    var sunday = updatedGetMonday(week);
    sunday.setDate(sunday.getDate() + 6);
    sunday.setHours(23, 59, 59);
    return sunday;
  }

  //Return a string with the date of this week's friday in the format yyyy-mm-dd
  function getSundayString(week) {
    var sundayString = "";
    var currentDate = new Date();
    var monday = getMonday(week);
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);

    var sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);
    sunday.setHours(22, 59, 59);
    sunday = new Date(sunday.getTime() + 1000 * 60 * 60 * 14);

    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      sunday.setDate(sunday.getDate() + 7);
    }

    sundayString = sunday
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    return sundayString;
  }

  function getMondayString(week) {
    var mondayString = "";
    var monday = getMonday(week);
    var currentDate = new Date();
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);

    //Correct for the change to iso
    monday = new Date(monday.getTime() + 1000 * 60 * 60 * 13);

    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      monday.setDate(monday.getDate() + 7);
    }

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

  function getMonday() {
    var monday = new Date();
    switch (monday.getDay()) {
      case 0:
        monday.setDate(monday.getDate() - 6);
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
  function render(week) {
    var monday = new Date();
    var currentDate = new Date();
    updateDisplayMonth(week);
    updateDisplayYear(week);

    monday = getMonday();
    monday.setDate(monday.getDate() + week * 7);

    //If it is saturday or sunday, show the follinwg week on the calendar
    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      monday.setDate(monday.getDate() + 7);
    }
    DOM.$consultantsTableHeadRow.find(".date").each(function() {
      var dayOfWeek = new Date();
      dayOfWeek.setDate(monday.getDate() + $(this).index() - 1);

      var $span = $("<span></span>").html(
        $(this).html() + "  " + dayOfWeek.getDate()
      );

      if (
        currentDate.getDate() === dayOfWeek.getDate() &&
        currentDate.getMonth() === dayOfWeek.getMonth() &&
        currentDate.getYear() === dayOfWeek.getYear()
      ) {
        //PLACEHOLDER CURRENT DAY HIGHLIGHT
        $span.addClass("highlight-day");
      }

      $(this).html($span);
    });
  }

  //Updates the month and days to represent the new week being viewed.
  function updateDisplayDates(week) {
    updateDisplayMonth(week);
    updateDisplayDays(week);
    updateDisplayYear(week);
  }

  function updateDisplayMonth(week) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + week * 7);
    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      currentDate.setDate(currentDate.getDate() + 7);
    }

    DOM.$displayMonth.html(months[currentDate.getMonth()].toUpperCase());
  }

  function updateDisplayDays(week) {
    var monday = getMonday();
    var currentDate = new Date();
    monday.setDate(monday.getDate() + week * 7);

    //If it is saturday or sunday, show the follinwg week on the calendar
    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      monday.setDate(monday.getDate() + 7);
    }

    DOM.$consultantsTableHeadRow.find(".date").each(function() {
      var day = monday;
      day.setDate(monday.getDate() + $(this).index() - 1);

      var $span = $("<span></span>").html(
        $(this).html() + "  " + day.getDate()
      );
      var dayOfWeek = $(this)
        .children()
        .html();

      var $span = $("<span></span>").html(
        dayOfWeek.slice(0, 3) + "  " + day.getDate()
      );

      if (
        currentDate.getDate() === day.getDate() &&
        currentDate.getMonth() === day.getMonth() &&
        currentDate.getYear() === day.getYear()
      ) {
        //PLACEHOLDER CURRENT DAY HIGHLIGHT
        $span.addClass("highlight-day");
      }

      $(this).html($span);
    });
  }

  function updateDisplayYear(week) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + week * 7);
    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      currentDate.setDate(currentDate.getDate() + 7);
    }
    DOM.$displayYear.html(currentDate.getFullYear());
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    render(0);
  }

  /* =============== export public methods =============== */
  return {
    init: init,
    render: render,
    getMonday: getMonday,
    getSundayString: getSundayString,
    getMondayString: getMondayString,
    thisWeeksMondaySunday: thisWeeksMondaySunday,
    thisWeeksMondaySundayStringified: thisWeeksMondaySundayStringified,
    updateDisplayDates: updateDisplayDates,
    updatedGetMonday: updatedGetMonday,
    updatedGetSunday: updatedGetSunday
  };
})();
