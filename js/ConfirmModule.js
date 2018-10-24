var ConfirmModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  /***** Render Funcions *****/
  function render(title, msg, $true, $false) {
    $("body").prepend(
      $("<div></div>")
        .addClass("dialog-overlay")
        .append(
          $("<div></div>")
            .addClass("dialog")
            .append($("<header></header>").append($("<h3></h3>").html(title)))
            .append(
              $("<div></div>")
                .addClass("dialog-msg")
                .append($("<p></p>").html(msg))
            )
            .append(returnConfirmFooter($true, $false))
        )
    );
  }

  function returnDoButton($true) {
    return $("<button></button>")
      .addClass("button button-danger doAction")
      .append($true);
  }

  function returnCancelButton($false) {
    return $("<button></button>")
      .addClass("button button-default cancelAction")
      .append($false);
  }

  function returnConfirmFooter($true, $false) {
    return $("<footer></footer>").append(
      $("<div></div>")
        .addClass("controls")
        .append(returnDoButton($true))
        .append(returnCancelButton($false))
    );
  }



  function bindConfirmBtns(confirmFunction, element) {
    $(".doAction").click(function() {
      $(".dialog-overlay").hide();
      confirmFunction(element);
    });
    $(".cancelAction, .fa-close").click(function() {
      $(".dialog-overlay").hide();
    });
  }

  /* =================== public methods ================== */

  function Confirm(title, msg, $true, $false, confirmFunction, element) {
    render(title, msg, $true, $false);
    bindConfirmBtns(confirmFunction, element);
  }

  /* =============== export public methods =============== */
  return {
    Confirm: Confirm
  };
})();
