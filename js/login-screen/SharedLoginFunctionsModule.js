var SharedLoginFunctionsModule = (function() {
  /* =================== public methods ================== */

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  function animateLoginFormTransition($forms) {
    $forms.animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

  return {
    isEmail: isEmail,
    animateLoginFormTransition: animateLoginFormTransition
  };
})();
