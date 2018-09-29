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
      sunday = new Date();

    //Store current monday and sunday
    monday = DateModule.getMonday();
    monday.setDate(monday.getDate() + week * 7);
    monday.setHours(0, 0, 0);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(11, 59, 59);

    consultant.allocations.forEach(allocation => {
      //Store allocation date
      const allocationDate = new Date(allocation.timeCreated);

      // console.log(
      //   " \\\\" + allocationDate + "\\\\" + monday + "\\\\" + sunday + "\\\\"
      // );

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
