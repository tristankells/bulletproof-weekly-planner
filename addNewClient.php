<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$clientName = $_POST["clientName"];
$clientAbbrev = $_POST["clientAbbrev"];

//Query to insert new client information to the client table stored in the application database
$query = "INSERT INTO clients (ClientName, ClientAbbrevation) VALUES ('" . $clientName . "','" . $clientAbbrev . "')";

//Run query on connection
$result = $conn->query($query);

$client =
    [
    "name" => $clientName,
    "abbrevation" => $clientAbbrev,
];

$clientJSON = json_encode($client);
echo $clientJSON;
mysqli_close($conn);
