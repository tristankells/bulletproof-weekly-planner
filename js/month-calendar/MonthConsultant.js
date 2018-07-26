function MonthConsultant(consultant) {
  this.id = consultant["id"];
  this.full_name = consultant["full_name"];
  this.job_title = consultant["job_title"];
  this.board_position = consultant["board_position"];
  this.allocations = consultant["allocations"];

  //Return a new HTML row representing a consultant on the monthly calendar
  this.getRow = function() {
    var row = {}; //Initialise variable

    row = $("<tr></tr>") //Create new table row
      .data("id", this.id); //Add consultant id to row
    row.append($("<td></td>").html(this.full_name)); //Add client name colunm

    //Loop through weeks in month, and check existing allocations
    for (var i = 1; i <= 4; i++) {
      var clientNames = "",
        allocations = [];

      allocations = getAllocations(consultant["allocations"], i);
      if (allocations) {
        for (x in allocations) {
          clientNames += allocations[x]["full_name"] + " ";
        }
      }
      row.append(
        $("<td></td>")
          .html(clientNames)
          .addClass("allocation")
      );
    }
    return row;
  };

  function getAllocations(allocations, col) {
    var returnAllocations = [];

    for (y in allocations) {
      allocation = allocations[y];
      if (allocation["allocation_slot"] == col) {
        //if column is matching
        returnAllocations.push(allocation);
      }
    }
    return returnAllocations;
  }
}
