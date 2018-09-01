var ManageFunctions = (function() {
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
      orginalName = "";

    $row = $(event.target).closest("tr");
    dynamicData["name"] = $(event.target).val();

    orginalName = $row.attr("data-name");
    if (dynamicData["name"] != orginalName) {
      dynamicData["id"] = $row.attr("data-id");
      updateDbFunction(dynamicData).done(function(data) {});
    } else {
    }
  }

  return {
    changeName: changeName
  };
})();
