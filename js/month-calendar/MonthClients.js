var MonthClients = (function() {
  var clients = [];

  add = function(client) {
    clients.push(new MonthClient(client));
  };

  empty = function() {
    clients = [];
  };

  getRows = function() {
    var $rowElements = []; //Initialise variable

    for (x in clients) {
      $rowElements.push(clients[x].getRow());
    }
    return $rowElements;
  };

  //Return a list item element for all clients
  getListItems = function() {
    var $listItemElements = []; //Initialise variable

    for (x in clients) {
      $listItemElements.push(clients[x].getListItem());
    }

    return $listItemElements;
  };

  return {
    add: add,
    getRows: getRows,
    getListItems: getListItems,
    empty : empty
  };
})();
