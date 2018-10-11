var MonthConsultantsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase an array of consultants
  var DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$consultanttablebody = $("#consultanttablebody");
    DOM.$clientMenu = $("#clientmenu");
    DOM.$document = $(document);
  }

  function getConsultantTableRow(consultant) {
    var $row = getConsultantRow(consultant.id); //Add consultant id to row
    $row.append(getConsultantNameCol(consultant.name)); //Add client name colunm

    var week = 0;
    for (week; week < 4; week++) {
      $row.append(getConsultantAllocationsCol(consultant.allocations, week));
    }

    return $row;
  }

  function getConsultantRow(id) {
    return ($row = $("<tr></tr>") //Create new table row
      .addClass("monthViewRow")
      .attr("data-id", id)); //Add consultant id to row
  }

  //Return consultant name <td/>
  function getConsultantNameCol(name) {
    return $("<td></td>")
      .addClass("custom-dark-bg month-consultant-view")
      .html(name);
  }

  //Return consultant allocation <td/>
  function getConsultantAllocationsCol(allocations, week) {
    //All consultants alocations for this week
    var weekAllocations = getAllocationsForWeek(allocations, week);
    //All consultants allocations for this week which are not null
    var weekAllocationsNoNull = getAllClientAllocations(weekAllocations);
 //All consultants allocations for this week which are not null and have a uniqueID
    var listOfUniqueClientAllocations = getArrayOfUniqueClientAllocations(
      weekAllocationsNoNull
    );

    var $allocationCol = $("<td></td>")
      .addClass("allocation")
      .attr("data-week", week);

    listOfUniqueClientAllocations.forEach(allocation => {
      $allocationCol.append(
        renderClientTab(allocation.abbreviation, allocation.colour)
      );
    });

    return $allocationCol;
  }

  function getAllocationsForWeek(allocations, week) {
    return allocations.filter(allocation => {
      //Store allocation time created
      const timeCreated = new Date(allocation.timeCreated);
      //Return allocation if made between a given Monday and Sunday
      return (
        timeCreated >= DateModule.updatedGetMonday(week) &&
        timeCreated <= DateModule.updatedGetSunday(week)
      );
    });
  }

  //Return only allocations attached to a client (no leave or null)
  function getAllClientAllocations(allocations) {
    return allocations.filter(allocation => allocation.clientID !== null);
  }

  //Return all allocations which are unique (one allocations for each unique client ID)
  function getArrayOfUniqueClientAllocations(allocations) {
    return allocations.filter((e, i) => allocations.findIndex(a => a["clientID"] === e["clientID"]) === i);
  }

  // Render client tab color and format with abbreviated client name
  function renderClientTab(abbreviation, colour) {
    return $("<span></span>")
      .addClass("month-tab")
      .attr("data-color", colour) //Add data color to span
      .html(abbreviation);
  }

  //Render <tr> elements for every consultant in the module array
  function renderTableRows(consultants) {
    for (x in consultants) {
      DOM.$consultanttablebody.append(getConsultantTableRow(consultants[x]));
    }
  }

  function renderPlaceHolderText() {
    var $placeholderRow = $();

    $placeholderRow = $("<tr></tr>").html(
      "To add consultants, pleasse go navigate to the manage page"
    );
    DOM.$consultanttablebody.html($placeholderRow);
  }
  

  /*=========== public methods ==========*/

  /*
  Initlisse the module, take a list of consultants as an arguement and renders
  them to the client table.
  */
  function init(consultants) {
    cacheDom();
    if (consultants.length > 0) {
      // bindEvents();
      renderTableRows(consultants);
    } else {
      renderPlaceHolderText();
    }
  }

  /*=========== export public methods ==========*/

  return {
    init: init
  };
})();
