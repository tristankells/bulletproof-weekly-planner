$(document).ready(function() {
  function getClientsAndConsultants() {
    return $.get("php/getConsultantsAndClients_month.php");
  }

  getClientsAndConsultants().done(function(data) {
    var databaseResults = [],
      clients = [],
      consultants = [];

    databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server
    consultants = databaseResults.consultants; //Store array of consultants
    clients = databaseResults.clients; //Store array of clients
    ClientModule.init(clients, BaseModule);
    ConsultantModule.init(consultants, BaseModule);
  });
});
