<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';
//Store the consultant ID, client name and the day/time of the client allocation
$consultantId = $_POST["consultantId"];
$col = $_POST["col"];
$isAdding = $_POST["isAdding"];
//Query to update a consultatns client allocation for a specific day/time
if ($isAdding == 1) {
    $allocated = $_POST["allocated_to"];
    $query = "INSERT INTO monthly_allocation (consultant_id, allocated_to, allocation_slot)
				VALUES ($consultantId, '$allocated', $col)";
    //Run query on connection
    $conn->query($query) or die($conn->error);

} else {
    $query = "DELETE FROM monthly_allocation WHERE consultant_id='$consultantId' AND allocation_slot='$col'";

    //Run query on connection
    $conn->query($query) or die($conn->error);
}

echo 'success';
