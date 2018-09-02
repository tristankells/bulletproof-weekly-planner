<?php session_start();
if ($_SESSION['authentication'] != 1) {
    header("Location: ./Error.php");
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Glance: Week View</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/UserSetting.js"></script>
    <script src="js/reset-password/ResetPasswordModule.js"></script>
    <script src="js/reset-password/reset_index.js"></script>
    <link rel="stylesheet" href="style/style.css">
</head>

<body>
<ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
		<li data-action="2">Reset Password</li>
    </ul>
    <div class="container-fluid">
        <div id="navigationBar" class="row">
            <div id="top-logo-div" class="col-lg-3 col-md-3 col-sm-3 col-xs-9">
             <div id="glance-logo">B.</div>
            </div>
            <div id="top-btn-group" class="btn-group-wrap col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <nav class="shift">
                    <ul>
                        <li><a href="week-calendar.php">Week</a></li>
                        <li><a href="month-calendar.php">Month</a></li>
                        <li><a href="management-page.php">Manage</a></li>
                    </ul>
                </nav>
            </div>
            <div class="settings-icon-top col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <div>
                    <i id="usermenubutton" class="fas fa-cog fa-2x"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="container-fluid table-padding">
        <div class="row" id="maindiv">
            <div class="col-lg-6 col-md-6 col-sm-10 mx-auto">
                <div id="resetPasswordDiv">
                    <form id="resetPasswordForm">
                        <div>Please enter your current password</div>
                        <input type="text" id="oldPassword"><br>
                        <div>Please enter you new password</div>
                        <input type="text" class="new-passwords"><br>
                        <div>Please enter your new password again</div>
                        <input type="text" class="new-passwords"><br>
                        <button type="submit" id="resetPasswordButton">Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
</body>

</html>