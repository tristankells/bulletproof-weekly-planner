var LoginModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$loginForm = $(".login-form");
    DOM.$loginButton = $("#login-button");
    DOM.$emailInput = $("#email-input");
    DOM.$passwordInput = $("#password-input");
    DOM.$loginFormButton = $(".login-form-btn");
  }
  // bind events
  function bindEvents() {
    DOM.$loginButton.click(handleLoginButtonClick);

    DOM.$loginFormButton.click(function() {
      animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".login-form")
      );
    });
  }
  // handle click events
  function handleLoginButtonClick() {
    var dynamicData = {};

    dynamicData = retrieveLoginInfoEntered();

    attemptLoginDB(dynamicData).done(function(data) {
      if (data == "success") {
        window.location.href = "week-calendar.php";
      } else {
        alert(data);
        DOM.$emailInput.val("");
        DOM.$passwordInput.val("");
      }
    });
  }

  function retrieveLoginInfoEntered() {
    var email = "",
      password = "";

    email = DOM.$emailInput.val();
    password = DOM.$passwordInput.val();

    return { email: email, password: password };
  }

  function animateLoginFormTransition() {}

  function isEmail() {}

  /* =================== private AJAX methods ================= */
  function attemptLoginDB(dynamicData) {
    return $.post("php/login.php", { dynamicData: dynamicData });
  }

  /* =================== public methods ================== */
  // main init method
  function init(SharedFunctions) {
    cacheDom();
    bindEvents();
    isEmail = SharedFunctions.isEmail;
    animateLoginFormTransition = SharedFunctions.animateLoginFormTransition;
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
