var MonthClientsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase array of clients
  var DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$clienttablebody = $("#clienttablebody");
    DOM.$custommenu = $("#clientmenu");
  }

  /*=========== public methods ==========*/

  function renderTableRow(client) {
    var $rowElement = $(); //Initialise variable

    $rowElement = $("<tr></tr>").attr({ //Begin row
      "data-id": client["id"],
      "data-abbreviation": client["abbreviation"],
      "data-position": client["board_position"],
      "data-name": client["full_name"],
      "data-colour": client["colour"]
    });

    $rowElement.append($("<td></td>")
    .html(client["full_name"]));

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

    DOM.$clienttablebody.append($rowElement);
  }

  /*
  Returns <tr> elements for every client in the module array
  */
  function renderTableRows(clients) {
    for (x in clients) {
      renderTableRow(clients[x]);
    }
  }

  function renderListItem(client) {
    var $listItemElement = $(); //Initialise variable

    $listItemElement = $("<li></li>")
      .attr("data-id", client["id"])
      .attr("data-name", client["full_name"])
      .attr("data-abbreviation", client["abbreviation"])
      .attr("data-colour", client["colour"])
      .html(client["full_name"]);

    DOM.$custommenu.append($listItemElement);
  }

  /*
  Return <li> elemnts for every client in the module array
  */
  function renderListItems(clients) {
    for (x in clients) {
      renderListItem(clients[x]);
    }
  }

  function renderPlaceHolderText() {
    var $placeholderRow = $();

    $placeholderRow = $("<tr></tr>").html(
      "To add clients, pleasse go navigate to the manage page"
    );
    DOM.$clienttablebody.html($placeholderRow);
  }

  function init(clients) {
    cacheDom();
    if (clients.length > 0) {
      renderTableRows(clients);
      renderListItems(clients);
    } else {
      renderPlaceHolderText();
    } 
  }

  /*=========== export public methods ==========*/

  return {
    init: init
  };
})();
