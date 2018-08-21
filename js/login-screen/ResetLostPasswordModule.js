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
      animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".reset-form")
      );
    });
  }
  // handle click events
  function handleResetPasswordButtonClick() {
    var email = "";

    email = DOM.$resetEmailInput.val();
    if (isEmail(email)) {
      alert("Email adress is valid");
      resetPasswordDB(email).done(function(data) {
        alert(data);
      });
    } else {
      alert("Please enter a valid email address");
    }
  }

  function isEmail() {}

  function animateLoginFormTransition() {}

  /* =================== private AJAX methods ================= */

  function resetPasswordDB(email) {
    return $.post("php/forgottenPassword.php", { email: email });
  }

  /* =================== public methods ================== */
  // main init method
  function init(SharedFunctions) {
    cacheDom();
    bindEvents();
    isEmail = SharedFunctions.isEmail;
    animateLoginFormTransition = SharedFunctions.animateLoginFormTransition;
  }

  //Inherited function from login-screen/app.js


  /* =============== export public methods =============== */
  return {
    init: init,
    isEmail: isEmail,
    animateLoginFormTransition: animateLoginFormTransition
  };
})();
