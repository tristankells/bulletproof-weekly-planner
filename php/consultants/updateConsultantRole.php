<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';

//Store the consultant ID, client name and the day/time of the client allocation
$dynamicData = $_POST["dynamicData"];
$id = $dynamicData["id"];
$role = $dynamicData["role"];

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE consultant SET job_title = '$role' WHERE id = '$id'";

//Run query on connection
$result = $conn->query($query);
