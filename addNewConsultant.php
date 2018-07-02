<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$name = $_POST["consultantName"];
$role = $_POST["consultantJob"];

//Query to insert new consultant information to the client table stored in the application database
$query = "INSERT INTO consultants (ConsultantName, ConsultantJob) VALUES ('" . $name . "','" . $role . "')";

//Run query on connection
$result = $conn->query($query);

$consultant =
    [
    "name" => $name,
    "role" => $role,
    "allocation0" => null,
    "allocation1" => null,
    "allocation2" => null,
    "allocation3" => null,
    "allocation4" => null,
    "allocation5" => null,
    "allocation6" => null,
    "allocation7" => null,
    "allocation8" => null,
    "allocation9" => null,
];

$consultantJSON = json_encode($consultant);
echo $consultantJSON;
mysqli_close($conn);
