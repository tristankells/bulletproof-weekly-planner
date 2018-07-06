<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$consultantID = $_POST["consultantID"];
$clientAbbrevation = $_POST["clientAbbrevation"];
$allocationNo = $_POST["allocationNo"];

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE consultants SET $allocationNo = '$clientAbbrevation' WHERE ConsultantID = '$consultantID'";

//Run query on connection
$result = $conn->query($query);
