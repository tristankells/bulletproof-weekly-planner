function initialiseTables(theme) {
  $.get("php/getConsultantsAndClients.php", function(data) {
    var databaseResults = [],
      clients = [],
      consultants = [];

    databaseResults = JSON.parse(data); //Store consultant and client arrays recieved from server

    consultants = databaseResults.consultants; //Store array of consultants

    clients = databaseResults.clients; //Store array of clients

    WeekClientsModule.init(clients);
    WeekConsultantStorageModule.init(consultants);
    WeekConsultantModule.init(consultants);

    ThemeModule.init(theme, $("#consultantstablebody"), $("#clientstable"));
    $();

    //Using the jquery UI library, makes items within tbody elements sortable
    //THE START OF POSITION TRACKING FUNCTIONALITY NEED TO BE EXPANDED UPON
    //https://www.youtube.com/watch?v=V1nYMDoSCXY
  });
}
