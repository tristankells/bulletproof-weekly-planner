<?php

require_once 'databaseConnection.php';
require_once 'functions.php';

$query = "SELECT ClientAbbrevation FROM clients";

$clientResults = $conn->query($query);

$clientNames = array();

if ($clientResults->num_rows > 0) {
    while ($row = $clientResults->fetch_assoc()) {
        array_push($clientNames, $row['ClientAbbrevation']);
    }
}

//Query to retrieve all client names from clients table
$query = "SELECT * FROM consultants";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $allocations = array();
        array_push($allocations,$row['MondayAm']);
        array_push($allocations,$row['MondayPm']);
        array_push($allocations,$row['TuesdayAm']);
        array_push($allocations,$row['TuesdayPm']);
        array_push($allocations,$row['WednesdayAm']);
        array_push($allocations,$row['WednesdayPm']);
        array_push($allocations,$row['ThursdayAm']);
        array_push($allocations,$row['ThursdayPm']);
        array_push($allocations,$row['FridayAm']);
        array_push($allocations,$row['FridayPm']);
        addConsultant($row['ConsultantName'], $clientNames, $allocations);
    }
}

mysqli_close($conn);
