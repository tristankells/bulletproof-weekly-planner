function MonthConsultant(consultant) {
  this.id = consultant["id"];
  this.full_name = consultant["full_name"];
  this.job_title = consultant["job_title"];
  this.board_position = consultant["board_position"];
  this.monthly_allocations = consultant["monthly_allocations"];
  this.week_allocations = consultant["week_allocations"];


  //Return a new HTML row representing a consultant on the monthly calendar
  this.getRow = function() {
    var row = {}; //Initialise variable

    row = $("<tr></tr>") //Create new table row
      .data("id", this.id); //Add consultant id to row
    row.append($("<td></td>").html(this.full_name)); //Add client name colunm

    //Add all allocated  clients from the weekly view to the this week colunm
    var weekClientNames = "";
    for (x in this.week_allocations) {
      if (
        !(this.week_allocations[x]["allocated_to"] == "Open") &&
        !(this.week_allocations[x]["allocated_to"] == "Leave")
      ) {
        weekClientNames += this.week_allocations[x]["allocated_to"] + " ";
      }
    }
    row.append($("<td></td>").html(weekClientNames));

    //Loop through weeks in month, and check existing allocations
    for (var i = 2; i <= 4; i++) {
      var clientNames = "",
        allocations = [];

      allocations = getAllocations(this.monthly_allocations, i);
      if (allocations) {
        for (x in allocations) {
          clientNames += allocations[x]["allocated_to"] + " ";
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
