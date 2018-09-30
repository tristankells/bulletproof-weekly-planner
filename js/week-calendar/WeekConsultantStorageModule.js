var WeekConsultantStorageModule = (function() {
  "use strict";
  var global = {};

  /* =================== private methods ================= */
  //Return the date for this weeks monday

  /* =================== public methods ================== */

  //Takes a positive or negative number, indicating the number of weeks in the past or in the future respectively
  //Returns all of the consultants allocations for that week
  function getConsultantsWeeksAllocations(week) {
    var returnConsultants = [];
    //Make copy of global consultant variables.
    let consultants = JSON.parse(JSON.stringify(global.consultants));
    consultants.forEach(consultant => {
      consultant.allocations = consultantWeekAllocations(week, consultant);
      returnConsultants.push(consultant);
    });

    return returnConsultants;
  }

  //Takes a positive or negative number, indicating the number of weeks in the past or in the future respectively
  //Returns all of a consultants allocations for that week
  function consultantWeekAllocations(week, consultant) {
    var thisWeekAllocations = [],
      monday = new Date(),
      sunday = new Date(),
      currentDate = new Date();

    //Store current monday and sunday
    monday = DateModule.getMonday();
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);
    sunday = new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000);
    sunday.setHours(23, 59, 59);

    //If it is saturday or sunday, show allocations for the following week
    if (currentDate.getDay() == 6 || currentDate.getDay() == 0) {
      monday.setDate(monday.getDate() + 7);
      sunday.setDate(sunday.getDate() + 7);
    }

    consultant.allocations.forEach(allocation => {
      //Store allocation date
      const allocationDate = new Date(allocation.timeCreated);
      //If allocation date is between monday and sunday of the diplaying week,
      //push allocation to the return array
      if (allocationDate >= monday && allocationDate <= sunday) {
        thisWeekAllocations.push(allocation);
      }
    });

    return thisWeekAllocations;
  }

  //Return all consultants
  function getConsultants() {
    return global.consultants;
  }

  // main init method
  function init(consultants) {
    global.consultants = consultants;
  }

  /* =============== export public methods =============== */
  return {
    init: init,
    getConsultantsWeeksAllocations: getConsultantsWeeksAllocations,
    getConsultants: getConsultants
  };
})();
