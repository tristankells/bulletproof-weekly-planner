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
  }
  // bind events
  function bindEvents() {
    DOM.$addconsultantbutton.click(addConsultant);

    DOM.$consultanttablebody.on(
      "click",
      ".remove-consultant-btn",
      deleteConsultant
    );
  }

  function renderConsultant(consultant) {
    var $rowElement = $();
    //Begin new consultant row
    $rowElement = $("<tr></tr>")
      .attr("data-id", consultant["id"])
      .attr("data-name", consultant["full_name"])
      .attr("data-role", consultant["job_title"]);

    //Add consultant name colunm
    $rowElement.append($("<td></td>").html(consultant["full_name"]));

    //Add consultant role colunm
    $rowElement.append($("<td></td>").html(consultant["job_title"]));

    //Add remove consultant button
    $rowElement.append(
      $("<td></td>")
        .css({
          "vertical-align": "middle",
          "text-align": "center",
          border: "none"
        })
        .append(
          $("<input></input>")
            .attr("type", "image")
            .attr("src", "/Glance/img/remove.png")
            .attr("data-id", consultant["id"])
            .addClass("remove-consultant-btn remove-add-btn")
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

  function addConsultant() {
    var consultants = [],
      nameUnique = true,
      dynamicData = {};

    consultants = DOM.$consultanttablebody.find("tr");

    dynamicData["name"] = DOM.$consultantnameinput.val();
    dynamicData["role"] = DOM.$consultantroleinput.val();
    dynamicData["position"] = consultants.length + 1;

    if (dynamicData["name"] !== "" && dynamicData["role"] !== "") {
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
        alert("Name is not unquie");
      }
    } else {
      alert("Please enter name and role");
    }
  }

  function deleteConsultant() {
    if (confirm("Press OK to delete consultant information")) {
      var consultantRow = {},
        dynamicData = {};

      consultantRow = $(event.target).closest("tr");
      dynamicData["id"] = consultantRow.attr("data-id");

      //Ajax function to remove from database
      deleteConsultantFromDB(dynamicData).done(function() {
        consultantRow.remove(); //Remove the closest table row to the button
      });
    }
  }

  /* ================= private AJAX methods =============== */

  function addConsultantToDB(dynamicData) {
    return $.post("php/addNewConsultant.php", {
      dynamicData: dynamicData
    });
  }

  function deleteConsultantFromDB(dynamicData) {
    return $.post(
      "php/removeConsultant.php", //Request data from server using POST, url is removeClient.php
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
