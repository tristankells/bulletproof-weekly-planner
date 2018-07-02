<?php

require_once 'database.php';

//Query to retrieve all client names from clients table
$query = "SELECT ClientName, ClientAbbrevation FROM clients";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    $clientsArray = array();
    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "name" => $row['ClientName'],
            "abbrevation" => $row['ClientAbbrevation'],
        ];
        array_push($clientsArray, $client);
    }
}

// Convert Array to JSON String
$clientsJSON = json_encode($clientsArray);
echo $clientsJSON;
mysqli_close($conn);
