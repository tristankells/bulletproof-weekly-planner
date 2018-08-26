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
      "data-name": client["full_name"]
    });

    //Add name column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format client-name-input")
        .css("vertical-align", "middle")
        .html(client["full_name"])
    );

    //Add abbreviation column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format")
        .css({
          "vertical-align": "middle",
          "font-weight": "bold"
        })
        .html(client["abbreviation"])
    );

    //Add allocation column

    $rowElement.append(
      $("<td></td>")
        .addClass("who-column client-row-format")
        .css("vertical-align", "middle")
    );

    //Add remove button
    $rowElement.append(
      $("<td></td>").css({
        "vertical-align": "middle",
        "text-align": "center",
        border: "none"
      })
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
    Return <li> elemnts for every client in the module array
    */

  function init(clients) {
    cacheDom();
    if (clients.length > 0) {
      populateClientMenu(clients);
      render(clients);
    } else {
      renderPlaceHolderText();
    }
  }

  /*=========== export public methods ==========*/

  return {
    init: init
  };
})();
