var ClientModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$clienttablebody = $("#clienttablebody");
    DOM.$clientnameinput = $("#clientnameinput");
    DOM.$clientabbreviationinput = $("#clientabbreviationinput");
    DOM.$addclientbutton = $("#addclientbutton");
    DOM.$document = $(document);
    DOM.$colourmenu = $(".colour-menu");
    DOM.$removeAllClientsButton = $("#removeallclientsbutton");
  }

  // bind events
  function bindEvents() {
    DOM.$addclientbutton.click(function() {
      addClient();
    });

    DOM.$clientnameinput.on("keyup", function(e) {
      if (e.keyCode === 13) {
        this.blur();
        addClient();
      }
    });

    DOM.$clientabbreviationinput.on("keyup", function(e) {
      if (e.keyCode === 13) {
        this.blur();
        addClient();
      }
    });

    DOM.$clienttablebody.on("click", ".remove-client-btn", function(e) {
      ConfirmModule.Confirm(
        "Delete Client",
        "This will delete <span class='confirm-name'>" +
          $(e.target)
            .closest("tr")
            .attr("data-name") +
          "</span> and all associated allocations, are you sure you want to do this?",
        "Yes",
        "Cancel",
        deleteClient,
        $(e.target).closest("tr")
      );
    });

    DOM.$clienttablebody.on("blur", ".client-name-input", function() {
      ManageFunctionsModule.changeName(updateClientNameInDB);
    });

    DOM.$clienttablebody.on("keyup", ".client-name-input", function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    DOM.$clienttablebody.on("blur", ".client-abbreviation-input", function() {
      updateClientAbbreviation($(this));
    });

    DOM.$clienttablebody.on("keyup", ".client-abbreviation-input", function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    updateClientAbbreviation;

    DOM.$clienttablebody.on("click", ".color-col", handleColourColClick);

    DOM.$colourmenu.on("click", "li", handleColourItemClick);

    DOM.$document.on("mousedown", function(e) {
      if (!$(e.target).parents(".custom-menu").length > 0) {
        $(".clicked-client").removeClass("clicked-client");
        $(".custom-menu").hide(100);
      }
    });

    DOM.$removeAllClientsButton.click(function() {
      ConfirmModule.Confirm(
        "Delete All",
        "This will delete all clients and thier associated allocations, are you sure you want to do this?",
        "Yes",
        "Cancel",
        deleteAllClients,
        null
      );
    });
  }

  /* 
  function :handleColourItemClick
  
  Called on a custom menu item click. 
  Updates the 'colour' of a client in DB with a number between 0 and 5, representing 6 differnet colour options
  */
  function handleColourItemClick() {
    var dynamicData = {},
      newColour = 0,
      $clientRow = {};

    newColour = $(this).attr("data-action");

    $clientRow = $(".clicked-client").closest("tr");

    dynamicData["id"] = $clientRow.attr("data-id");
    dynamicData["colour"] = newColour;

    $clientRow.attr("data-colour", newColour);

    updateClientColourInDB(dynamicData).done();

    $(".custom-menu").hide(100);
  }

  function handleColourColClick() {
    $(this).addClass("clicked-client");

    $(".colour-menu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: event.pageX + "px"
      });
  }

  //Render a client to DOM
  function renderClient(client) {
    var $rowElement = $();
    //Begin new client row
    $rowElement = $("<tr></tr>")
      .attr("data-id", client["id"])
      .attr("data-name", client["full_name"])
      .attr("data-abbreviation", client["abbreviation"])
      .attr("data-colour", client["colour"]);

    //Add client name colunm
    $rowElement.append(
      $("<td></td>")
        .addClass("custom-dark-bg")
        .append(
          $("<input></input>")
            .addClass("client-name-input")
            .val(client["full_name"])
        )
    );

    //Add client abbreviation colunm
    $rowElement.append(
      $("<td></td>")
        .addClass("custom-dark-bg")
        .css({
          "text-align": "center"
        })
        .append(
          $("<input></input>")
            .addClass("client-abbreviation-input")
            .val(client["abbreviation"])
        )
    );

    //INSERT CUSTOM ICON
    $rowElement.append($("<td></td>").addClass("color-col"));

    //Add remove client button

    $rowElement.append(
      $("<div></div>")
        .addClass("clear-consultant-row")

        .append(
          $("<i></i>")
            .addClass(
              "remove-client-btn fas fa-minus-square fa-2x clear-row-btn"
            )
            .attr("data-id", client["id"])
        )
    );

    DOM.$clienttablebody.append($rowElement);
  }

  // render clients to dom DOM
  function render(clients) {
    var x = 0;
    for (x in clients) {
      renderClient(clients[x]);
    }
  }

  function isValid(str) {
    return /^[a-z\d\-_\s]+$/i.test(str);
  }
  /* 
  function : addClient

  event : click #addclientbutton
  
  Takes no parameters. Use the information entered in the client name and abbreviation inputs
  to create a new client. Before creating a new client, checks the abbrevation and the name are unique
  */
  function addClient() {
    var clients = [],
      nameUnique = true,
      abbreviationUnique = true,
      dynamicData = {};

    clients = DOM.$clienttablebody.find("tr");

    dynamicData["name"] = DOM.$clientnameinput.val();
    dynamicData[
      "abbreviation"
    ] = DOM.$clientabbreviationinput.val().toUpperCase();
    dynamicData["position"] = clients.length + 1;

    if (
      dynamicData["name"] !== "" &&
      dynamicData["abbreviation"] !== "" &&
      isValid(dynamicData["name"]) &&
      isValid(dynamicData["abbreviation"])
    ) {
      clients.each(function() {
        {
          if ($(this).attr("data-name") == dynamicData["name"]) {
            nameUnique = false;
          }
          if (
            $(this).attr("data-abbreviation") == dynamicData["abbreviation"]
          ) {
            abbreviationUnique = false;
          }
        }
      });
      if (nameUnique) {
        if (abbreviationUnique) {
          addClientToDB(dynamicData).done(function(data) {
            renderClient(JSON.parse(data));
            DOM.$clientnameinput.val(null);
            DOM.$clientabbreviationinput.val(null);
          });
        } else {
          alert("Abbreviation is not unquie");
        }
      } else {
        alert("Name is not unquie");
      }
    } else {
      alert("Please enter name and abbreviation");
    }
  }

  /* 
  function : deleteClient

  event : click .remove-client-btn
  
  Takes no parameters. Delete parent client of a clicked remove client button. 
  */

  function deleteClient($clientRow) {
    var dynamicData = {};

    dynamicData["id"] = $clientRow.attr("data-id");

    //Ajax function to remove from database
    deleteClientFromDB(dynamicData).done(function() {
      $clientRow.remove(); //Remove the closest table row to the button
    });
  }

  function deleteAllClients() {
    var $clientRows;
    $clientRows = DOM.$clienttablebody.find("tr");
    $clientRows.each(function() {
      deleteClient($(this));
    });
  }

  function checkClientAbbreviationUnique(abbreviation) {
    var unique = true;

    DOM.$clienttablebody.find("tr").each(function() {
      console.log(abbreviation + $(this).attr("data-abbreviation"));
      if (abbreviation == $(this).attr("data-abbreviation")) {
        console.log("Duplicate");
        unique = false;
      }
    });

    return unique;
  }

  //Triggers on the blur of a client abbreviation input
  function updateClientAbbreviation($input) {
    var dynamicData = {},
      $clientRow = {},
      orginalAbbreviation = "";

    $clientRow = $input.closest("tr");
    orginalAbbreviation = $clientRow.attr("data-abbreviation");
    dynamicData["abbreviation"] = $input.val().toUpperCase();

    //Check if the name has actually changed
    if (dynamicData["abbreviation"] == orginalAbbreviation) {
      $input.val(orginalAbbreviation);
    }
    //Check abbreviation is not more than 3 characters
    else if (dynamicData["abbreviation"].length > 3) {
      alert("Sorry, your client abbrevation can't be more than 3 characters.");
      $input.val(orginalAbbreviation);
    }
    //If abbreviation is 0 characters
    else if (dynamicData["abbreviation"].length <= 0) {
      alert("Sorry, your client has to have an abbrevation.");
      $input.val(orginalAbbreviation);
    }
    //Check abbreviation unique
    else if (
      checkClientAbbreviationUnique(dynamicData["abbreviation"]) == false
    ) {
      alert("Sorry, your client abbrevation has to be unique.");
      $input.val(orginalAbbreviation);
    }
    //If new abreivation is valid
    else {
      $input.val(dynamicData["abbreviation"]);
      $clientRow.attr("data-abbreviation", dynamicData["abbreviation"]);
      dynamicData["id"] = $clientRow.attr("data-id");
      updateClientAbbreviationInDB(dynamicData).done();
    }
  }

  /* ================= private AJAX methods =============== */
  function updateClientNameInDB(dynamicData) {
    return $.post("php/clients/updateClientName.php", {
      dynamicData: dynamicData
    });
  }

  function updateClientAbbreviationInDB(dynamicData) {
    return $.post("php/clients/updateClientAbbreviation.php", {
      dynamicData: dynamicData
    });
  }

  function updateClientColourInDB(dynamicData) {
    return $.post("php/clients/updateClientColour.php", {
      dynamicData: dynamicData
    });
  }

  function addClientToDB(dynamicData) {
    return $.post("php/clients/addNewClient.php", {
      dynamicData: dynamicData
    });
  }

  function deleteClientFromDB(dynamicData) {
    return $.post(
      "php/clients/removeClient.php", //Request data from server using POST, url is removeClient.php
      {
        dynamicData: dynamicData
      }
    );
  }

  /* =================== public methods ================== */
  // main init method
  function init(clients) {
    cacheDom();
    bindEvents();
    render(clients);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
