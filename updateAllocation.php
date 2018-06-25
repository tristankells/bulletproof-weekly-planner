
<!--
filename - updateAllocation.php

Takes a consultant id, consultant day, and client abrrevation and updates the corresponding 
entry in the database


-->

<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'databaseConnection.php';
require_once 'functions.php';

//Store the consultant ID, client name and the day/time of the client allocation
$consultantId = $_POST["consultantId"];
$clientAbbrevation = $_POST["clientAbbrevation"];
$consultantDayTime = $_POST["consultantDayTime"];

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE consultants SET $consultantDayTime = $clientAbbrevation WHERE ConsultantId = $consultantId";

//Run query on connection
$result = $conn->query($query);
