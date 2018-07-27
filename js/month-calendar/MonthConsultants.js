var MonthConsultants = (function() {
  var consultants = [];

  add = function(consultant) {
    consultants.push(new MonthConsultant(consultant));
  };

  empty = function() {
    consultants = [];
  };

  getRows = function() {
    var $rowElements = []; //Initialise variable

    for (x in consultants) {
      $rowElements.push(consultants[x].getRow());
    }
    return $rowElements;
  };

  removeAllocation = function() {
    

  };

  return {
    add: add,
    getRows: getRows,
    empty: empty
  };
})();
