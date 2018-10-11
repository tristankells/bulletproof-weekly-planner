var WeekAllocationModule = (function() {
  "use strict";

  /* =================== private methods ================= */

  //Takes a allocation object, and returns a allocation <div> containing that allocation's data

  //Takes a string representing a client abbreviation and returns a client abbreviation <div>, one part of the allocation <div>
  function getAllocationClientAbbreviationDiv(clientAbbreviation) {
    var $clientAbbreviationDiv = {},
      $clientAbbreviationSpan = {};

    $clientAbbreviationDiv = $("<div></div>").addClass("client-div");

    $clientAbbreviationSpan = $("<span></span>")
      .addClass("client-span")
      .html(clientAbbreviation);

    return $clientAbbreviationDiv.append($clientAbbreviationSpan);
  }

  //Takes a int representing office status and returns a office status <div>, one part of the allocation <div>
  function getAllocationOfficeStatusDiv(officeStatus) {
    var $officeStatusDiv = {};

    $officeStatusDiv = $("<div></div>").addClass("location-div");

    if (officeStatus == 1) {
      $officeStatusDiv.append($("<i></i>").addClass("fas fa-plane away-icon"));
    }

    if (officeStatus == 2) {
      $officeStatusDiv.append($("<i></i>").addClass("fas fa-home home-icon"));
    }

    if (officeStatus == 4) {
      $officeStatusDiv.append($("<i></i>").addClass("fas fa-handshake home-icon"));
    }

    return $officeStatusDiv;
  }

  /* =================== public methods ================== */

  //Takes a int represeting col index, and an allocation (or null). Returns a
  function getAllocationTd(i, allocation) {
    var $allocationTd = {};

    $allocationTd = $("<td></td>")
      .attr("data-slot", i)
      .attr("data-office", 0)
      .attr("data-id", 0)
      .attr("data-colour", 0)
      .attr("data-abbreviation", "")
      .addClass("allocation-col table-bordered force-height");

    //If there is an allocation, change the element attributes to match the allocation
    if (allocation) {
      $allocationTd.attr("data-office", allocation["officeStatus"]);

      //If the allocation includes a client, update those attributes of the element
      if (allocation["clientID"] != null) {
        $allocationTd
          .attr("data-colour", allocation["colour"])
          .attr("data-id", allocation["clientID"])
          .attr("data-abbreviation", allocation["abbreviation"]);
      }
    }

    //If the allocation is NOT LEAVE, then render the allocation divs
    if (allocation["officeStatus"] != 3) {
      if (allocation["officeStatus"] !=5) {
        $allocationTd.append(getAllocationDiv(allocation));
      }
    }

    if (allocation["officeStatus"] == 5) {
      $allocationTd.append($("<i></i>").addClass("fas fa-laptop fa-2x laptop-icon"));
    }

    return $allocationTd;
  }

  function getAllocationDiv(allocation) {
    var $colourDiv = {},
      $clientAbbreviationDiv = {},
      $officeStatusDiv = {};

    $colourDiv = $("<div></div>").addClass("colour-div");
    $clientAbbreviationDiv = getAllocationClientAbbreviationDiv(
      allocation["abbreviation"]
    );
    $officeStatusDiv = getAllocationOfficeStatusDiv(allocation["officeStatus"]);

    return $colourDiv.add($clientAbbreviationDiv).add($officeStatusDiv);
  }

  /* =============== export public methods =============== */
  return {
    getAllocationDiv: getAllocationDiv,
    getAllocationTd: getAllocationTd
  };
})();
