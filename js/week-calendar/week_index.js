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
      "php/clients/updateClientPositions.php",
      {
        positions: positions
      },
      function() {}
    );
  }
});

