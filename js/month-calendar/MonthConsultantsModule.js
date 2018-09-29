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

  function bindEvents() {
    DOM.$consultanttablebody.on("click", ".allocation", function() {
      handleAllocationLeftClick($(this));
    });

    DOM.$document.on("mousedown", function(e) {
      if (!$(e.target).parents(".custom-menu").length > 0) {
        $(".clicked").removeClass("clicked");
        // Hide it
        $(".custom-menu").hide(100);
      }
    });

    DOM.$clientMenu.on("click", "li", function() {
      handleClientMenuClick($(this));
    });
  }

  function handleAllocationLeftClick($allocationDiv) {
    $(".clicked").removeClass("clicked");
    $allocationDiv.addClass("clicked");

    DOM.$clientMenu
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px"
      });
  }

  function handleClientMenuClick($clientMenuItem) {
    var $allocationCol = $(),
      $consultantRow = $(),
      $clientNameSpans = $(),
      dynamicData = {},
      clientName = "";
    clientNotAllreadyAdded = true;

    $allocationCol = $(".clicked");
    $consultantRow = $allocationCol.closest("tr");

    dynamicData["col"] = $allocationCol.attr("data-week");
    dynamicData["consultantID"] = $consultantRow.attr("data-id");
    dynamicData["clientID"] = $clientMenuItem.attr("data-id");
    dynamicData["isAdding"] = 1;
    dynamicData["abbreviation"]= $clientMenuItem.attr("data-abbreviation");
    dynamicData["colour"]= $clientMenuItem.attr("data-colour");

    if ($clientMenuItem.attr("data-flag") == 1) {
      dynamicData["isAdding"] = 0;
      $allocationCol.empty();
    } else {
      $clientNameSpans = $allocationCol.find("span");
      clientName = $clientMenuItem.attr("data-name");

      $clientNameSpans.each(function() {
        if ($(this).attr("data-name") == clientName) {
          clientNotAllreadyAdded = false;
        }
      });

      if (clientNotAllreadyAdded) {
        

        $allocationCol.append(renderClientTab(dynamicData["abbreviation"], dynamicData["colour"]));
      } else {
        console.log("client already added");

        $allocationCol.find("span[data-name='" + clientName + "']").remove();

        dynamicData["isAdding"] = 2;
      }
    }

    updateMonthlyAllocationInDB(dynamicData).done(function(data) {
      if (data == "success") {
        console.log("success");
      } else {
        console.log(data);
      }
    });

    $(".clicked").removeClass("clicked");
    // Hide it
    $(".custom-menu").hide(100);
  }

  function renderTableRow(consultant) {
    var row = {}; //Initialise variable

    row = $("<tr></tr>") //Create new table row
      .addClass("monthViewRow")
      .attr("data-id", consultant["id"]); //Add consultant id to row
    row.append($("<td></td>").addClass("custom-dark-bg month-consultant-view").html(consultant["full_name"])); //Add client name colunm

    //Add all allocated  clients from the weekly view to the current week colunm
    var weekClientNames = $("<td></td>");

    for (x in consultant["week_allocations"]) {
      if (
        !(consultant["week_allocations"][x]["allocated_to"] == "Open") &&
        !(consultant["week_allocations"][x]["allocated_to"] == "Leave")
      ) {
        weekClientNames.append( 
          renderClientTab((consultant["week_allocations"][x]["allocated_to"]), (consultant["week_allocations"][x]["colour"]))
        )
         
      }
    }
    
    row.append(weekClientNames);

    //Loop through weeks in month, and check existing allocations
    for (var i = 2; i <= 4; i++) {
      var allocations = [],
        $allocationCol = $();

      $allocationCol = $("<td></td>")
        .addClass("allocation")
        .attr("data-week", i);

      allocations = getAllocationsForWeek(consultant["monthly_allocations"], i);
      if (allocations) {
        for (x in allocations) {
          $allocationCol.append(
            renderClientTab((allocations[x]["abbreviation"]), (allocations[x]["colour"]))
          )
        }
      }

      row.append($allocationCol);
    }

    DOM.$consultanttablebody.append(row);
  }

  function getAllocationsForWeek(allocations, col) {
    var returnAllocations = [];

    for (y in allocations) {
      allocation = allocations[y];
      if (allocation["allocation_slot"] == col) {
        //if column is matching
        returnAllocations.push(allocation);
      }
    }
    return returnAllocations;
  }

  // Render client tab color and format with abbreviated client name
  function renderClientTab (abbreviation, colour){
    return $("<span></span>")
        .addClass("month-tab")
        .attr("data-color", colour) //Add data color to span
        .html(abbreviation)
  }

  //Render <tr> elements for every consultant in the module array
  function renderTableRows(consultants) {
    for (x in consultants) {
      renderTableRow(consultants[x]);
    }
  }

  function renderPlaceHolderText() {
    var $placeholderRow = $();

    $placeholderRow = $("<tr></tr>").html(
      "To add consultants, pleasse go navigate to the manage page"
    );
    DOM.$consultanttablebody.html($placeholderRow);
  }

  /*=========== private AJAX methods ==========*/
  function updateMonthlyAllocationInDB(dynamicData) {
    return $.post("php/consultants/updateAllocation_month.php", {
      dynamicData: dynamicData
    });
  }

  /*=========== public methods ==========*/

  /*
  Initlisse the module, take a list of consultants as an arguement and renders
  them to the client table.
  */
  function init(consultants) {
    cacheDom();
    if (consultants.length > 0) {
      bindEvents();
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
