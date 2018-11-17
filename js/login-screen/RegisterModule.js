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
    DOM.$registerFormButton = $(".register-form-btn");
  }

  // bind events
  function bindEvents() {
    DOM.$registerButton.click(handleRegisterButtonClick);
    DOM.$registerFormButton.click(function() {
      SharedLoginFunctionsModule.animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".register-form")
      );
    });
  }

  // handle event when register button clicked
  function handleRegisterButtonClick() {
    //Store the data entred by the user into the registeration form
    var registrationData = {
      firstName: DOM.$firstNameInput.val(),
      lastName: DOM.$lastNameInput.val(),
      password: DOM.$passwordInput.val(),
      rePassword: DOM.$rePasswordInput.val(),
      email: DOM.$emailInput.val()
    };

    if (checkNoInputIsEmpty(registrationData)) {
      if (isEmail(registrationData["email"])) {
        if (registrationData["password"] == registrationData["rePassword"]) {
          attemptRegisterNewUser(registrationData).done(function(data) {
            if (data == "success") {
              alert(
                "Success. New user account created. Navigating back to your account"
              );
              location.href = "index.php";
            } else {
              alert(data);
            }
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

  //Return true if each element in the array is not empty
  function checkNoInputIsEmpty(dynamicData) {
    for (x in dynamicData) {
      if (dynamicData[x].length == 0) {
        return false;
      }
    }
    return true;
  }

  /* =================== private AJAX methods ================= */
  function attemptRegisterNewUser(dynamicData) {
    return $.post("php/user-profile/register.php", {
      dynamicData: dynamicData
    });
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
