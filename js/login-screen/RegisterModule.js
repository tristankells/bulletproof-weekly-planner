var RegisterModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$registerButton = $("#register-button");
    DOM.$firstNameInput = $("#register-firstname-input");
    DOM.$lastNameInput = $("#register-lastname-input");
    DOM.$passwordInput = $("#register-password-input");
    DOM.$rePasswordInput = $("#register-repassword-input");
    DOM.$emailInput = $("#register-email-input");
  }
  // bind events
  function bindEvents() {
    DOM.$registerButton.click(handleRegisterButtonClick);
  }
  // handle click events
  function handleRegisterButtonClick() {
    var dynamicData = "";

    dynamicData["firstName"] = DOM.$firstNameInput.val();
    dynamicData["lastName"] = DOM.$lastNameInput.val();
    dynamicData["password"] = DOM.$passwordInput.val();
    dynamicData["rePassword"] = DOM.$rePasswordInput.val();
    dynamicData["email"] = DOM.$emailInput.val();

    if (checkNoInputIsEmpty(dynamicData)) {
      if (isEmail(dynamicData["email"])) {
        if (dynamicData["password"] == dynamicData["rePassword"]) {
          attemptRegisterNewUser(dynamicData).done(function(data) {
            alert(data);
          });
        } else {
          alert("Password dont match, please re-enter");
          DOM.$passwordInput.val("");
          DOM.$rePasswordInput.val("");
        }
      } else {
        alert("Please enter valid email");
      }
    } else {
      alert("Please enter all fields");
    }
  }

  function checkNoInputIsEmpty(dynamicData) {
    for (x in dynamicData) {
      if (dynamicData[x].length == 0) {
        return false;
      }
    }
    return true;
  }

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  /* =================== private AJAX methods ================= */

  function attemptRegisterNewUser(dynamicData) {
    return $.post("php/register.php", dynamicData);
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
