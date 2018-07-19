//Load the javascript when the page is loaded
$(document).ready(function() {
  /*  
        @function initialiseTables

        Fill the client and consulsant table bodies with information from the mySQL database. 
    */

  function initialiseTables() {
    $.get("backend/getConsultantsAndClients.php", function(data) {
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
      for (x in clients) {
        addClientToTable(clients[x], consultants);
      }

      for (x in consultants) {
        addConsultantToTable(consultants[x], clients);
      }

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
      //  alert($(this).prop("id"));
      // alert($(this).attr("data-position"));
      $(this).removeClass("consultant-updated");
    });
    $.post(
      "backend/updateConsultantPositions.php",
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
      //  alert($(this).prop("id"));
      // alert($(this).attr("data-position"));
      $(this).removeClass("client-updated");
    });
    $.post(
      "backend/updateClientPositions.php",
      {
        positions: positions
      },
      function(data) {}
    );
  }
  /*  
        @function addClientToTable

        Takes a client object and array of consultants objects as parameters. Appends a row to the client table
        using the passed paremeters.
    */

  function addClientToTable(client, consultants) {
    var clientRow = "",
      consultant = {},
      clientAllocations = "";

    //Begin a new html table row containing the clients information
    clientRow =
      "<tr " +
      "id='" +
      client["id"] +
      "' data-abbreviation='" +
      client["abbreviation"] +
      "' " +
      "data-position='" +
      client["position"] +
      "' >";
    clientRow +=
      "<td>" +
      "<input class='client-name-input'" +
      "value='" +
      client["name"] +
      "'/>" +
      "</td>";
    clientRow += "<td>" + client["abbreviation"] + "</td>";
    clientRow += "<td class='who-column'>";

    //Checks if consultants are allocated to a client and create the appropirate innerHTML for the WHO column.
    for (x in consultants) {
      consultant = consultants[x];
      consultantAllocations = consultant["allocations"];
      clientAllocations = "";
      for (k in consultantAllocations) {
        //Loop though consultant properties
        allocation = consultantAllocations[k];
        if (allocation["allocatedto"] == client["abbreviation"]) {
          if (!clientAllocations.includes(consultant["name"])) {
            //Check name is not added twice.
            clientAllocations += consultant["name"] + " ";
          }
        }
      }
      clientRow += clientAllocations;
    }
    clientRow += "</td>";
    clientRow +=
      "<td style='text-align: center; vertical-align: middle;'><input type='image' src='/Glance/img/remove.png' class='remove-client-btn'/></td>";

      "<td style='text-align: center; vertical-align: middle;'><input type='image' src='/Glance/img/remove.png' class='remove-consultant-btn'/></td>";

    clientRow += "</tr>";
    $("#clienttablebody").append(clientRow); //Append html table row to client table body
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
      "<td>" +
      "<input " +
      "class='consultant-name-input' " +
      " value='" +
      consultant["name"] +
      "'/>" +
      "</br><div class='rolediv'>" +
      consultant["role"] +
      "</div></td>";
    for (i = 0; i < 10; i++) {
      //Loop through days in the week, times 2, and populate dropdowns

      consultantRow +=
        "<td"
        
        if(i%2==1){
          consultantRow+= " class='row-space'>";
        }else{
          consultantRow+=">";
        }

        consultantRow+= "<select" +
          " class=" 
            + "'clientdropdown' id='" + i + "'data-office=";

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
      "<td style='text-align: center; vertical-align: middle;'><input type='image' src='/Glance/img/remove.png' class='remove-consultant-btn'/></td>";
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

  function checkOfficeStatusOfSlot(allocations, allocationslot) {
    var allocation = {};
    officeStatus = 0;

    for (y in allocations) {
      allocation = allocations[y];
      if (allocation["allocationslot"] == i) {
        switch (allocation["officestatus"]) {
          case "1":
            return "'1' style='background-color:#1A2930;color:white;'";
            break;
          case "2":
            return "'2' style='background-color:#F7CE3E;'";
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
        @button #addclientbutton

        An click event is attached to the 'Add Client' button, which captures the input of the #clientnameinput and
        the #b. If the clien input is unquie, then the client information is added to the
        database, the new client is rendered to the client table.
    */

  function getClients() {
    var clients = [],
      client = {},
      clientRow = {},
      name = "",
      abbreviation = "",
      id = 0;

    $("#clienttablebody > tr").each(function() {
      clientRow = $(this);
      id = clientRow.prop("id");
      name = clientRow.data("name");
      abbreviation = clientRow.data("abbreviation");

      client = {
        id: id,
        name: name,
        abbreviation: abbreviation
      };

      clients.push(client);
    });

    return clients;
  }

  function getConsultants() {
    var consultants = [],
      consultant = {},
      consultantRow = {},
      id = 0,
      name = "",
      role = "";

    $("#consultanttablebody > tr").each(function() {
      consultantRow = $(this);
      id = consultantRow.prop("id");
      name = consultantRow.data("name");
      role = consultantRow.data("role");

      consultant = {
        id: id,
        name: name,
        role: role
      };

      consultants.push(consultant);
    });

    return consultants;
  }

  $("#addclientbutton").click(function() {
    //Add a click event to the addclientbutton
    var newClientName = "",
      newClientabbreviation = "",
      nameUnique = true,
      abbreviationUnique = true,
      clients = [],
      consultants = [],
      position = 0;

    newClientName = $("#clientnameinput").val(); //Store name of client to be added
    newClientabbreviation = $("#clientabbreviationinput").val(); //Store abbreviation of client to be added
    newClientabbreviation = newClientabbreviation.toUpperCase();

    clients = getClients();

    position = clients.length + 1;

    //Loop though the current list of clients and make sure the name and abrevvation are unique
    for (x in clients) {
      if (clients[x]["name"] == newClientName) {
        nameUnique = false;
      }
      if (clients[x]["abbreviation"] == newClientabbreviation) {
        abbreviationUnique = false;
      }
    }

    if (newClientName !== "" && newClientabbreviation !== "") {
      if (nameUnique) {
        if (abbreviationUnique) {
          $.post(
            "backend/addNewClient.php", //Request data from server using POST, url is addClient.php
            {
              clientName: newClientName, //Pass the value of client name
              clientAbbrev: newClientabbreviation, //Pass the value of client abbreviation
              position: position
            },
            function(data) {
              //After response is recieved from server

              var optionHTML = "",
                addedClient = {},
                consultants = [];

              consultants = getConsultants();

              optionHTML +=
                "<option" +
                " value='" +
                newClientabbreviation +
                "'>" +
                newClientabbreviation +
                "</option>";

              //Add the client to the list of options in allocation's dropdown
              $(".clientdropdown").append(optionHTML);

              addedClient = JSON.parse(data);
              addClientToTable(addedClient, consultants); //Add client to page table
              $("#clientnameinput").val(null);
              $("#clientabbreviationinput").val(null);
            }
          );
        } else {
          alert("Abbreviation is not unquie");
        }
      } else {
        alert("Name is not unquie");
      }
    } else {
      alert("Please enter name and abbreviation");
    }
  });

  /*  
        @button .remove-client-btn

        Attaches a event to the buttons with the remove-client-btn class. Delete the selected row from the table and
        removes that client from the database. Updates the dropdown options.
   */
  $("#clientstable").on("click", ".remove-client-btn", function() {
    var thisClientRow = {},
      thisClientID = 0,
      clientabbreviation = "";

    thisClientRow = $(this).closest("tr"); //Store the client table row
    thisClientID = thisClientRow.prop("id"); //Store client id
    clientabbreviation = thisClientRow.data("abbreviation");

    $.post(
      "backend/removeClient.php", //Request data from server using POST, url is removeClient.php
      {
        clientID: thisClientID, //Pass the value of the table column with the id clientName within the closest table row to the removeclientbutton(this)
        abbreviation: clientabbreviation
      },
      function(data) {
        $("option[value='" + clientabbreviation + "']").remove(); //Remove the abbreviation from the consultant dropdown
        thisClientRow.remove(); //Remove the closest table row to the button
      }
    );
  });

  /*  
        @button #addconsultantbutton

        An click event is attached to the 'Add Consultant' button, which captures the input of the 
        #consultantnameinput and the #consultantroleinput. If the consultant name is unquie, then the consultant 
        information is added to the database and the new consultant is rendered to the consultant table.
    */
  $("#addconsultantbutton").click(function() {
    var newConsultantName = "",
      newConsultantRole = "",
      nameUnique = true,
      consultants = {},
      addedConsultant = {},
      clients = [];
    position = 0;

    newConsultantName = $("#consultantnameinput").val();
    newConsultantRole = $("#consultantroleinput").val();

    consultants = getConsultants();

    position = consultants.length + 1;

    for (x in consultants) {
      if (consultants[x]["name"] == newConsultantName) {
        nameUnique = false;
      }
    }

    if (newConsultantName !== "") {
      //Check name field is not blank
      if (nameUnique) {
        clients = getClients();

        $.post(
          "backend/addNewConsultant.php", //Request data from server using POST, url is addClient.php
          {
            consultantName: newConsultantName, //Pass the value of consultant name input to server
            consultantJob: newConsultantRole, //Pass the value of consultant row input to server
            position: position
          },
          function(data) {
            //Call back function to excute after the request to the server is processed
            addedConsultant = JSON.parse(data);
            addConsultantToTable(addedConsultant, clients);
            $("#clientnameinput").val(null);
            $("#clientabbreviationinput").val(null);
          }
        );
      } else {
        alert("Name is not unique");
      }
    } else {
      alert("Please enter name");
    }
  });

  /* 
        @button .remove-consultant-btn

        Attaches a click event to the buttons with the remove-consultant-btn class. Delete the selected row from the
        table and removes that consultant from the database. Updates the client's WHO columns.
    */
  $("#consultantstable").on("click", ".remove-consultant-btn", function() {
    var thisConsultantRow = {},
      consultantID = "";

    thisConsultantRow = $(this).closest("tr");
    consultantName = thisConsultantRow.data("name");
    consultantID = thisConsultantRow.prop("id");

    $.post(
      "backend/removeConsultant.php", //Request data from server using POST, url is removeClient.php
      {
        consultantID: consultantID //Pass the value of the table column with the id clientName within the closest table row to the removeclientbutton(this)
      },
      function(data) {
        thisConsultantRow.remove(); //Remove the closest table row to the button
        //Loop though all the client WHO collumns and remove the consultant's name.
        $("#clienttablebody > tr").each(function() {
          var clientRow = $(this);
          whoColumn = clientRow.find(".who-column");
          allocatedClients = whoColumn.html();
          allocatedClients = allocatedClients.replace(consultantName, "");
          whoColumn.html(allocatedClients);
        });
      }
    );
  });

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

    selectElement = $(this);

    selectedClientabbreviation = selectElement.find(":selected").val();
    officeStatus = selectElement.data("office");

    allocationNo = selectElement.prop("id");
    consultantRow = selectElement.closest("tr");
    consultantID = consultantRow.prop("id");
    $.post(
      "backend/updateAllocation.php",
      {
        consultantID: consultantID,
        clientAbbreviation: selectedClientabbreviation,
        allocationSlot: allocationNo,
        officeStatus: officeStatus
      },
      function(data) {
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
      var consultantRow = $("#consultantstablebody").children("#" + id);
      var consultantName = consultantRow.data("name");

      allocatedClients = clientRow.find(".who-column").html();

      for (i; i < 10; i++) {
        allocation = consultantRow.find("#" + i);
        if (allocation.val() == clientRow.data("abbreviation")) {
          if (!allocatedClients.includes(consultantName)) {
            allocatedClients += " " + consultantName;
            whoColumn = clientRow.find(".who-column");
            whoColumn.html(allocatedClients);
          }
          return;
        }
      }
      allocatedClients = allocatedClients.replace(consultantName, "");
      clientRow.find(".who-column").html(allocatedClients);
    });
  }

  /*
        #input #maindiv > .client-name-input
    
        Add a blur event to the client name inputs (when they are clicked away from) which updates the database with the
        new client name.
    */
  $("#maindiv").on("blur", ".client-name-input", function() {
    var newClientName = "",
      clientID = 0;

    newClientName = $(this).val();
    clientID = $(this)
      .closest("tr")
      .prop("id");
    $.post(
      "backend/updateClientName.php",
      {
        clientID: clientID,
        clientName: newClientName
      },
      function(data) {}
    );
  });

  /*
      #input #consultantstablebody > .consultant-name-input
  
      Add a blur event to the consultant name inputs (when they are clicked away from) which updates the database 
      with the new consultant name. Alss updates the client's WHO columns which had the orginal name
    */
  $("#consultantstablebody").on("blur", ".consultant-name-input", function() {
    var newConsultantName = "",
      originalConsultantName = "",
      consultantID = 0,
      consultantRow = {};

    newConsultantName = $(this).val();
    consultantRow = $(this).closest("tr");
    consultantID = consultantRow.prop("id");
    originalConsultantName = consultantRow.data("name");
    $.post(
      "backend/updateConsultantName.php",
      {
        consultantID: consultantID,
        consultantName: newConsultantName
      },
      function(data) {
        $("#clienttablebody > tr").each(function() {
          var clientRow = {},
            clientRowWhoColumn = {},
            allocatedClient = "";

          clientRow = $(this);
          clientRowWhoColumn = clientRow.find(".who-column");
          allocatedClients = clientRowWhoColumn.html(); //String for all the WHO consultants

          if (allocatedClients.includes(originalConsultantName)) {
            allocatedClients = allocatedClients.replace(
              originalConsultantName,
              newConsultantName
            );
            consultantRow.data("name", newConsultantName);
            clientRowWhoColumn.html(allocatedClients);
          }
        });
      }
    );
  });

  /*
      #input #consultantstablebody > .consultant-name-input
          
      Add a key press event to the consultant name inputs (when enter is clicked) which blurs the input box, 
      causing the new name input to be saved to the database.
    */
  $("#consultantstablebody").on("keyup", ".consultant-name-input", function(e) {
    if (e.keyCode === 13) {
      this.blur();
    }
  });

  /*
     #input #clienttablebody > .client-name-input
         
     Add a key press event to the client name inputs (when enter is clicked) which blurs the input box, causing the 
     name input to be saved to the database.
    */
  $("#clienttablebody").on("keyup", ".client-name-input", function(e) {
    if (e.keyCode === 13) {
      this.blur();
    }
  });

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

  $("#consultantstable > .dates").each(function() {
    $(this).append(monday.getDate() + $(this).index() - 1);
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
      clientAbbreviation = "";

    allocationNo = contextMenuClosestSelect.prop("id");
    consultantID = contextMenuClosestSelect.parents("tr").prop("id");
    clientAbbreviation = contextMenuClosestSelect.val();

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
      "backend/updateAllocation.php",
      {
        consultantID: consultantID,
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
        selectElement.css("background-color", "#1A2930");
        selectElement.css("color", "white");
        break;
      case "2":
        selectElement.css("background-color", "#F7CE3E");
        selectElement.css("color", "black");
        break;
      case "0":
        selectElement.css("background-color", "white");
        break;
    }
  }

  //End of context menu code adapted from https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app 12/07/2018
});
