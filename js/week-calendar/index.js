//Load the javascript when the page is loaded
$(document).ready(function() {
  /*  
        @function initialiseTables

        Fill the client and consulsant table bodies with information from the mySQL database. 
    */

   DateModule.init();

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


      WeekClientsModule.init(clients);

      WeekConsultantModule.init(consultants);

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
    });
  }

  initialiseTables();

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
  


  //Beginning of context menu code adapted from https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app 12/07/2018

  // If the menu element is clicked

  //End of context menu code adapted from https://stackoverflow.com/questions/4495626/making-custom-right-click-context-menus-for-my-web-app 12/07/2018



  /*-----------------CONSULTANS : CLEAR ROW ALLOCATIONS---------------------*/

  //Bind the clear allocations function to its button
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
