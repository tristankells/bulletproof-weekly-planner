<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$clientName = $_POST["clientName"];
$clientAbbrevation = $_POST["clientAbbrev"];

//Query to insert new client information to the client table stored in the application database
$query = "INSERT INTO clients (ClientName, ClientAbbrevation) VALUES ('" . $clientName . "','" . $clientAbbrevation . "')";

//Run query on connection
$result = $conn->query($query);

//Query to insert new client information to the client table stored in the application database
$query = "SELECT * FROM clients WHERE ClientName='$clientName'";
//Run query on connection
$result = $conn->query($query);

while ($row = $result->fetch_assoc()) {
    $client =
        [
        "id" => $row['ClientID'],
        "name" => $row['ClientName'],
        "abbrevation" => $row['ClientAbbrevation'],
    ];
}

$clientJSON = json_encode($client);
echo $clientJSON;
mysqli_close($conn);
