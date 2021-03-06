<?php session_start();
if ($_SESSION['authentication'] != 1) {
    header("Location: ./Error.php");
}
?>
    <!DOCTYPE html>
<html>

<head>
    <title>Bulletproof</title>
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
    <link rel="stylesheet" href="style/style.css">
    <script src="js/DateModule.js"></script>
    <script src="js/month-calendar/MonthClientsModule.js"></script>
    <script src="js/month-calendar/MonthConsultantsModule.js"></script>
    <script src="js/month-calendar/month_index.js"></script>
    <script src="js/UserSetting.js"></script>
    <script src="js/ThemeModule.js"></script>
    <script src="js/reset-password/ResetPasswordModule.js"></script>
</head>
<script>

</script>

<body>
<ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
        <li data-action="2">Reset Password</li>
        <li data-action="3"><label for="one">Colorblind Mode &nbsp; <input type="checkbox" id="one" /></label></li>
        <li data-action="4">Register A New User Account</li>
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
                        <li><a class="highlight-current-page" href="month-calendar.php">Month</a></li>
                        <li><a href="management-page.php">Manage</a></li>
                    </ul>
                </nav>
            </div>
            <div class="text-right col-lg-3 col-md-3 col-sm-3 col-xs-3">
                
                <div>
                    <span class="user-email"><?php echo (explode("@", $_SESSION['email'])[0]); ?></span>
                    <i id="usermenubutton" class="settings-icon-top fas fa-cog fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid table-padding">
        <div class="row" id="maindiv">
            <div class="col-lg-12" id="consultantsdiv">
            <div class="manage-table-header">Month Overview</div>
                <table id="consultanttable" class="table table-padding">
                    <thead id="consultanttablehead">
                        <tr id="consultanttableheadrow">
                                    <th style="text-align: center;">Consultants</th>
                                    <th style="text-align: center;">Current Week </th>
                                    <th style="text-align: center;">Week 2 </th>
                                    <th style="text-align: center;">Week 3 </th>
                                    <th style="text-align: center;">Week 4 </th>
                        </tr>
                    </thead>
                    <tbody id="consultanttablebody">
                    </tbody>
                </table>
            </div>
            <div class="col-lg-12" id="clientsdiv">
            <div class="manage-table-header">Clients</div>
                <table id="clienttable" class="table table-dark table-striped">
                    <thead id="clienttablehead">
                        <tr id="clienttableheadrow">
                                    <th style="width: 70%">Clients</th>
                                    <th style="width: 5%">Color</th>
                                    <th style="width: 25%">Abbreviation</th>
                        </tr>
                    </thead>
                    <tbody id="clienttablebody" style="font-weight:bold">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

<script type="text/javascript">
    $(document).ready(function() {

        var email = "<?php echo ($_SESSION['email']); ?>";

        console.log(email);

        var theme = <?php echo ($_SESSION['theme']); ?>;

        console.log(theme);
        DateModule.init();
        ResetPasswordModule.init();

        setUpMonthCalendar(theme);
});
</script>
</body>

</html>
