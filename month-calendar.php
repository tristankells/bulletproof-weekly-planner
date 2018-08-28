<?php session_start(); 
if($_SESSION['authentication']!=1)
    header("Location: ./Error.php");?>
    <!DOCTYPE html>
<html>

<head>
    <title>Glance: Month View</title>
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
    <script src="js/month-calendar/MonthClientsModule.js"></script>
    <script src="js/month-calendar/MonthConsultantsModule.js"></script>
    <script src="js/month-calendar/month_index.js"></script>
    <script src="js/UserSetting.js"></script>
</head>
<script>

</script>

<body>
    <ul id="clientmenu" class='custom-menu'>
    <li data-action='0' data-flag='1'>Delete</li>
    </ul>
    <ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
		<li data-action="2">something</li>
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
            <div class="col-lg-12" id="consultantsdiv">
                    <table id="consultanttable" class="table table-padding table-bordered">
                            <thead id="consultanttablehead">
                                <tr id="consultanttableheadrow">
                                    <th>CONSULTANTS</th>
                                    <th>CURRENT WEEK </th>
                                    <th>WEEK 2 </th>
                                    <th>WEEK 3 </th>
                                    <th>WEEK 4 </th>
                                </tr>
                            </thead>
                            <tbody id="consultanttablebody">
                            </tbody>
                        </table>
                        <table id="clienttable" class="table table-dark table-striped table-bordered">
                            <thead id="clienttablehead">
                                <tr id="clienttableheadrow">
                                    <th>CLIENTS</th>
                                </tr>
                            </thead>
                            <tbody id="clienttablebody" style="font-weight:bold">
                            </tbody>
                        </table>
            </div>
        </div>
    </div>

    
</body>

</html>