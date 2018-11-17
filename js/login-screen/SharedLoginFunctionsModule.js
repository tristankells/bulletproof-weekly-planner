var SharedLoginFunctionsModule = (function() {
  /* =================== public methods ================== */
  //Regex to check if email is valid if email is valid
  function isEmail(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
      email
    );
  }

  function animateLoginFormTransition($forms) {
    $forms.animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

  return {
    isEmail: isEmail,
    animateLoginFormTransition: animateLoginFormTransition
  };
})();
