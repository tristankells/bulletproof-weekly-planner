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

    if (theme === 1) {
      $("input#one").prop("checked", true);
    }

    bindEvents();

    //Using the jquery UI library, makes items within tbody elements sortable
    //THE START OF POSITION TRACKING FUNCTIONALITY NEED TO BE EXPANDED UPON
    //https://www.youtube.com/watch?v=V1nYMDoSCXY
    $("#clienttablebody").sortable({
      update: function(event, ui) {
        $(this)
          .children()
          .each(function(index) {
            if ($(this).attr("data-position") != index + 1) {
              $(this)
                .attr("data-position", index + 1)
                .addClass("client-updated");
            }
          });
        saveNewClientPositions();
      }
    });
  });

  function bindEvents() {
    $("input#one").change(function() {
      // console.log($(this).prop("checked"));
      updateTheme($(this).prop("checked"));
    });
  }

  function updateTheme(checked) {
    var theme = 0;
    if (checked) {
      theme = 1;
    } else {
      theme = 0;
    }

    updateThemeInDB(theme).done(function(data) {
      console.log(data);
      console.log("Updated in db");
    });
  }

  function updateThemeInDB(theme) {
    return $.post("php/user-profile/updateTheme.php", { theme: theme });
  }
}
