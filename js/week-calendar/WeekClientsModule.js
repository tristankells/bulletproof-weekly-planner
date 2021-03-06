var WeekClientsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase array of clients
  var DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$clienttablebody = $("#clienttablebody");
    DOM.$clienttable = $("#clientstable");
    DOM.$clientMenu = $("#clientmenu");
  }

  function populateClientMenu(clients) {
    var $clientListElement = {},
      client = {};

    for (x in clients) {
      client = clients[x];

      $clientListElement = $("<li></li>")
        .attr("data-id", client["id"])
        .attr("data-colour", client["colour"])
        .html(client["abbreviation"]);
      DOM.$clientMenu.append($clientListElement);
    }
  }

  function renderClient(client) {
    var $rowElement = $(); //Initialise variable

    $rowElement = $("<tr></tr>").attr({
      "data-id": client["id"],
      "data-abbreviation": client["abbreviation"],
      "data-position": client["board_position"],
      "data-name": client["full_name"],
      "data-colour": client["colour"]
    });

    //Add name column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format client-name-input")
        .css({
          "vertical-align": "middle",
          "font-style": "italic",
          "text-align": "center"
        })
        .html(client["full_name"])
    );

    //Add color column
    $rowElement.append($("<td></td>").addClass("color-col"));

    //Add abbreviation column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format")
        .css({
          "vertical-align": "middle",
          "font-weight": "bold",
          "text-align": "center"
        })
        .html(client["abbreviation"])
    );

    //Add allocation column

    $rowElement.append(
      $("<td></td>")
        .addClass("who-column client-row-format")
        .css("vertical-align", "middle")
        .html(client["who"])
    );

    DOM.$clienttablebody.append($rowElement);
  }

  function render(clients) {
    var x = 0;
    for (x in clients) {
      renderClient(clients[x]);
    }
  }

  function renderPlaceHolderText() {
    var $placeholderRow = $();

    $placeholderRow = $("<tr></tr>").html(
      "To add clients, pleasse go navigate to the manage page"
    );
    DOM.$clienttablebody.html($placeholderRow);
  }
  /*=========== public methods ==========*/

  /*
    Return <li> elements for every client in the module array
    */

  function init(clients) {
    cacheDom();
    if (clients.length > 0) {
      populateClientMenu(clients);
      render(clients);
      addDraggableToTable();
    } else {
      //Redirect to managment page if the application has no clients
      window.location.replace("management-page.php");
      renderPlaceHolderText();
    }
  }

  function addDraggableToTable() {
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
  }

  /*=========== export public methods ==========*/

  return {
    init: init
  };
})();
