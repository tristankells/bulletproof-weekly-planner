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
    <script src="js/DateModule.js"></script>
    <script src="js/week-calendar/WeekAllocationModule.js"></script>
    <script src="js/week-calendar/WeekConsultantStorageModule.js"></script>
    <script src="js/week-calendar/WeekClientsModule.js"></script>
    <script src="js/week-calendar/WeekConsultantModule.js"></script>
    <script src="js/week-calendar/week_index.js"></script>
    <script src="js/UserSetting.js"></script>
    <script src="js/ThemeModule.js"></script>
    <script src="js/reset-password/ResetPasswordModule.js"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <link rel="manifest" href="js/manifest.json">
    <link rel="stylesheet" href="style/style.css">
</head>


<body>
    <ul id='officemenu' class='custom-menu '>
        <div class="custom-menu-subheader"> Client </div>
        <li data-action="0">At Office</li>
        <li data-action="2"><i class="fas fa-home"></i>  From Home</li>
        <li data-action="1"><i class="fas fa-plane"></i>  On Site</li>
        <li data-action="4"><i class="fas fa-handshake"></i> Meeting</li>
        <div class="custom-menu-subheader"> Non-Client </div>
        <li data-action="5"><i class="fas fa-laptop"></i> Other</li>
        <li data-action="3" class="stripes">Leave</li>
    </ul>
    <ul id='clientmenu' class='custom-menu'>
        <li>EMPTY</li>
    </ul>
    <ul id='usermenu' class='custom-menu'>
        <li data-action="1">Logout</li>
        <li data-action="2">Reset Password</li>
        <li data-action="3"><label for="one">Colorblind Mode &nbsp; <input type="checkbox" id="one" /></label></li>
        <li data-action="4">Register A New User Account</li>
    </ul>
    <div class="alert alert-info alert-dismissible fade show" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Hi there! Welcome to Glance.</strong> &nbsp;&nbsp;Heres a tip! Right click on any allocation to change client or set leave :)
</div>
    <div class="container-fluid">
        <div id="navigationBar" class="row">
            <div id="top-logo-div" class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
             <div id="logo">BP.</div>
            </div>
            <div id="top-btn-group" class="btn-group-wrap col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <nav class="shift">
                    <ul>
                      <li><a class="highlight-current-page" href="week-calendar.php">Week</a></li>
                      <li><a href="month-calendar.php">Month</a></li>
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
    <div class="container-fluid">
        <div class="row" id="maindiv">
            <div id="weekNavButtons">
                <div class="previousWeekButtonContainer">
                        <button id="previousWeekArrow" class="changeWeekButton" ><i class="fas fa-arrow-left"></i><span id="previousWeekButton" style="font-size: 0.8em;">&nbsp; Previous</span></button>
                </div>
                <div class="currentWeekButtonContainer"><span id="currentWeekButton" style="font-size: 0.8em;">Current</span></div>
                <div class="nextWeekButtonContainer">
                        <button id="nextWeekArrow" class="changeWeekButton"><span id="nextWeekButton" style="font-size: 0.8em;">Next &nbsp;</span><i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            <div class="col-lg-12" id="consultantsdiv">
                <table class="consultant-table table" id="consultantstable">
                    <thead id="consultantstablehead">
                        <tr class="dates" id="consultantstableheadrow">
                            <th style="padding: 0!important; min-width: 200px;">
                                <div id="displaymonth"></div>
                                <div id="displayyear"></div>
                            </th>
                            <th class="date" colspan="2">Mon</th>
                            <th class="date" colspan="2">Tue</th>
                            <th class="date" colspan="2">Wed</th>
                            <th class="date" colspan="2">Thu</th>
                            <th class="date" colspan="2">Fri</th>
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
                    <button class="copy-all-btn">Duplicate Previous Week
                        <i class="fas fa-copy"></i>
                    </button>
                    <button id="resetallocationbutton" class="clear-all-btn">Clear Table
                        <i class="remove-add-btn fas fa-trash-alt"></i>
                    </button>
                    <p style="font-size: 10px; color: lightgray; float: right; text-align: right;">
                    Last Updated<br/>Time: <span id=lastUpdatedTime>10:00pm</span><br/>Date: <span id="lastUpdatedDate">10/02/2018 </span></p>

                </div>
            </div>
            <div class="col-lg-12 mx-auto mb-5" id="clientsdiv">
                <div class="manage-table-header">Clients</div>
                <table class="table table-dark table-striped client-table" id="clientstable">
                    <thead id="clienttablehead">
                        <th style="letter-spacing: 1px; text-align: center; width: 15%;" colspan="2">Client</th>
                        <th style="letter-spacing: 1px; text-align: center; width: 15%; text-align: center;">Abbreviation</th>
                        <th style="letter-spacing: 1px; width: 70%;">Consultant</th>
                    </thead>
                    <tbody id="clienttablebody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script type="text/javascript">


    //Load the javascript when the page is loaded
    $(document).ready(function() {

    var email = "<?php echo ($_SESSION['email']); ?>";

    console.log(email);

    var theme = <?php echo ($_SESSION['theme']); ?>;

    console.log(theme);
    DateModule.init();
    ResetPasswordModule.init();



  initialiseTables(theme);


  function saveNewClientPositions() {
    var positions = [];
    $(".client-updated").each(function() {
      positions.push([$(this).prop("id"), $(this).attr("data-position")]);
      $(this).removeClass("client-updated");
    });
    $.post(
      "php/clients/updateClientPositions.php",
      {
        positions: positions
      },
      function() {}
    );
  }
});




    </script>
</body>

</html>
