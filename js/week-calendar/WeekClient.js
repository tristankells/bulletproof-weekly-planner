function WeekClient(client, consultants) {
  this.id = client["id"];
  this.full_name = client["full_name"];
  this.abbreviation = client["abbreviation"];
  this.board_position = client["board_position"];
  this.consultants = consultants;

  this.getID = function() {
    return this.id;
  };

  this.getName = function() {
    return this.full_name;
  };

  this.getAbbreviation = function() {
    return this.abbreviation;
  };

  this.getDropdownOption = function() {
    var $optionElement = $();

    $optionElement = $("<option></option>")
      .val(this.abbreviation)
      .html(this.abbreviation);

    return $optionElement;
  };

  this.getConsultantsAllocated = function() {
    var allocations = [],
      allocation = {},
      returnString = "";

    for (x in this.consultants) {
      allocations = this.consultants[x]["allocations"];
      allocationString = "";
      for (z in allocations) {
        allocation = allocations[z];
        if (allocation["allocatedto"] == this.abbreviation) {
          if (!returnString.includes(this.consultants[x]["name"])) {
            returnString += this.consultants[x]["name"] + ", ";
          }
        }
      }

   
    }

    return returnString;
  };

  this.getRow = function() {
    var $rowElement = $(); //Initialise variable

    $rowElement = $("<tr></tr>").attr({
      "data-id": this.id,
      "data-abbreviation": this.abbreviation,
      "data-position": this.board_position,
      "data-name": this.full_name
    });

    //Add name column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format")
        .css("vertical-align", "middle")
        .append(
          $("<input></input>")
            .addClass("client-name-input")
            .val(this.full_name)
        )
    );

    //Add abbreviation column
    $rowElement.append(
      $("<td></td>")
        .addClass("client-row-format")
        .css({
          "vertical-align": "middle",
          "font-weight": "bold"
        })
        .html(this.abbreviation)
    );

    //Add allocation column

    $rowElement.append(
      $("<td></td>")
        .addClass("who-column client-row-format")
        .css("vertical-align", "middle")
        .html(this.getConsultantsAllocated())
    );

    //Add remove button
    $rowElement.append(
      $("<td></td>")
        .css({
          "vertical-align": "middle",
          "text-align": "center",
          border: "none"
        })
    );

    return $rowElement;
  };
}
