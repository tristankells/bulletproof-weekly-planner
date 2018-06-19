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
$query = "SELECT consultantsName FROM consultants";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        addConsultant($row['consultantsName'],$clientNames);
    }
}

mysqli_close($conn);
