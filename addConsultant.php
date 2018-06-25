<!--
filename - addClient.php

Takes a client name and client abbrevation from POST and inserts that record into the database. 
Returns a HTML table row representaion of the client as a request as 


-->

<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'databaseConnection.php';
require_once 'functions.php';

$name = $_POST["consultantName"];
$role = $_POST["consultantJob"];

$query = "SELECT ClientAbbrevation FROM clients";

$clientResults = $conn->query($query);

$clientNames = array();

if ($clientResults->num_rows > 0) {
    while ($row = $clientResults->fetch_assoc()) {
        array_push($clientNames, $row['ClientAbbrevation']);
    }
}

//Query to insert new consultant information to the client table stored in the application database
$query = "INSERT INTO consultants (ConsultantName, ConsultantJob) VALUES ('" . $name . "','" . $role . "')";

//Run query on connection
$result = $conn->query($query);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$empty = array();

addConsultant($name,$clientNames, $empty);