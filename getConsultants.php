<?php

require_once 'databaseConnection.php';
require_once 'functions.php';

$query = "SELECT clientName FROM clients";

$clientResults = $conn->query($query);

//Query to retrieve all client names from clients table
$query = "SELECT consultantsName FROM consultants";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        addConsultant($row['consultantsName'],$clientResults);
    }
}

mysqli_close($conn);
