<?php session_start(); 
if($_SESSION['authentication']!=1)
    header("Location: ./Error.php");?>
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
    <script src="js/manage-calendar/SharedManageFunctionsModule.js"></script>
    <script src="js/manage-calendar/ManageClientModule.js"></script>
    <script src="js/manage-calendar/ManageConsultantModule.js"></script>
    <script src="js/manage-calendar/manage_index.js"></script>
    <script src="js/UserSetting.js"></script>
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
    </ul>
    <ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
		<li data-action="2">Reset Password</li>
    </ul>

    <div class="container-fluid">
        <div id="navigationBar" class="row">
            <div id="top-logo" class="col-lg-3 col-md-3 col-sm-3 col-xs-9">
                <img src="/Glance/img/glance_logo_navyblue_lg.png" class="logo" alt="">
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
                <table class="manage-table mx-auto">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>ROLE</th>
                        </tr>
                    </thead>
                    <tbody id="consultantstablebody"></tbody>
                </table>
                <button id="removeallconsultantsbutton">Click To Delete All Consultants</button>
                <table class="add-consultant-table">
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

                <table class="manage-table mx-auto">
                    <thead>
                        <th>NAME</th>
                        <th>ABBREVIATION</th>
                        <th>COLOUR</th>
                    </thead>
                    <tbody id="clienttablebody"></tbody>
                </table>
                <button id="removeallclientsbutton">Click To Delete All Clients</button>
                <table class="add-consultant-table">
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
            </div>
        </div>
    </div>
</body>

</html>