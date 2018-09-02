var ManageFunctionsModule = (function() {
  /* =================== public methods ================== */

  /*
    function: changeName

    Parameters: AJAX function that point to the file updateClientName.php
    or the file updateConsultantName.php.
    
    Triggered from blur event on a name input box. Sends new name information
     for a client or consultant to be updated in the database
    */

  function changeName(updateDbFunction) {
    var dynamicData = {},
      $row = {},
      originalName = "";

    $row = $(event.target).closest("tr");
    dynamicData["name"] = $(event.target).val();

    originalName = $row.attr("data-name");
    if (dynamicData["name"] != originalName) {
      dynamicData["id"] = $row.attr("data-id");
      updateDbFunction(dynamicData).done(function(data) {});
    } else {
      
    }
  }

  return {
    changeName: changeName
  };
})();
