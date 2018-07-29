var MonthClientsModule = (function() {
  /*=========== private variables ==========*/

  //Initiliase array of clients
  var clients = [],
    DOM = {};

  /*=========== private methods ==========*/

  //Cache DOM elements
  function cacheDom() {
    DOM.$clienttablebody = $("#clienttablebody");
    DOM.$custommenu = $(".custom-menu");
  }

  /*=========== public methods ==========*/

  /*
   Empties the client array stored in the module
   */
  function empty() {
    clients = [];
  }

  /*
  Returns <tr> elements for every client in the module array
  */
  function renderTableRows() {
    for (x in clients) {
      DOM.$clienttablebody.append(clients[x].getRow());
    }
  }

  /*
  Return <li> elemnts for every client in the module array
  */
  function renderListItems() {
    for (x in clients) {
      DOM.$custommenu.append(clients[x].getListItem());
    }
    DOM.$custommenu.append("<li data-action='0' data-flag='1'>Delete</li>");
  }

  function init(data) {
    cacheDom();
    for (x in data) {
      clients.push(new MonthClient(data[x]));
    }

    renderTableRows();
    renderListItems();
  }

  /*=========== export public methods ==========*/

  return {
    init: init,
    empty: empty
  };
})();
