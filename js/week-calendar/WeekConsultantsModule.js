var WeekConsultantModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$consultantstablebody = $("#consultantstablebody");
  }
  // bind events
  function bindEvents() {
    DOM.$someElement.click(handleClick);
  }
  // handle click events
  function handleClick(e) {
    render(); // etc
  }

  function renderConsultant(consultant) {
    var $rowElement = {};
    $allocationElement = {};

    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["name"])
      .attr("data-role", consultant["role"])
      .attr("data-position", consultant["position"]);

    //Append name and role column
    $rowElement.append(
      $("<td></td>")
        .addClass("consultant-header")
        .html(consultant["name"])
        .append(
          $("<div></div>")
            .addClass("rolediv")
            .html(consultant["role"])
        )
        .append(
          $("<div></div>")
            .addClass("draggable-icon")
            .append(
              $("<a></a>")
                .attr("href", "#")
                .append($("<i></i>").addClass("fas fa-ellipsis-v"))
            )
        )
    );

    //append allocation columns
    for (i = 0; i < 10; i++) {
      $columnElement = $("<td></td>");

      if (i % 2 == 1) {
        $allocationElement.addClass("row-space");
      }

      $selectElement = $("<select></select>").addClass(
        "dropdown clientdropdown"
      );

      for (x in consultant["allocations"]) {
        if (consultant["allocations"][x]["allocationslot"] == i) {
          switch (allocation["officestatus"]) {
            case "1":
              $selectElement.attr("data-office", 1);
              break;
            case "2":
              $selectElement.attr("data-office", 2);
              break;
            case "0":
              $selectElement.attr("data-office", 0);
              break;
          }
        }
      }
      $optionElement = $("<option></option>").val("Open");
      $selectElement.append($optionElement);

      $optionElement = $("<option></option>")
        .val("Leave")
        .html("Leave");
      for (x in consultant["allocations"]) {
        if (consultant["allocations"][x]["allocationslot"] == i) {
          if (consultant["allocations"][x]["allocatedto"] == "Leave") {
            $optionElement.attr("selected", "selected");
          }
        }
      }

      $selectElement.append($optionElement);

      var abbreviation = "";
      for (x in clients) {
        abbreviation = clients[x]["abbreviation"];

        $optionElement = $("<option></option>")
          .val(abbreviation)
          .html(abbreviation);

        var allocation = {};
        for (z in consultant["allocations"]) {
          allocation = consultant["allocations"][x];
          if (
            allocation["allocatedto"] == abbreviation &&
            allocation["allocationslot"] == i
          ) {
            $optionElement.attr("selected", "selected");
          }
        }
      }

      $rowElement.append($allocationElement);
    }

    $rowElement.append(
      $("<td></td>").append(
        $("<input></input>")
          .attr("type", "image")
          .attr("src", "/Glance/img/clear.png")
          .addClass("clear-consultant-btn remove-add-btn")
      )
    );

    DOM.$consultantstablebody.append($rowElement);
  }
  // render DOM
  function render() {}

  /* =================== public methods ================== */
  // main init method
  function init(consultans, clients) {
    cacheDom();
    bindEvents();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
