<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';
//Store the consultant ID, client name and the day/time of the client allocation
$dynamicData = $_POST["dynamicData"];
$id = $dynamicData["consultantID"];
$clientID = $dynamicData["clientID"];
$allocationSlot = $dynamicData["allocationSlot"];
$officeStatus = $dynamicData["officeStatus"];



$query = "DELETE FROM allocation
            WHERE consultant_id = $id
            AND allocation_slot = $allocationSlot";

$conn->query($query);

if ($clientID == 0) {
    $query = "INSERT INTO allocation (consultant_id, allocation_slot, office_status)
    VALUES ($id, $allocationSlot, $officeStatus)";
} else {
    $query = "INSERT INTO allocation (consultant_id, client_id, allocation_slot, office_status)
    VALUES ($id, $clientID, $allocationSlot, $officeStatus)";
}


//Run query on connection
$conn->query($query);

echo ($conn->error);
