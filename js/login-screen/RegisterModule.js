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
    DOM.$registerFormButton.click( function() {
        animateLoginFormTransition(
            $(this)
              .closest("div")
              .add(".register-form")
          )
    }
        
       
    )
  }
  // handle click events
  function handleRegisterButtonClick() {
    var dynamicData = {};

    dynamicData["firstName"] = DOM.$firstNameInput.val();
    dynamicData["lastName"] = DOM.$lastNameInput.val();
    dynamicData["password"] = DOM.$passwordInput.val();
    dynamicData["rePassword"] = DOM.$rePasswordInput.val();
    dynamicData["email"] = DOM.$emailInput.val();

    if (checkNoInputIsEmpty(dynamicData)) {
      if (isEmail(dynamicData["email"])) {
        if (dynamicData["password"] == dynamicData["rePassword"]) {
          attemptRegisterNewUser(dynamicData).done(function(data) {
            if (data == "success") {
              window.location.href = "./index.php";
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

  function checkNoInputIsEmpty(dynamicData) {
      var x = 0;
    for (x in dynamicData) {
      if (dynamicData[x].length == 0) {
        return false;
      }
    }
    return true;
  }



  /* =================== private AJAX methods ================= */

  function attemptRegisterNewUser(dynamicData) {
    return $.post("php/user-profile/register.php", {dynamicData : dynamicData});
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
   function animateLoginFormTransition() {}

   function isEmail() {}

  /* =============== export public methods =============== */
  return {
    init: init,
  };
})();
