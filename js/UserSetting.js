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

  $(document).click(function(event) {
    if (!$(event.target).closest("#usermenu").length) {
      if ($("#usermenu").is(":visible")) {
        $("#usermenu").hide();
      }
    }
  });

  usermenubutton.click(function(event) {
    event.stopPropagation();
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
      case "4":
        location.href = "./register-page.php";
        break;
      default:
    }
  });
});
