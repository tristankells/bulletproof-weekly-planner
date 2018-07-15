<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$clientID = $_POST["clientID"];
$clientName = $_POST["clientName"];
echo ($clientName);

//Query to update a consultatns client allocation for a specific day/time
$query = "UPDATE client SET full_name = '$clientName' WHERE id = '$clientID'";

//Run query on connection
$result = $conn->query($query);
