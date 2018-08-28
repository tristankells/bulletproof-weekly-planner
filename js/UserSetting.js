console.log("eeee");
$(document).ready(function() {
  var userMenu = $("#usermenu");
  var usermenubutton = $("#usermenubutton");

  usermenubutton.on("contextmenu", function() {
    event.preventDefault();
    var pos = event.pageX - userMenu.width();
    $("#usermenu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: pos + "px"
      });
  });

  usermenubutton.on("click", function() {
    event.preventDefault();
    var pos = event.pageX - userMenu.width();
    $("#usermenu")
      .finish()
      .toggle(100)
      // In the right position (the mouse)
      .css({
        top: event.pageY + "px",
        left: pos + "px"
      });
  });

  userMenu.on("click", "li", function() {
    var optionClicked = $(this).attr("data-action");
    switch (optionClicked) {
      case "1":
        location.href = "php/user-profile/logout.php";
        break;
      case "2":
        location.href = "./reset-password.php";
        break;
      default:
        alert("nothing");
    }
  });
});

var usersetting = (function() {
  "use strict";
  // placeholder for cached DOM elements
  var DOM = {};

  /* =================== private methods ================= */
  // cache DOM elements
  function cacheDom() {
    DOM.$userMenu = $("#usermenu");
    DOM.$usermenubutton = $("#usermenubutton");
  }
  // bind events
  function bindEvents() {
    DOM.$usermenubutton.on("contextmenu", function() {
      event.preventDefault();
      var pos = event.pageX - DOM.$userMenu.width();
      $("#usermenu")
        .finish()
        .toggle(100)
        // In the right position (the mouse)
        .css({
          top: event.pageY + "px",
          left: pos + "px"
        });
    });

    DOM.$userMenu.on("click", "li", function() {
      var optionClicked = $(this).attr("data-action");
      switch (optionClicked) {
        case "1":
          location.href = "./php/logout.php";
          break;
        case "2":
          alert("Please make the password reset menu");
          break;
        default:
          alert("nothing");
      }
    });
  }

  /* =================== public methods ================== */
  // main init method
  function init() {
    cacheDom();
    bindEvents();
    console.log("SSS");
  }

  /* =============== export public methods =============== */
  return {
    init: init
  };
})();
