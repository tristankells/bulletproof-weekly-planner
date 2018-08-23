<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';
;
//Store the consultant ID, client name and the day/time of the client allocation

//Query to update a consultatns client allocation for a specific day/time
foreach ($_POST["positions"] as $position) {

    $id = $position[0];
    $newPosition = $position[1];
    $query = "UPDATE consultant SET board_position = $newPosition WHERE id = $id";

//Run query on connection
    $result = $conn->query($query);
}
