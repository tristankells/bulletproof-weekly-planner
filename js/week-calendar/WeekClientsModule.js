var WeekClientsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase array of clients
  var moduleClients = [],
    consultants = [],
    DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$clienttablebody = $("#clienttablebody");
    DOM.$clienttable = $("#clientstable");
    DOM.$addclientbutton = $("#addclientbutton");
    DOM.$clientnameinput = $("#clientnameinput");
    DOM.$clientabbreviationinput = $("#clientabbreviationinput");
    DOM.$clientdropdown = $(".clientdropdown");
  }

  /*=========== public methods ==========*/

  function bindEvents() {
    /*=========== public methods ==========*/
    DOM.$clienttable.on("click", ".remove-client-btn", event =>
      deleteClient(event)
    );

    DOM.$addclientbutton.click(addClient);
  }

  /*
     Empties the client array stored in the module
     */
  function empty() {
    moduleClients = [];
    consultants = [];
  }

  function addClient() {
    //Add a click event to the addclientbutton
    var nameUnique = true,
      abbreviationUnique = true,
      clients = [],
      consultants = [],
      dynamicData = {};

    dynamicData["name"] = DOM.$clientnameinput.val();
    dynamicData[
      "abbreviation"
    ] = DOM.$clientabbreviationinput.val().toUpperCase();
    dynamicData["position"] = moduleClients.length + 1;

    if (dynamicData["name"] !== "" && dynamicData["abbreviation"] !== "") {
      for (x in moduleClients) {
        if (moduleClients[x].getName() == dynamicData["name"]) {
          nameUnique = false;
        }
        if (moduleClients[x].getAbbreviation() == dynamicData["abbreviation"]) {
          abbreviationUnique = false;
        }
      }

      if (nameUnique) {
        if (abbreviationUnique) {
          $.post(
            "php/addNewClient.php", //Request data from server using POST, url is addClient.php
            {
              dynamicData: dynamicData
            },
            function(data) {
              //After response is recieved from server
              var client = {};
              client = new WeekClient(JSON.parse(data));
              DOM.$clienttablebody.append(client.getRow());

              //Add the client to the list of options in allocation's dropdown
              $(".clientdropdown").append(client.getDropdownOption());
              DOM.$clientdropdown.append(client.getDropdownOption());
              moduleClients.push(client);

              DOM.$clientnameinput.val(null);
              DOM.$clientabbreviationinput.val(null);
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
  }

  /*
    Returns <tr> elements for every client in the module array
    */
  function deleteClient(event) {
    var clientRow = {},
      dynamicData = {};

    clientRow = $(event.target).closest("tr");
    dynamicData["id"] = clientRow.attr("data-id");
    dynamicData["abbreviation"] = clientRow.attr("data-abbreviation");
    dynamicData["name"] = clientRow.attr("data-name");
    $.post(
      "php/removeClient.php", //Request data from server using POST, url is removeClient.php
      {
        dynamicData: dynamicData
      },
      function() {
        $("option[value='" + dynamicData["abbreviation"] + "']").remove(); //Remove the abbreviation from the consultant dropdown
        clientRow.remove(); //Remove the closest table row to the button

        //Remove client from module array
        for (var i = moduleClients.length - 1; i >= 0; --i) {
          if (moduleClients[i].getID() == dynamicData["id"]) {
            moduleClients.splice(i, 1);
          }
        }
      }
    );
  }

  /*
    Returns <tr> elements for every client in the module array
    */
  function renderTableRows() {
    for (x in moduleClients) {
      DOM.$clienttablebody.append(moduleClients[x].getRow());
    }
  }

  /*
    Return <li> elemnts for every client in the module array
    */

  function init(clients, consultants) {
    cacheDom();
    for (x in clients) {
      moduleClients.push(new WeekClient(clients[x]));
    }

    this.moduleConsultants = consultants;

    renderTableRows();
    bindEvents();
  }

  /*=========== export public methods ==========*/

  return {
    init: init,
    empty: empty
  };
})();
