var LoginModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$loginButton = $("#login-button");
    DOM.$emailInput = $("#email-input");
    DOM.$passwordInput = $("#password-input");
    DOM.$stayingLoggedIn = $("#stayingLoggedIn");
    DOM.$loginForm = $("#login-form");
    DOM.$loginFormButton = $(".login-form-btn");
  }

  // bind events
  function bindEvents() {
    DOM.$loginForm.submit(function(e) {
      e.preventDefault(e);
      handleLoginButtonClick();
    });

    DOM.$loginFormButton.click(function() {
      SharedLoginFunctionsModule.animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".login-form")
      );
    });
  }

  // handle click events
  function handleLoginButtonClick() {
    attemptLoginDB(retrieveLoginInfoEntered()).done(function(data) {
      if (data == "success") {
        window.location.href = "week-calendar.php";
      } else {
        DOM.$emailInput.val("");
        DOM.$passwordInput.val("");
      }
    });
  }

  //Retrieve user entered data from the DOM return
  function retrieveLoginInfoEntered() {
    return {
      email: DOM.$emailInput.val(),
      password: DOM.$passwordInput.val(),
      stayingLoggedIn: DOM.$stayingLoggedIn.prop("checked")
    };
  }

  /* =================== private AJAX methods ================= */
  function attemptLoginDB(dynamicData) {
    return $.post("php/user-profile/login.php", { dynamicData: dynamicData });
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
