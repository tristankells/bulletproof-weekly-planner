var WeekConsultantModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {},
    global = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$consultantsTableBody = $("#consultantstablebody");
    DOM.$clientMenu = $("#clientmenu");
    DOM.$officeMenu = $("#officemenu");
    DOM.$document = $(document);
    DOM.$resetAllocationsButton = $("#resetallocationbutton");
    DOM.$previousWeekButton = $("#previousWeekButton");
    DOM.$nextWeekButton = $("#nextWeekButton");
    DOM.$currentWeekButton = $("#currentWeekButton");
  }
  // bind events
  function bindEvents() {
    //Bind sortalbe to consultant table
    DOM.$consultantsTableBody.sortable({
      update: function() {
        handlePositionChange($(this));
      }
    });

    //Bind menu to allocation col right click
    DOM.$consultantsTableBody.on("contextmenu", ".allocation-col", function() {
      handleAllocationRightClick($(this));
    });

    //Bind menu to allocation col left click
    DOM.$consultantsTableBody.on("click", ".allocation-col", function() {
      handeleAllocationLeftClick($(this));
    });

    DOM.$consultantsTableBody.on("click", ".clear-consultant-btn", function() {
      handleClearConsultantAllocationsClick($(this).closest("tr"));
    });

    DOM.$clientMenu.on("click", "li", function() {
      handleClientMenuClick($(this));
    });

    DOM.$officeMenu.on("click", "li", function() {
      handleOfficeMenuClick($(this));
    });

    //Bind mousdoen event to page
    DOM.$document.on("mousedown", function(e) {
      // If the clicked element is not the menu
      if (!$(e.target).parents(".custom-menu").length > 0) {
        $(".clicked-allocation").removeClass("clicked-allocation");
        // Hide it
        $(".custom-menu").hide(100);
      }
    });

    DOM.$resetAllocationsButton.on("click", function() {
      handleClearAllAllocationsClick();
    });

    DOM.$consultantsTableBody.on("mouseenter", "tr", function() {
      handleMouseEnteringConsultantRow($(this));
    });

    DOM.$consultantsTableBody.on("mouseleave", "tr", function() {
      handleMouseLeavingConsultantRow($(this));
    });

    DOM.$consultantsTableBody.on("mouseenter", ".allocation-col", function() {
      handleMouseEnteringAllocation($(this));
    });

    DOM.$consultantsTableBody.on("mouseleave", ".allocation-col", function() {
      handleMouseLeavingAllocation($(this));
    });

    DOM.$previousWeekButton.on("click", function() {
      handleWeekNavigationButtonClick(-1);
    });

    DOM.$nextWeekButton.on("click", function() {
      handleWeekNavigationButtonClick(1);
    });

    DOM.$currentWeekButton.on("click", function() {
      global.week = 0;
      handleWeekNavigationButtonClick(0);
    });
  }

  function handleWeekNavigationButtonClick(number) {
    global.week += number;

    getConsultantAndClientsFromDB().done(data => {
      var databaseResults = JSON.parse(data);
      //Store consultant and client arrays recieved from server
      var consultants = databaseResults.consultants; //Store array of consultants

      WeekConsultantStorageModule.init(consultants);

      var thisWeeksConsultants = WeekConsultantStorageModule.getConsultantsWeeksAllocations(
        global.week
      );

      DOM.$consultantsTableBody.find("tr").each((index, element) => {
        $(element)
          .find(".allocation-col")
          .remove();
        $(element)
          .find(".consultant-header")
          .after(
            getConsultantAllocationCols(thisWeeksConsultants[index].allocations)
          );
      });

      DateModule.updateDisplayDates(global.week);
      updateClientsWhoCols();
    });
  }

  //Takes a allocation TD. Highlights the matching day and time.
  function handleMouseEnteringAllocation($allocationCol) {
    var allocationSlot = 0,
      $dateSubheadings = $(),
      $dates = $();

    allocationSlot = $allocationCol.attr("data-slot");
    $dates = $(".date");
    $dateSubheadings = $(".date-subheading").find("th:not(:empty)");

    $dateSubheadings.eq(allocationSlot).addClass("red-text");
    $dates.eq(Math.floor(allocationSlot / 2)).addClass("red-text");
  }

  function handleMouseLeavingAllocation() {
    $("th").removeClass("red-text");
  }

  //Highlight the name of the consultant when mouse enter consultant row
  function handleMouseEnteringConsultantRow($consultantRow) {
    $consultantRow.find(".consultant-header").addClass("transparent-bg");
    $consultantRow.find(".consultant-name-input").addClass("transparent-bg");
  }

  //Remove the highlight added to consultant row name when mouse leaves row
  function handleMouseLeavingConsultantRow($consultantRow) {
    $consultantRow.find(".consultant-header").removeClass("transparent-bg");
    $consultantRow.find(".consultant-name-input").removeClass("transparent-bg");
  }

  function handlePositionChange($tableBody) {
    $tableBody.find("tr").each(function(index) {
      if ($(this).attr("data-position") != index + 1) {
        $(this)
          .attr("data-position", index + 1)
          .addClass("consultant-updated");
      }
    });
    updateConsultantPositions();
  }

  function handeleAllocationLeftClick($allocationCol) {
    $allocationCol.addClass("clicked-allocation");

    $("#clientmenu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px"
      });
  }

  function handleAllocationRightClick($allocationCol) {
    event.preventDefault();
    $allocationCol.addClass("clicked-allocation");

    // Show contextmenu
    $("#officemenu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px"
      });
  }

  //Handles the click on the custom client menu, when trying to allocate
  function handleClientMenuClick($menuItem) {
    var $allocationTd = {};

    $allocationTd = $(".clicked-allocation");

    if ($allocationTd) {
    }

    if ($menuItem.html() == "EMPTY") {
      $allocationTd
        .attr("data-abbreviation", "")
        .attr("data-id", 0)
        .attr("data-colour", 0)
        .attr("data-office", 0);
    } else {
      $allocationTd
        .attr("data-abbreviation", $menuItem.html())
        .attr("data-id", $menuItem.attr("data-id"))
        .attr("data-colour", $menuItem.attr("data-colour"));

      if ($allocationTd.attr("data-office") == 3) {
        $allocationTd.attr("data-office", 0);
      }
    }

    updateAllocation($allocationTd);
  }

  function handleOfficeMenuClick($menuItem) {
    var $allocationCol = {},
      selectedOfficeStatus = 0;

    $allocationCol = $(".clicked-allocation"); //Get click allocation col
    selectedOfficeStatus = $menuItem.attr("data-action"); //Get the chosesn office status

    $allocationCol.attr("data-office", selectedOfficeStatus); //Set the new allocation office status
    console.log(selectedOfficeStatus);
    if (selectedOfficeStatus == 3) {
      $allocationCol
        .attr("data-abbreviation", "")
        .attr("data-id", 0)
        .attr("data-colour", 0);
    }
    updateAllocation($allocationCol);
  }

  function handleClearAllAllocationsClick() {
    if (confirm("Press OK to delete ALL allocation information")) {
      //Empty all the consultants allocations
      $("#consultantstablebody > tr").each(function() {
        $(this)
          .find(".allocation-col")
          .each(function(index) {
            $(this).replaceWith(
              WeekAllocationModule.getAllocationTd(index, false)
            );
          });
      });

      //Empty all the client who columns
      $("#clienttablebody > tr").each(function() {
        $(this)
          .find(".who-column")
          .html("");
      });

      updateClientsWhoCols();

      //Post request
      clearAllAllocationsInDB({
        monday: DateModule.getMondayString(global.week),
        sunday: DateModule.getSundayString(global.week)
      }).done();
    }
  }

  function handleClearConsultantAllocationsClick($consultantRow) {
    if (confirm("Press OK to delete consultant allocation information")) {
      var id = 0;

      id = $consultantRow.attr("data-id");

      //Empty all the consultants allocations
      $consultantRow.find(".allocation-col").each(function(index) {
        $(this).replaceWith(WeekAllocationModule.getAllocationTd(index, false));
      });

      updateClientsWhoCols();

      //Post request
      clearConsutlantAllocationsIDB({
        id: id,
        monday: DateModule.getMondayString(global.week),
        sunday: DateModule.getSundayString(global.week)
      }).done(data => console.log(data));
    }
  }

  function updateAllocation($allocationCol) {
    var allocation = {},
      $consultantRow = {},
      timeCreated = new Date();

    //Retrieve all allocation information from the allocation column
    $consultantRow = $allocationCol.parents("tr");

    allocation["consultantID"] = $consultantRow.attr("data-id");
    allocation["abbreviation"] = $allocationCol.attr("data-abbreviation");
    allocation["colour"] = $allocationCol.attr("data-colour");
    allocation["clientID"] = $allocationCol.attr("data-id");
    allocation["officeStatus"] = $allocationCol.attr("data-office");
    allocation["allocationSlot"] = $allocationCol.attr("data-slot");

    //Get timestamp and format to MYSQL datetime
    timeCreated.setDate(timeCreated.getDate() + global.week * 7);
    timeCreated = new Date(timeCreated.getTime());

    console.log(timeCreated);

    //If it is saturday or sunday, allocation date is moved to the following week
    if (timeCreated.getDay() == 6 || timeCreated.getDay() == 0) {
      timeCreated.setDate(timeCreated.getDate() + 7);
    }

    allocation["timeCreated"] = timeCreated
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");

    allocation["monday"] = DateModule.getMondayString(global.week);
    allocation["sunday"] = DateModule.getSundayString(global.week);

    $allocationCol.replaceWith(
      WeekAllocationModule.getAllocationTd(
        allocation["allocationSlot"],
        allocation
      )
    );

    $(".custom-menu").hide(100);

    $(".clicked-allocation").removeClass("clicked-allocation");

    updateClientsWhoCols();

    $consultantRow
      .find(".last-updated-div")
      .html(convertDateToString(new Date()));

    updateAllocationInDB(allocation).done(function(data) {
      console.log(data);
    });
  }

  function updateConsultantPositions() {
    var positions = [];

    $(".consultant-updated").each(function() {
      positions.push([$(this).attr("data-id"), $(this).attr("data-position")]);
      $(this).removeClass("consultant-updated");
    });
    //AJAX request to update consultant positions
    updateConsultantPositionsInDB(positions).done(function() {});
  }

  function updateClientsWhoCols() {
    $("#clienttablebody > tr").each(function() {
      updateClientWhoCol($(this));
    });
  }

  function updateClientWhoCol($clientRow) {
    var clientID = 0,
      consultantNamesArray = [],
      consultantNamesString = "",
      clientWhoCol = {},
      x = 0;

    clientID = $clientRow.attr("data-id");
    consultantNamesArray = getArrayOfConsultantNamesAllocatedToClient(clientID);
    clientWhoCol = $clientRow.find(".who-column");

    for (x in consultantNamesArray) {
      consultantNamesString += consultantNamesArray[x];
      if (consultantNamesArray.length > 1) {
        if (x < consultantNamesArray.length - 1) consultantNamesString += ", ";
        {
        }
      }
    }

    clientWhoCol.html(consultantNamesString);
  }

  function getArrayOfConsultantNamesAllocatedToClient(clientID) {
    var consultantNames = [],
      $consultanRow = {},
      consultantName = {};

    $("#consultantstablebody > tr").each(function() {
      $consultanRow = $(this);
      if (checkConsultantAllocatedToClient(clientID, $consultanRow)) {
        consultantName = $consultanRow.attr("data-name");

        consultantNames.push(consultantName);
      }
    });

    return consultantNames;
  }

  function checkConsultantAllocatedToClient(clientID, $consultantRow) {
    var clientIDs = [],
      allocated = false;

    clientIDs = consulatantRowToClientIDArray($consultantRow);
    for (x in clientIDs) {
      if (clientID == clientIDs[x]) {
        allocated = true;
      }
    }
    return allocated;
  }

  function consulatantRowToClientIDArray($consultantRow) {
    var clientIDs = [];

    $consultantRow.find(".allocation-col[data-id]").each(function() {
      clientIDs.push($(this).attr("data-id"));
    });

    return clientIDs;
  }

  function renderConsultant(consultant) {
    var $rowElement = {};
    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["name"])
      .attr("data-role", consultant["role"])
      .attr("data-position", consultant["position"]);

    //Append name and role column
    $rowElement.append(
      $("<td></td>")
        .addClass("consultant-header")
        .append(
          $("<div></div>")
            .addClass("consultant-info-format")
            .append(
              $("<div></div>")
                .addClass("consultant-name-input")
                .html(consultant["name"])
            )
            .append(
              $("<div></div>")
                .addClass("rolediv")
                .html(consultant["role"])
            )
        )
        .append(
          $("<div></div>")
            .addClass("draggable-icon")
            .append(
              $("<a></a>")
                .attr("href", "#")
                .append($("<i></i>").addClass("fas fa-ellipsis-v"))
            )
        )
    );

    //Append allocations columns to row
    $rowElement.append(getConsultantAllocationCols(consultant["allocations"]));

    $rowElement.append(
      $("<div></div>")
        .addClass("clear-consultant-row")
        .append(
          $("<div></div>")
            .html(getDateOfMostRecentAllocation(consultant["allocations"]))
            .addClass("last-updated-div")
        )
        .append(
          $("<i></i>").addClass(
            "clear-consultant-btn clear-row-btn fas fa-minus-square fa-2x"
          )
        )
    );

    //Append row to consutlant table
    DOM.$consultantsTableBody.append($rowElement);
  }

  //Return 10 allocations columns (to be appened to consultant row)
  function getConsultantAllocationCols(allocations) {
    var $allocationCols = $(),
      currentWeekAllocations = allocations;

    for (let i = 0; i < 10; i++) {
      var allocation = {},
        $allocation = $();

      allocation = getColumnAllocation(currentWeekAllocations, i);
      $allocation = WeekAllocationModule.getAllocationTd(i, allocation);
      if (i == 0) {
        $allocationCols = $allocation;
      } else {
        $allocationCols = $allocationCols.add($allocation);
      }
    }
    return $allocationCols;
  }

  function getColumnAllocation(allocations, slot) {
    var allocation = {};
    for (x in allocations) {
      allocation = allocations[x];
      if (allocation["allocationSlot"] == slot) {
        return allocation;
      }
    }
    return false;
  }

  // render DOM
  function render(consultants) {
    var x = 0;

    for (x in consultants) {
      //PLACEHOLDER (NEED TO DECIDE TO WHERE TO PUT THIS INFORMATION)
      renderConsultant(consultants[x]);
    }
  }

  function convertDateToString(date) {
    var stringDate = "",
      min = 0,
      hour = 0,
      day = 0,
      month = 0,
      year = 0;

    min = date.getMinutes();
    hour = date.getHours();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();

    stringDate = hour + ":" + min + " " + day + "/" + month + "/" + year;

    return stringDate;
  }

  function getDateOfMostRecentAllocation(allocations) {
    var latestAllocationDate = null,
      allocationDate = new Date(),
      lastAllocationString = "";

    lastAllocationString = "00:00 00/00/0000";

    for (x in allocations) {
      allocationDate = new Date(allocations[x]["timeAllocated"]);
      //Set the latest allocation date to
      if (latestAllocationDate == null) {
        latestAllocationDate = allocationDate;
      } else if (latestAllocationDate < allocationDate) {
        latestAllocationDate = allocationDate;
      }
    }

    if (latestAllocationDate != null) {
      lastAllocationString = convertDateToString(latestAllocationDate);
    }
    return lastAllocationString;
  }

  function renderPlaceHolderText() {
    var $placeholderRow = $();

    $placeholderRow = $("<tr></tr>").html(
      "To add consultants, pleasse go navigate to the manage page"
    );
    DOM.$consultantsTableBody.append($placeholderRow);
  }

  /* ================= private AJAX methods =============== */
  function updateConsultantPositionsInDB(positions) {
    return $.post("php/consultants/updateConsultantPositions.php", {
      positions: positions
    });
  }

  function updateAllocationInDB(dynamicData) {
    return $.post("php/consultants/updateAllocation.php", {
      dynamicData: dynamicData
    });
  }

  function clearAllAllocationsInDB(dynamicData) {
    return $.post("php/consultants/removeAllAllocations.php", {
      dynamicData: dynamicData
    });
  }

  function getConsultantAndClientsFromDB() {
    return $.get("php/getConsultantsAndClients.php");
  }

  function clearConsutlantAllocationsIDB(dynamicData) {
    return $.post("php/consultants/removeConsultantAllocations.php", {
      dynamicData: dynamicData
    });
  }

  /* =================== public methods ================== */
  // main init method
  function init(consultants) {
    cacheDom();

    if (consultants.length > 0) {
      bindEvents();
      global.week = 0;
      render(
        WeekConsultantStorageModule.getConsultantsWeeksAllocations(global.week)
      );
      updateClientsWhoCols();
    } else {
      //Redirect to managment page if the application has no consultants
      window.location.replace("management-page.php");
      renderPlaceHolderText();
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
