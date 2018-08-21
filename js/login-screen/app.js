$(document).ready(function() {
  LoginModule.init();
  RegisterModule.init();


  function bindEvents() {
    $("#reset-btn").click(function() {
      resetPassword();
    });
  }

  bindEvents();

  function resetPassword() {
    var email = "";

    email = $("#reset-email-input").val();
    alert(email);
    if (isEmail(email)) {
      alert("Email adress is valid");
      resetPasswordDB(email).done(function(data) {
        alert(data);
      });
    } else {
      alert("Please enter a valid email address");
    }
  }

  function resetPasswordDB(email) {
    return $.post("php/forgottenPassword.php", { email: email });
  }

  function bindLoginScreenNavigation() {
    $(".login-form-btn").click(function() {
      animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".login-form")
      );
    });

    $(".reset-form-btn").click(function() {
      animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".reset-form")
      );
    });

    $(".register-form-btn").click(function() {
      animateLoginFormTransition(
        $(this)
          .closest("div")
          .add(".register-form")
      );
    });
  }

  bindLoginScreenNavigation();

  function animateLoginFormTransition($forms) {
    $forms.animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

 
});
