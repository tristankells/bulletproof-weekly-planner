var WeekConsultantModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$consultantsTableBody = $("#consultantstablebody");
    DOM.$clientMenu = $("#clientmenu");
    DOM.$officeMenu = $("#officemenu");
    DOM.$document = $(document);
    DOM.$resetAllocationsButton = $("#resetallocationbutton");
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

  function handleClientMenuClick($menuItem) {
    var $allocationCol = {};

    $allocationCol = $(".clicked-allocation");

    if ($menuItem.html() == "Empty") {
      $allocationCol.html("").removeAttr("data-id");
    } else {
      $allocationCol
        .html($menuItem.html())
        .attr("data-id", $menuItem.attr("data-id"));
    }

    updateAllocation($allocationCol);
  }

  function handleOfficeMenuClick($menuItem) {
    var $allocationCol = {};

    $allocationCol = $(".clicked-allocation");

    $allocationCol.attr("data-office", $menuItem.attr("data-action"));

    updateAllocation($allocationCol);
  }

  function handleClearAllAllocationsClick() {
    if (confirm("Press OK to delete ALL allocation information")) {
      clearAllAllocationsInDB().done(function() {
        $(".allocation-col").html("");

        $("#clienttablebody > tr").each(function() {
          $(this)
            .find(".who-column")
            .html("");
        });
      });
    }
  }

  function handleClearConsultantAllocationsClick($consultantRow) {
    if (confirm("Press OK to delete consultant allocation information")) {
      var id = 0;

      id = $consultantRow.attr("data-id");

      $consultantRow.find(".allocation-col").html("");

      clearConsutlantAllocationsIDB(id).done(function() {});
    }
  }

  function updateAllocation($allocationCol) {
    var dynamicData = {};

    dynamicData["consultantID"] = $allocationCol.parents("tr").attr("data-id");
    dynamicData["clientID"] = $allocationCol.attr("data-id");
    dynamicData["officeStatus"] = $allocationCol.attr("data-office");
    dynamicData["allocationSlot"] = $allocationCol.attr("data-slot");

    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);
    //Removed the clicked allocation class
    $(".clicked-allocation").removeClass("clicked-allocation");

    updateClientsWhoCols();

    updateAllocationInDB(dynamicData).done(function() {});
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

    console.log("updateClientWHoCAlled");

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

    //append allocation columns
    var i = 0,
      $columnElement = {};

    for (i = 0; i < 10; i++) {
      $columnElement = $("<td></td>")
        .attr("data-slot", i)
        .attr("data-office", 0)
        .addClass("allocation-col table-bordered force-height"); //UNCOMMENT
        $columnElement.append(createAllocationDiv());
/*
      var x = 0,
        allocation = {};
      for (x in consultant["allocations"]) {
        allocation = consultant["allocations"][x];
        if (allocation["allocationslot"] == i) {
          $columnElement.html(allocation["abbreviation"]);
          $columnElement.attr("data-id", allocation["id"]);
          switch (allocation["officestatus"]) {
            case "1":
              $columnElement.attr("data-office", 1);
              break;
            case "2":
              $columnElement.attr("data-office", 2);
              break;
          }
        }
      }
      */
      $rowElement.append($columnElement);
    }

    $rowElement.append(
      $("<div></div>")
        .addClass("clear-consultant-row")

        .append(
          $("<i></i>").addClass(
            "clear-consultant-btn clear-row-btn fas fa-minus-square fa-2x"
          )
        )
    );

    //Append row to consutlant table
    DOM.$consultantsTableBody.append($rowElement);
  }

  // Create allocation column div
  function createAllocationDiv(){
    var allocationDiv = "";
    var locationStatusDiv = "";


    locationStatusDiv = $("<div></div>").addClass("col-sm-2"); //Container to hold away and office icons
    locationStatusDiv.append($("<div></div>").addClass("row add-forced-height"));
    locationStatusDiv.append($("<div></div>").addClass("col-xs-12 client-label-red"));
    locationStatusDiv.append($("<div></div>").addClass("row add-forced-height"));
    locationStatusDiv.append($("<div></div>").addClass("col-xs-12 client-label-green"));


    allocationDiv=$("<div></div>").addClass("full-width-cus client-label-gray");
    
    /*
    allocationDiv.append($("<div></div>").addClass("col-sm-2 client-label-yellow"));
    allocationDiv.append($("<div></div>").addClass("col-sm-8 client-label-blue"));

    //allocationDiv.append(locationStatusDiv);    */

    return allocationDiv;
  }

  // render DOM
  function render(consultants) {
    var x = 0;

    for (x in consultants) {
      renderConsultant(consultants[x]);
    }
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

  function clearAllAllocationsInDB() {
    return $.get("php/consultants/removeAllAllocations.php");
  }

  function clearConsutlantAllocationsIDB(id) {
    return $.post("php/consultants/removeConsultantAllocations.php", {
      id: id
    });
  }

  /* =================== public methods ================== */
  // main init method
  function init(consultants) {
    cacheDom();
    if (consultants.length > 0) {
      bindEvents();
      render(consultants);
      updateClientsWhoCols();
    } else {
      renderPlaceHolderText();
    }
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
