var ResetPasswordModule = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$oldPasswordInput = $("#oldPassword");
    DOM.$newPasswordInputs = $(".new-passwords");
    DOM.$resetPasswordButton = $("#resetPasswordButton");
    DOM.$resetPasswordForm = $("#resetPasswordForm");
  }
  // bind events
  function bindEvents() {
    DOM.$resetPasswordForm.submit(function(e) {
      e.preventDefault(e);
      handleResetPasswordButtonClick();
    });
  }
  //Handler for a click on the user menu list item "Reset Password"
  function handleResetPasswordButtonClick() {
    var dynamicData = {},
      repeatPassword = "";

    dynamicData["oldPassword"] = DOM.$oldPasswordInput.val();
    dynamicData["newPassword"] = DOM.$newPasswordInputs.eq(0).val();
    repeatPassword = DOM.$newPasswordInputs.eq(1).val();

    //Check that user has enter a old password and a new password
    if (
      dynamicData["oldPassword"].length <= 0 ||
      dynamicData["newPassword"].length <= 0
    ) {
      alert("Please enter both your old password and a new password");
    } else {
      //Check that the new password matches the reapeat
      if (!(dynamicData["newPassword"] == repeatPassword)) {
        alert("Entered password's dont match. Please try again.");
      } else {
        resetPasswordInDB(dynamicData).done(function(data) {
          alert(data);
        });
      }
    }
  }
  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    bindEvents();
  }

  /* =================== private AJAX methods ================= */
  function resetPasswordInDB(dynamicData) {
    return $.post("php/user-profile/setNewPassword.php", {
      dynamicData: dynamicData
    });
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
