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

    updateAllocationInDB(dynamicData).done(function(data) {});
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
      $columnElement = {},
      $allocationDiv = {};

    for (i = 0; i < 10; i++) {
      $columnElement = $("<td></td>")
        .addClass("allocation-col")
        .attr("data-slot", i)
        .attr("data-office", 0)
        .addClass("allocation-col table-bordered")
        .attr("data-slot", i);

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

      $columnElement.append($allocationDiv);

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

  // render DOM
  function render(consultants) {
    var x = 0;

    for (x in consultants) {
      renderConsultant(consultants[x]);
    }
  }

  /* ================= private AJAX methods =============== */
  function updateConsultantPositionsInDB(positions) {
    return $.post("php/updateConsultantPositions.php", {
      positions: positions
    });
  }

  function updateAllocationInDB(dynamicData) {
    return $.post("php/updateAllocation.php", {
      dynamicData: dynamicData
    });
  }

  function clearAllAllocationsInDB() {
    return $.get("php/removeAllAllocations.php");
  }

  function clearConsutlantAllocationsIDB(id) {
    return $.post("php/removeConsultantAllocations.php", { id: id });
  }

  /* =================== public methods ================== */
  // main init method
  function init(consultants) {
    cacheDom();
    bindEvents();
    render(consultants);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
