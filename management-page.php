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
    <script src="js/manage-calendar/ManageFunctionsModule.js"></script>
    <script src="js/manage-calendar/ManageClientModule.js"></script>
    <script src="js/manage-calendar/ManageConsultantModule.js"></script>
    <script src="js/manage-calendar/manage_index.js"></script>
    <script src="js/reset-password/ResetPasswordModule.js"></script>
    <script src="js/UserSetting.js"></script>
    <script src="js/ThemeModule.js"></script>
    <link rel="stylesheet" href="style/style.css">
</head>

<body>
    <ul class='custom-menu colour-menu'>
        <li data-action="0">Default</li>
        <li data-action="1">Green</li>
        <li data-action="2">Orange</li>
        <li data-action="3">Blue</li>
        <li data-action="4">Red</li>
        <li data-action="5">Purple</li>
        <li data-action="6">Yellow</li>
        <li data-action="7">Gray</li>
        <li data-action="8">Dark Gray</li>
    </ul>
    <ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
        <li data-action="2">Reset Password</li>
        <li data-action="3"><label for="one">Colorblind Mode &nbsp; <input type="checkbox" id="one" /></label></li>
    </ul>

    <div class="container-fluid">
        <div id="navigationBar" class="row">
        <div id="top-logo-div" class="col-lg-3 col-md-3 col-sm-3 col-xs-9">
             <div id="logo">BP.</div>
            </div>
            <div id="top-btn-group" class="btn-group-wrap col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <nav class="shift">
                    <ul>
                        <li><a href="week-calendar.php">Week</a></li>
                        <li><a href="month-calendar.php">Month</a></li>
                        <li><a class="highlight-current-page" href="management-page.php">Manage</a></li>
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
            <div class="col-lg-5 col-md-10 col-sm-10 mb-5 mx-auto main-div-background">
                <div class="manage-table-header">Consultants</div>
                <table class="manage-table ml-2">
                    <thead>
                        <tr>
                            <th>Consultant</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody id="consultantstablebody"></tbody>
                </table>

                <table class="add-consultant-table ml-2">
                    <tr>
                        <td class="input-row">
                            <input type="text" placeholder="Consultant Name..." id="consultantnameinput" />
                        </td>
                        <td class="input-row">
                            <input type="text" placeholder="Consultant Role..." id="consultantroleinput" />
                        </td>
                        <td class="button-row">
                            <i id="addconsultantbutton" class="fas fa-plus-square fa-2x"></i>
                        </td>
                    </tr>
                </table>
                <div class="clear-button-container">
                    <button id="removeallconsultantsbutton" class="clear-all-btn">Delete All Consultants</button>
                </div>
</div>
            <div class="col-lg-5 col-md-10 col-sm-10 mb-5 mx-auto main-div-background">
            <div class="manage-table-header">Clients</div>
                <table class="manage-table ml-2">
                    <thead>
                        <tr>
                            <th style="width: 60%;">Client</th>
                            <th style="width: 20%; text-align: center;">Abbreviation</th>
                            <th style="width: 20%;">Colour</th>
                        </tr>
                    </thead>
                    <tbody id="clienttablebody"></tbody>
                </table>

                <table class="add-consultant-table ml-2">
                    <tr>
                        <td>
                            <input type="text" placeholder="Client Name..." id="clientnameinput" />
                        </td>
                        <td>
                            <input type="text" placeholder="Client Abbrevation..." id="clientabbreviationinput" maxlength="3"
                            />
                        </td>
                        <td>
                            <i id="addclientbutton" class="fas fa-plus-square fa-2x"></i>
                        </td>
                    </tr>
                </table>
                <div class="clear-button-container ml-2">
                    <button id="removeallclientsbutton" class="clear-all-btn">Delete All Clients</button>
                </div>
</div>

        </div>
    </div>
    <script type="text/javascript">
    $(document).ready(function() {

        var email = "<?php echo ($_SESSION['email']); ?>";

        console.log(email);

        var theme = <?php echo ($_SESSION['theme']); ?>;

        console.log(theme);
        ResetPasswordModule.init();

        setupManagePage(theme);
});
</script>
</body>

</html>