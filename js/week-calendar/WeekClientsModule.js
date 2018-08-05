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
    DOM.$clientdropdown = $(".clientdropdown");
  }

  /*=========== public methods ==========*/

  function bindEvents() {}

  /*
     Empties the client array stored in the module
     */
  function empty() {
    moduleClients = [];
    consultants = [];
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
      moduleClients.push(new WeekClient(clients[x], consultants));
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
