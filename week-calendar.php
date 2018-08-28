<?php session_start();
if ($_SESSION['authentication'] != 1) {
    header("Location: ./Error.php");
}
?>
    <!DOCTYPE html>
<html>

<head>
    <title>Glance: Week Views</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/week-calendar/WeekClientsModule.js"></script>
    <script src="js/week-calendar/WeekConsultantModule.js"></script>
    <script src="js/week-calendar/DateModule.js"></script>
    <script src="js/week-calendar/week_index.js"></script>
    <script src="js/UserSetting.js"></script>
    <script src="js/reset-password/ResetPasswordModule.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <link rel="manifest" href="js/manifest.json">
    <link rel="stylesheet" href="style/style.css">
</head>


<body>
    <ul id='officemenu' class='custom-menu '>
        <li data-action="0">Office</li>
        <li data-action="1">On-Site</li>
        <li data-action="2">Leave</li>
    </ul>
    <ul id='clientmenu' class='custom-menu'>
        <li>Empty</li>
    </ul>
    <ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
		<li data-action="2">Reset Password</li>
    </ul>
    <div class="container-fluid">
        <div id="navigationBar" class="row">
            <div id="top-logo-div" class="col-lg-3 col-md-3 col-sm-3 col-xs-9">
             <div id="glance-logo">Glance.</div>
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
    <div class="container-fluid">
        <div class="row" id="maindiv">
            <div class="col-lg-12" id="consultantsdiv">
                <table class="consultant-table table" id="consultantstable">
                    <thead id="consultantstablehead">
                        <tr class="dates" id="consultantstableheadrow">
                            <th style="padding: 0!important;">
                                <div id="displaymonth"></div>
                                <div id="displayyear"></div>
                            </th>
                            <th class="date" colspan="2">MON</th>
                            <th class="date" colspan="2">TUE</th>
                            <th class="date" colspan="2">WED</th>
                            <th class="date" colspan="2">THU</th>
                            <th class="date" colspan="2">FRI</th>
                        </tr>
                        <tr class="date-subheading">
                            <th></th>
                            <th>AM</th>
                            <th>PM</th>
                            <th>AM</th>
                            <th>PM</th>
                            <th>AM</th>
                            <th>PM</th>
                            <th>AM</th>
                            <th>PM</th>
                            <th>AM</th>
                            <th>PM</th>
                        </tr>

                    </thead>
                    <tbody id="consultantstablebody">
                    </tbody>
                </table>
                <div class="clear-button-container">
                    <!--
                        <div><p><small>Last Updated<br>10/02/18 14:00</small></p></div>
                        -->

                    <button id="resetallocationbutton" class="clear-all-btn">CLEAR TABLE
                        <i class="remove-add-btn fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div class="col-lg-12"></div>
            <div class="col-lg-12 mx-auto mb-5" id="clientsdiv">
                <table class="table table-dark table-striped client-table" id="clientstable">
                    <thead id="clienttablehead" style="margin-left:20px">
                        <th style="width: 15%;">Client</th>
                        <th style="width: 15%; text-align: center;">Abbreviation</th>
                        <th style="width: 70%;">Who</th>
                    </thead>
                    <tbody id="clienttablebody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

</html>
