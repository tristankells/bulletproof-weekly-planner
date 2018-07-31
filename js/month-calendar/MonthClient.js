function MonthClient(client) {
  this.id = client["id"];
  this.full_name = client["full_name"];
  this.abbreviation = client["abbreviation"];
  this.board_position = client["board_position"];

  /*
  Return a new HTML row representing a client on the monthly calendar
  */
  this.getRow = function() {
    var $rowElement = $(); //Initialise variable

    $rowElement = $("<tr></tr>"); //Begin row
    $rowElement.append($("<td></td>").html(this.full_name));
    return $rowElement;
  };

  /*
   Return a list item element
  */
  this.getListItem = function() {
    var $listItemElement = {}; //Initialise variable

    $listItemElement = $("<li></li>")
      .attr("data-action", this.id)
      .attr("data-name", this.full_name)
      .attr("data-abbreviation", this.abbreviation)
      .html(this.full_name);

    return $listItemElement;
  };
}
