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
    DOM.$addconsultantbutton.click(function() {
      addConsultant();
    });

    DOM.$consultantnameinput.on("keyup", function(e) {
      if (e.keyCode === 13) {
        this.blur();
        addConsultant();
      }
    });

    DOM.$consultantroleinput.on("keyup", function(e) {
      if (e.keyCode === 13) {
        this.blur();
        addConsultant();
      }
    });

    DOM.$consultanttablebody.on("click", ".remove-consultant-btn", function() {
      ConfirmModule.Confirm(
        "Delete Consultant",
        "This will delete <span class='confirm-name'>" +
          $(this)
            .closest("tr")
            .attr("data-name") +
          "</span> and all associated allocations, are you sure you want to do this?",
        "Yes",
        "Cancel",
        deleteConsultant,
        $(this).closest("tr")
      );
    });

    DOM.$consultanttablebody.on("blur", ".consultant-name-input", function() {
      ManageFunctionsModule.changeName(updateConsultantNameInDB);
    });

    DOM.$consultanttablebody.on("keyup", ".consultant-name-input", function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    DOM.$consultanttablebody.on("blur", ".consultant-role-input", function() {
      updateConsultantRole($(this));
    });

    DOM.$consultanttablebody.on("keyup", ".consultant-role-input", function(e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    DOM.$removeAllConsultantsButton.click(function() {
      ConfirmModule.Confirm(
        "Delete All",
        "This will delete all consultants and thier associated allocations, are you sure you want to do this?",
        "Yes",
        "Cancel",
        deleteAllConsultants,
        null
      );
    });
  }

  function renderConsultant(consultant) {
    var $rowElement = $();
    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["name"])
      .attr("data-role", consultant["role"]);

    //Add consultant name colunm
    $rowElement.append(
      $("<td></td>")
        .addClass("custom-dark-bg")
        .append(
          $("<input></input>")
            .addClass("consultant-name-input")
            .val(consultant["name"])
        )
    );

    //Add consultant role colunm
    $rowElement.append(
      $("<td></td>")
        .addClass("white-bg")
        .append(
          $("<input></input>")
            .addClass("consultant-role-input")
            .val(consultant["role"])
        )
    );

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

    if (dynamicData["name"] !== "" && isValid(dynamicData["name"])) {
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

  function updateConsultantRole($input) {
    var dynamicData = {},
      $consultantRow = {},
      orginalRole = "";

    $consultantRow = $input.closest("tr");
    orginalRole = $consultantRow.attr("data-role");
    dynamicData["role"] = $input.val();

    if (dynamicData["role"] == orginalRole) {
      //DO NOTHING
    } else {
      dynamicData["id"] = $input.closest("tr").attr("data-id");
      $consultantRow.attr("data-role", dynamicData["role"]);
      updateConsultantRoleInDB(dynamicData).done();
    }
  }

  /* ================= private AJAX methods =============== */

  function updateConsultantNameInDB(dynamicData) {
    return $.post("php/consultants/updateConsultantName.php", {
      dynamicData: dynamicData
    });
  }

  function updateConsultantRoleInDB(dynamicData) {
    return $.post("php/consultants/updateConsultantRole.php", {
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
  function init(consultants) {
    cacheDom();
    bindEvents();
    render(consultants);
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
