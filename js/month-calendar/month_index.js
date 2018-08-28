$(document).ready(function() {
  setUpMonthCalendar();

  function getClientsAndConsultants() {
    return $.get("php/getConsultantsAndClients_month.php");
  }

  function setUpMonthCalendar() {
    getClientsAndConsultants().done(function(data) {
      var databaseResults = [],
        clients = [],
        consultants = [];

      databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server

      consultants = databaseResults.consultants; //Store array of consultants
      clients = databaseResults.clients; //Store array of clients
      MonthClientsModule.init(clients);
      MonthConsultantsModule.init(consultants);
    });
  }
});
