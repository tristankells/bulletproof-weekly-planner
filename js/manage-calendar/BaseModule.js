var BaseModule = (function() {

    /*
    function: changeName

    Parameters: AJAX function that point to the file updateClientName.php
    or the file updateConsultantName.php


    
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
      updateDbFunction(dynamicData).done(function(data) {
      });
    } else {
    }
  }

  return {
    changeName: changeName
  };
})();
