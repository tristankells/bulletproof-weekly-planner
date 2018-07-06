<?php

require_once 'database.php';

//Query to retrieve all client names from clients table
$query = "SELECT * FROM clients";

//Run query on connection
$result = $conn->query($query);

$clientsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "id" => $row['ClientID'],
            "name" => $row['ClientName'],
            "abbrevation" => $row['ClientAbbrevation'],
        ];
        array_push($clientsArray, $client);
    }
}

//Query to retrieve all client names from clients table
$query = "SELECT * FROM consultants";

//Run query on connection
$result = $conn->query($query);

$consultantsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $consultant =
            [
            "id" => $row['ConsultantID'],
            "name" => $row['ConsultantName'],
            "role" => $row['ConsultantJob'],
            "allocation0" => $row['Allocation0'],
            "allocation1" => $row['Allocation1'],
            "allocation2" => $row['Allocation2'],
            "allocation3" => $row['Allocation3'],
            "allocation4" => $row['Allocation4'],
            "allocation5" => $row['Allocation5'],
            "allocation6" => $row['Allocation6'],
            "allocation7" => $row['Allocation7'],
            "allocation8" => $row['Allocation8'],
            "allocation9" => $row['Allocation9'],
        ];
        array_push($consultantsArray, $consultant);
    }
}
// Convert Array to JSON String
$returnArrays = array($consultantsArray, $clientsArray);
echo json_encode($returnArrays);
mysqli_close($conn);
