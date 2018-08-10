function WeekClient() {
 
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

    //Check string ends in a ',', if so remove it.
    if (returnString.charAt(returnString.length - 2) == ",") {
      returnString = returnString.substring(0, returnString.length - 2);
    }
    return returnString;
  };
}
