<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';
//Store the consultant ID, client name and the day/time of the client allocation

$dynamicData = $_POST['dynamicData'];
$consultantId = $dynamicData["consultantID"];
$col = $dynamicData["col"];
$isAdding = $dynamicData["isAdding"];

//Query to update a consultatns client allocation for a specific day/time
if ($isAdding == 1) {
    $clientId = $dynamicData["clientID"];
    $query = "INSERT INTO monthly_allocation (consultant_id, client_id, allocation_slot)
				VALUES ($consultantId, '$clientId', $col)";
    //Run query on connection
    $conn->query($query) or die($conn->error);

} else if ($isAdding == 2) {
    $clientId = $dynamicData["clientID"];
    $query = "DELETE FROM monthly_allocation WHERE consultant_id='$consultantId' AND allocation_slot='$col' AND client_id=$clientId";

    //Run query on connection
    $conn->query($query) or die($conn->error);
} else {
    $query = "DELETE FROM monthly_allocation WHERE consultant_id='$consultantId' AND allocation_slot='$col'";

    //Run query on connection
    $conn->query($query) or die($conn->error);
}

echo 'success';
