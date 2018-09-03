var ManageFunctionsModule = (function() {
  /* =================== private methods ================== */
  
  /*
    function: checkNameUnique

    Parameters: name, string containing a consultant or clients name
                $row, a client/consultant <tr>
     
    Called by changeName. Returns true if the name is unquie withins it's table            
  */

  //Takes a name and a table row. Check all of that's rows siblings names. If one sibling mathces the name, return false
  function checkNameUnique(name, $row) {
    var unique = true;

    $row.siblings("tr").each(function() {
      if (name == $(this).attr("data-name")) {
        unique = false;
      }
    });

    return unique;
  }

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
      $input = {},
      originalName = "";

    $input = $(event.target);
    $row = $input.closest("tr");
    dynamicData["name"] = $(event.target).val();

    originalName = $row.attr("data-name");
    if (dynamicData["name"] == originalName) {
      //Do nothing
    } else if (checkNameUnique(dynamicData["name"], $row) == false) {
      alert("Please enter a unique name.");
      $input.val(originalName);
    } else {
      dynamicData["id"] = $row.attr("data-id");
      updateDbFunction(dynamicData).done();
    }
  }
  return {
    changeName: changeName
  };
})();
