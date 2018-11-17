var ResetLostPasswordModule = (function() {
  "use strict";

  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$resetPasswordBtn = $("#reset-btn");
    DOM.$resetEmailInput = $("#reset-email-input");
    DOM.$resetFormButton = $(".reset-form-btn");
  }

  // bind events
  function bindEvents() {
    DOM.$resetPasswordBtn.click(handleResetPasswordButtonClick);
    DOM.$resetFormButton.click(function() {
      SharedLoginFunctionsModule.animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".reset-form")
      );
    });
  }

  // handle reset password button click
  function handleResetPasswordButtonClick() {
    var email = DOM.$resetEmailInput.val();
    if (SharedLoginFunctionsModule.isEmail(email)) {
      alert("Email adress is valid");
      resetPasswordDB(email).done(function(data) {
      });
    } else {
      alert("Please enter a valid email address");
    }
  }

  /* =================== private AJAX methods ================= */
  function resetPasswordDB(email) {
    return $.post("php/user-profile/forgottenPassword.php", { email: email });
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    bindEvents();
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
