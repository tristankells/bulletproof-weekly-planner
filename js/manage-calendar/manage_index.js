function getClientsAndConsultants() {
  return $.get("php/getConsultantsAndClients.php");
}

function setupManagePage(theme) {
  getClientsAndConsultants().done(function(data) {
    var databaseResults = [],
      clients = [],
      consultants = [];

    databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server
    consultants = databaseResults.consultants; //Store array of consultants
    clients = databaseResults.clients; //Store array of clients
    ClientModule.init(clients);
    ConsultantModule.init(consultants);
    ThemeModule.init(theme, $("#consultantstablebody"), $("#clienttablebody"));
  });
}
