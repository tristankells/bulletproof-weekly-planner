<?php

//Required to retrieve $conn variable used to connect the application database
require_once '../database.php';
//Store the consultant ID, client name and the day/time of the client allocation
$dynamicData = $_POST["dynamicData"];
$id = $dynamicData["consultantID"];
$clientID = $dynamicData["clientID"];
$allocationSlot = $dynamicData["allocationSlot"];
$officeStatus = $dynamicData["officeStatus"];
$timeCreated = $dynamicData["timeCreated"];
$monday = $dynamicData["monday"];
$sunday = $dynamicData["sunday"];

$query = "DELETE FROM allocation
            WHERE consultant_id = $id
            AND allocation_slot = $allocationSlot,
            AND date_created >= '$monday' AND date_created <= '$sunday'";

echo($monday . $sunday);
$conn->query($query);

if ($clientID == 0) {
    $query = "INSERT INTO allocation (consultant_id, allocation_slot, office_status,  date_created)
    VALUES ($id, $allocationSlot, $officeStatus, '$timeCreated')";
} else {
    $query = "INSERT INTO allocation (consultant_id, client_id, allocation_slot, office_status, date_created)
    VALUES ($id, $clientID, $allocationSlot, $officeStatus, '$timeCreated')";
}

//Run query on connection
$conn->query($query);

echo ($conn->error);
