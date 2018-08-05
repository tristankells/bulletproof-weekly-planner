//Load the javascript when the page is loaded
$(document).ready(function() {
  /*  
        @function initialiseTables

        Fill the client and consulsant table bodies with information from the mySQL database. 
    */

  function initialiseTables() {
    $.get("php/getConsultantsAndClients.php", function(data) {
      var databaseResults = [],
        clients = [],
        consultants = [];

      databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server

      consultants = databaseResults[0]; //Store array of consultants

      clients = databaseResults[1]; //Store array of clients

      /*
            Iterate through the arrays of clients and consultants and ouput the information stored in these arrays
            to the page tables
            */
      WeekClientsModule.init(clients, consultants);

      WeekConsultantModule.init(consultants, clients);

      //  for (x in consultants) {
      //   addConsultantToTable(consultants[x], clients);
      //  }

      //Using the jquery UI library, makes items within tbody elements sortable
      //THE START OF POSITION TRACKING FUNCTIONALITY NEED TO BE EXPANDED UPON
      //https://www.youtube.com/watch?v=V1nYMDoSCXY
      $("#clienttablebody").sortable({
        update: function(event, ui) {
          $(this)
            .children()
            .each(function(index) {
              if ($(this).attr("data-position") != index + 1) {
                $(this)
                  .attr("data-position", index + 1)
                  .addClass("client-updated");
              }
            });
          saveNewClientPositions();
        }
      });

      $("#consultantstablebody").sortable({
        update: function(event, ui) {
          $(this)
            .children()
            .each(function(index) {
              if ($(this).attr("data-position") != index + 1) {
                $(this)
                  .attr("data-position", index + 1)
                  .addClass("consultant-updated");
              }
            });
          saveNewConsultantPositions();
        }
      });
    });
  }

  function saveNewConsultantPositions() {
    var positions = [];
    $(".consultant-updated").each(function() {
      positions.push([$(this).prop("id"), $(this).attr("data-position")]);
      $(this).removeClass("consultant-updated");
    });
    $.post(
      "php/updateConsultantPositions.php",
      {
        positions: positions
      },
      function(data) {}
    );
  }

  function saveNewClientPositions() {
    var positions = [];
    $(".client-updated").each(function() {
      positions.push([$(this).prop("id"), $(this).attr("data-position")]);
      $(this).removeClass("client-updated");
    });
    $.post(
      "php/updateClientPositions.php",
      {
        positions: positions
      },
      function(data) {}
    );
  }

  /*  
        @function addConsultantToTable

        Takes a consultant object and array of client objects as parameters. Appends a row to the consultant table
        using the passed paremeters.
    */

  function addConsultantToTable(consultant, clients) {
    var consultantRow = "",
      client = {},
      abbreviation;

    //Begin a new html table row containing the consultants information
    consultantRow =
      "<tr id='" +
      consultant["id"] +
      "' data-name='" +
      consultant["name"] +
      "' data-role='" +
      consultant["role"] +
      "' data-position='" +
      consultant["position"] +
      "' >";
    consultantRow +=
      "<div id='consultant-header'><td class='consultant-header'>" +
      "<div class='consultant-info-format'>" +
      "<div><input class='consultant-name-input' value='" +
      consultant["name"] +
      "'/></div>" +
      "<div class='rolediv'>" +
      consultant["role"] +
      "</div>" +
      "</div>" +
      "<div class='draggable-icon'>" +
      "<a href='#'><i class='fas fa-ellipsis-v'></i></a>" +
      "</div></td>";
    for (i = 0; i < 10; i++) {
      //Loop through days in the week, times 2, and populate dropdowns

      consultantRow += "<td";

      if (i % 2 == 1) {
        consultantRow += " class='row-space'>";
      } else {
        consultantRow += ">";
      }

      consultantRow +=
        "<select" +
        " class=" +
        "'dropdown clientdropdown' id='" +
        i +
        "'data-office=";

      consultantRow += checkOfficeStatusOfSlot(consultant["allocations"], i);

      consultantRow += " ><option value='Open'></option>";
      consultantRow += "<option value='Leave' ";
      if (checkIfClientAllocatedNow(consultant["allocations"], i, "Leave")) {
        consultantRow += " selected='selected'";
      }
      consultantRow += ">Leave</option>";
      for (z in clients) {
        //Loop through clients
        client = clients[z];
        abbreviation = client["abbreviation"];
        consultantRow += "<option value='" + abbreviation + "'";
        if (
          checkIfClientAllocatedNow(consultant["allocations"], i, abbreviation)
        ) {
          consultantRow += " selected='selected'";
        }
        consultantRow += ">" + client["abbreviation"] + "</option>";
      }
      consultantRow += "</select></td>";
    }
    consultantRow +=
      "<td  style='text-align: center; vertical-align: middle; border: none'><input type='image' src='/Glance/img/clear.png' class='clear-consultant-btn remove-add-btn'/></td>";
    consultantRow += "</tr>";
    $("#consultantstablebody").append(consultantRow);
  }

  /*  
        @function #checkIfClientAllocatedNow

        Takes a array of allocations, an allocation slot number and an abbreviation. Returns true if any of the 
        allocations match the time slot and abrevation provided. Otherwise returns false. Used in the 
        addConsultantToTable to select the appropirate dropdown option.
       
    */

  function checkIfClientAllocatedNow(
    allocations,
    allocationslot,
    abbreviation
  ) {
    var allocation = {};

    for (y in allocations) {
      allocation = allocations[y];
      if (
        allocation["allocatedto"] == abbreviation &&
        allocation["allocationslot"] == allocationslot
      ) {
        return true;
      }
    }
    return false;
  }

  function checkOfficeStatusOfSlot(allocations) {
    var allocation = {};
    officeStatus = 0;

    for (y in allocations) {
      allocation = allocations[y];
      if (allocation["allocationslot"] == i) {
        switch (allocation["officestatus"]) {
          case "1":
            return "'1' style='background-color:#A9B7C0;color:white;'";
            break;
          case "2":
            return "'2' style='background-color:#C7D8C6;'";
            break;
          case "0":
            return "'0'";
            break;
        }
      }
    }
    return "'0'";
  }

  /*  
        @dropdown #consultantstable > .clientdropdown

        A change event is added to all dropdown menus for a consultants allocations. When a new abbreviation is
        selected, or a null is selected, this allocation is updated to the database. The who column for the
        appropirate client is updated if necessary.
     */
  $("#consultantstable").on("change", ".clientdropdown", function() {
    var selectedClientabbreviation = "",
      allocationNo = "",
      consultantRow = {},
      consultantID = 0,
      selectElement = {},
      officeStatus = 0;
    clientName = "";

    selectElement = $(this);

    selectedClientabbreviation = selectElement.find(":selected").val();

    clientName = $("#clienttablebody")
      .find("[data-abbreviation ='" + selectedClientabbreviation + "']")
      .attr("data-name");

    officeStatus = selectElement.attr("data-office");

    allocationNo = selectElement.attr("data-slot");
    consultantRow = selectElement.closest("tr");
    consultantID = consultantRow.attr("data-id");

    console.log(consultantID);
    console.log(clientName);
    console.log(selectedClientabbreviation);
    console.log(allocationNo);
    console.log(officeStatus);

    $.post(
      "php/updateAllocation.php",
      {
        consultantID: consultantID,
        clientName: clientName,
        clientAbbreviation: selectedClientabbreviation,
        allocationSlot: allocationNo,
        officeStatus: officeStatus
      },
      function(data) {
        console.log(data);
        updateClientAllocationColumn(consultantID);
      }
    );
  });

  /*
        @function updateClientAllocationColumn
    
        Takes a consultant ID name as a parameter. Checks all of the consultant's allocations. If the consultant is
        newly allocated to a client, update that client's WHO column with consultant name. If that consultant is no 
        longer allocated to a client, remove the consultant name from the client WHO column. 
    */
  function updateClientAllocationColumn(id) {
    $("#clienttablebody > tr").each(function() {
      var clientRow = $(this);
      var i = 0;
      var consultantRow = $("#consultantstablebody").find(
        "[data-id='" + id + "']"
      );
      var consultantName = consultantRow.attr("data-name");

      allocatedClients = clientRow.find(".who-column").html();

      for (i; i < 10; i++) {
        allocation = consultantRow.find("[data-slot='" + i + "']");
        if (allocation.val() == clientRow.data("abbreviation")) {
          if (allocatedClients != "") {
            allocatedClients += ", ";
          }
          if (!allocatedClients.includes(consultantName)) {
            allocatedClients += consultantName;
            whoColumn = clientRow.find(".who-column");
            whoColumn.html(allocatedClients);
          }
          return;
        }
      }
      allocatedClients = allocatedClients.replace(consultantName, "");

      if (allocatedClients.charAt(allocatedClients.length - 2) == ",") {
        allocatedClients = allocatedClients.substring(
          0,
          allocatedClients.length - 2
        );
      }

      allocatedClients = allocatedClients.replace(", ,", ",");

      clientRow.find(".who-column").html(allocatedClients);
    });
  }

  //Populate page
  initialiseTables();

  currentDate = new Date();
  monday = new Date();

  switch (currentDate.getDay()) {
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

  var months = [
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
  $("#displaymonth").append(months[currentDate.getMonth()]);

  $("#consultantstableheadrow > .date").each(function() {
    var day = 0;
    day = monday.getDate() + $(this).index();

    if (day > 31) {
      day = day - 31;
    }

    if (currentDate.getDate() == day) {
      //PLACEHOLDER CURRENT DAY HIGHLIGHT
      $(this).css("background-color", "red");
    }

    $(this).append(" " + day);
  });

  //Beginning of context menu code adapted from https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app 12/07/2018
  var contextMenuClosestSelect = {};

  // Trigger action when the contextmenu is about to be shown on td element
  $("#consultantsdiv").on("contextmenu", "select", function(event) {
    contextMenuClosestSelect = $(this);
    // Avoid the real one
    event.preventDefault();

    // Show contextmenu
    $(".custom-menu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px"
      });
  });

  // If the document is clicked somewhere
  $(document).bind("mousedown", function(e) {
    // If the clicked element is not the menu
    if (!$(e.target).parents(".custom-menu").length > 0) {
      // Hide it
      $(".custom-menu").hide(100);
    }
  });

  // If the menu element is clicked
  $(".custom-menu li").click(function() {
    var consultantID = 0,
      allocationNo = 0,
      officeStatus = 0,
      clientAbbreviation = "",
      clientName = "";

    allocationNo = contextMenuClosestSelect.attr("data-slot");
    consultantID = contextMenuClosestSelect.parents("tr").attr("data-id");
    clientAbbreviation = contextMenuClosestSelect.val();

    if (!clientAbbreviation == "Open") {
      clientName = $("#clienttablebody")
        .find("[data-abbreviation ='" + clientAbbreviation + "']")
        .attr("data-name");
    }

    // This is the triggered action name
    switch ($(this).attr("data-action")) {
      // A case for each action. Your actions here
      case "1":
        contextMenuClosestSelect.data("office", "1");
        break;
      case "2":
        contextMenuClosestSelect.data("office", "2");
        break;
      case "0":
        contextMenuClosestSelect.data("office", "0");
        break;
    }

    updateSelectColour(contextMenuClosestSelect);

    officeStatus = contextMenuClosestSelect.data("office");

    // Hide it AFTER the action was triggered
    $(".custom-menu").hide(100);

    $.post(
      "php/updateAllocation.php",
      {
        consultantID: consultantID,
        clientName: clientName,
        clientAbbreviation: clientAbbreviation,
        allocationSlot: allocationNo,
        officeStatus: officeStatus
      },
      function(data) {}
    );
  });

  function updateSelectColour(selectElement) {
    switch (selectElement.data("office")) {
      case "1":
        selectElement.css("background-color", "#A9B7C0");
        selectElement.css("color", "white");
        break;
      case "2":
        selectElement.css("background-color", "#C7D8C6");
        selectElement.css("color", "black");
        break;
      case "0":
        selectElement.css("background-color", "#f9f9f9");
        selectElement.css("color", "black");
        break;
    }
  }

  //End of context menu code adapted from https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app 12/07/2018

  //Add hover effect to select items
  $("data-office").hover(
    function() {
      $(this).css("background-color", "yellow");
    },
    function() {
      $(this).css("background-color", "pink");
    }
  );

  //Add clear all allocations function to the reset allocations button
  $("#resetallocationbutton").click(function() {
    if (confirm("Press OK to delete ALL allocation information")) {
      clearAllAllcations();
    }
  });

  /*    
     Remove allocations from the consultant table 
  */
  function clearAllAllcations() {
    $.get("php/removeAllAllocations.php", function() {
      //Set select elements to the "" value and the background colour to the default
      $("select").val("");
      $("select").css("background-color", "#f9f9f9");

      var id;

      $("#clienttablebody > tr").each(function() {
        $(this)
          .find(".who-column")
          .html("");
      });
    });
  }

  /* 
    Add background color change on mouseover of a select item
  */

  $("#consultantstablebody").on("mouseover", "select", function() {
    $(this).addClass("select-element-hover");
  });

  $("#consultantstablebody").on("mouseleave", "select", function() {
    $(this).removeClass("select-element-hover");
  });

  /*-----------------CONSULTANS : CLEAR ROW ALLOCATIONS---------------------*/

  //Bind the clear allocations function to its button
  function bindClearAlllocationButtons() {
    $("#consultantstablebody").on(
      "click",
      ".clear-consultant-btn",
      clearConsultantAllocations
    );
  }

  bindClearAlllocationButtons();

  /*
  function : clearConsultantAllocations()

  Requires a event. Remove all allocation information for the parent Consultant row of the event.
  */
  function clearConsultantAllocations() {
    if (confirm("Press OK to delete consultant allocation information")) {
      var $consultantRow = {},
        id = 0;

      $consultantRow = $(event.target).closest("tr");

      id = $consultantRow.attr("data-id");

      clearConsutlantAllocationsDB(id).done(function() {
        $consultantRow
          .find(".clientdropdown")
          .val(null)
          .css("background-color", "#f9f9f9");

        updateClientAllocationColumn(id);
      });
    }
  }

  /*
  function: clearConsutlantAllocationsDB()

  AJAX. Takes a consultant ID number as parameter. Remove all allocations for a consultant from the the database.
  */
  function clearConsutlantAllocationsDB(id) {
    return $.post("php/removeConsultantAllocations.php", { id: id });
  }
});

/* function: retrieveConsultantInitials()  *************************** TEST ***************************

AJAX. Takes a consultant name as a string and converts it to corresponding initials.

    function clearConsutlantAllocationsDB(id) {
  var str     = "Java Script Object Notation";
  var matches = str.match(/\b(\w)/g);              // ['J','S','O','N']
  var acronym = matches.join(''); 
  return acronym;
  }
}); */
