<?php

require_once 'databaseConnection.php';
require_once 'functions.php';

$query = "SELECT clientAbbrev FROM clients";

$clientResults = $conn->query($query);

$clientNames = array();

if ($clientResults->num_rows > 0) {
    while ($row = $clientResults->fetch_assoc()) {
        array_push($clientNames, $row['clientAbbrev']);
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
        array_push($allocations,$row['mondayAm']);
        array_push($allocations,$row['mondayPm']);
        array_push($allocations,$row['tuesdayAm']);
        array_push($allocations,$row['tuesdayPm']);
        array_push($allocations,$row['wednesdayAm']);
        array_push($allocations,$row['wednesdayPm']);
        array_push($allocations,$row['thursdayAm']);
        array_push($allocations,$row['thursdayPm']);
        array_push($allocations,$row['fridayAm']);
        array_push($allocations,$row['fridayPm']);


        addConsultant($row['consultantsName'], $clientNames, $allocations);
    }
}

mysqli_close($conn);
