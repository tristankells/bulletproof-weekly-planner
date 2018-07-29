var MonthConsultantsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase an array of consultants
  var consultants = [],
    DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$consultanttablebody = $("#consultanttablebody");
  }

  //Render <tr> elements for every consultant in the module array
  function renderTableRows() {
    for (x in consultants) {
      DOM.$consultanttablebody.append(consultants[x].getRow());
    }
  }

  /*=========== public methods ==========*/

  /*
  Initlisse the module, take a list of consultants as an arguement and renders
  them to the client table.
  */
  function init(data) {
    for (x in data) {
      consultants.push(new MonthConsultant(data[x]));
    }
    cacheDom();
    renderTableRows();
  }

  //Empty the consultant array
  function empty() {
    consultants = [];
  }
  /*=========== export public methods ==========*/

  return {
    init: init,
    empty: empty
  };
})();
