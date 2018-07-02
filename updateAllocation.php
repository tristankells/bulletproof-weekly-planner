<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$consultantName = $_POST["consultantName"];
$clientAbbrevation = $_POST["clientAbbrevation"];
$allocationNo = $_POST["allocationNo"];
$dayTimeString;

switch ($allocationNo) {
    case "alocation0":
        $dayTimeString = 'MondayAm';
        break;
    case "allocation1":
        $dayTimeString = 'MondayPm';
        break;
    case "allocation2":
        $dayTimeString = 'TuesdayAm';
        break;
    case "allocation3":
        $dayTimeString = 'TuesdayPm';
        break;
    case "allocation4":
        $dayTimeString = 'WednesdayAm';
        break;
    case "allocation5":
        $dayTimeString = 'WednesdayPm';
        break;
    case "allocation6":
        $dayTimeString = 'ThursdayAm';
        break;
    case "allocation7":
        $dayTimeString = 'ThursdayPm';
        break;
    case "allocation8":
        $dayTimeString = 'FridayAm';
        break;
    case "allocation9":
        $dayTimeString = 'FridayPm';
        break;
}

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE consultants SET $dayTimeString = '$clientAbbrevation' WHERE ConsultantName = '$consultantName'";

//Run query on connection
$result = $conn->query($query);
