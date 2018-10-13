
  setUpMonthCalendar();

  function getClientsAndConsultants() {
    return $.get("php/getConsultantsAndClients.php");
  }

  function setUpMonthCalendar(theme) {
    getClientsAndConsultants().done(function(data) {
      //Store consultant and client arrays recieved from server
      var databaseResults = JSON.parse(data);

      MonthClientsModule.init(databaseResults.clients);
      MonthConsultantsModule.init(databaseResults.consultants);
      ThemeModule.init();

    });
  }

