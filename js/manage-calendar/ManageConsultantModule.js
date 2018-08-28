var ConsultantModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$consultanttablebody = $("#consultantstablebody");
    DOM.$consultantnameinput = $("#consultantnameinput");
    DOM.$consultantroleinput = $("#consultantroleinput");
    DOM.$addconsultantbutton = $("#addconsultantbutton");
    DOM.$removeAllConsultantsButton = $("#removeallconsultantsbutton");
  }
  // bind events
  function bindEvents() {
    DOM.$addconsultantbutton.click(addConsultant);

    DOM.$consultanttablebody.on("click", ".remove-consultant-btn", function() {
      if (confirm("Press OK to delete consultant information")) {
        deleteConsultant($(this).closest("tr"));
      }
    });

    DOM.$consultanttablebody.on("blur", ".consultant-name-input", function() {
      updateConsultantName(updateConsultantNameInDB);
    });

    DOM.$consultanttablebody.on("keyup", ".consultant-name-input", function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    DOM.$removeAllConsultantsButton.click(function() {
      if (confirm("Press OK to delete all consultant information")) {
        deleteAllConsultants();
      }
    });
  }

  function updateConsultantName() {}

  function renderConsultant(consultant) {
    var $rowElement = $();
    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["full_name"])
      .attr("data-role", consultant["job_title"]);

    //Add consultant name colunm
    $rowElement.append(
      $("<td></td>")
        .addClass("custom-dark-bg")
        .append(
          $("<input></input>")
            .addClass("consultant-name-input")
            .val(consultant["full_name"])
        )
    );

    //Add consultant role colunm
    $rowElement.append($("<td></td>").html(consultant["job_title"]));

    //Add remove consultant button
    $rowElement.append(
      $("<div></div>")
        .addClass("clear-consultant-row")

        .append(
          $("<i></i>")
            .addClass(
              "clear-consultant-btn clear-row-btn fas fa-minus-square fa-2x remove-consultant-btn"
            )
            .attr("data-id", consultant["id"])
        )
    );

    DOM.$consultanttablebody.append($rowElement);
  }
  // render DOM
  function render(consultants) {
    var x = 0;
    for (x in consultants) {
      renderConsultant(consultants[x]);
    }
  }

  function isValid(str) {
    return /^[a-z\d\-_\s]+$/i.test(str);
  }
  function addConsultant() {
    var consultants = [],
      nameUnique = true,
      dynamicData = {};

    consultants = DOM.$consultanttablebody.find("tr");

    dynamicData["name"] = DOM.$consultantnameinput.val();
    dynamicData["role"] = DOM.$consultantroleinput.val();
    dynamicData["position"] = consultants.length + 1;

    if (
      dynamicData["name"] !== "" &&
      dynamicData["role"] !== "" &&
      isValid(dynamicData["name"]) &&
      isValid(dynamicData["role"])
    ) {
      consultants.each(function() {
        {
          if ($(this).attr("data-name") == dynamicData["name"]) {
            nameUnique = false;
          }
        }
      });

      if (nameUnique) {
        addConsultantToDB(dynamicData).done(function(data) {
          renderConsultant(JSON.parse(data));
          DOM.$consultantnameinput.val(null);
          DOM.$consultantroleinput.val(null);
        });
      } else {
        alert("Name is not unique");
      }
    } else {
      alert("Please enter a valid name and role");
    }
  }

  function deleteConsultant($consultantRow) {
    var dynamicData = {};

    dynamicData["id"] = $consultantRow.attr("data-id");

    //Ajax function to remove from database
    deleteConsultantFromDB(dynamicData).done(function() {
      $consultantRow.remove(); //Remove the closest table row to the button
    });
  }

  function deleteAllConsultants() {
    var $consultantRows;
    $consultantRows = DOM.$consultanttablebody.find("tr");
    $consultantRows.each(function() {
      deleteConsultant($(this));
    });
  }

  /* ================= private AJAX methods =============== */

  function updateConsultantNameInDB(dynamicData) {
    return $.post("php/consultants/updateConsultantName.php", {
      dynamicData: dynamicData
    });
  }

  function addConsultantToDB(dynamicData) {
    return $.post("php/consultants/addNewConsultant.php", {
      dynamicData: dynamicData
    });
  }

  function deleteConsultantFromDB(dynamicData) {
    return $.post(
      "php/consultants/removeConsultant.php", //Request data from server using POST, url is removeClient.php
      {
        dynamicData: dynamicData
      }
    );
  }

  /* =================== public methods ================== */
  // main init method
  function init(consultants, BaseModule) {
    cacheDom();
    bindEvents();
    render(consultants);
    updateConsultantName = BaseModule.changeName;
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
