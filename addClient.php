<!--
filename - addClient.php

Takes a client name and client abbrevation from POST and inserts that record into the database. 
Returns a HTML table row representaion of the client as a request as 


-->

<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'databaseConnection.php';
require_once 'functions.php';

$clientName = $_POST["clientName"];
$clientAbbrev = $_POST["clientAbbrev"];

//Query to insert new client information to the client table stored in the application database
$query = "INSERT INTO clients (ClientName, ClientAbbrevation) VALUES ('" . $clientName . "','" . $clientAbbrev . "')";

//Run query on connection
$result = $conn->query($query);

addClient($clientName, $clientAbbrev);
