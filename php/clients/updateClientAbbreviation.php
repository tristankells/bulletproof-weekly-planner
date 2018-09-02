<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';
//Store the consultant ID, client name and the day/time of the client allocation
$dynamicData = $_POST["dynamicData"];
$id = $dynamicData["id"];
$abbreviation = $dynamicData["abbreviation"];

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE client SET abbreviation = '$abbreviation' WHERE id = $id";

//Run query on connection
$result = $conn->query($query);
