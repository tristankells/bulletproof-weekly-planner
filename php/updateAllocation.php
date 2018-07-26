<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$id = $_POST["consultantID"];
$allocatedTo = $_POST["clientAbbreviation"];
$allocationSlot = $_POST["allocationSlot"];
$officeStatus = $_POST["officeStatus"];

$query = "DELETE FROM allocation
            WHERE consultant_id = $id
            AND allocation_slot = $allocationSlot";

$conn->query($query);

//Query to update a consultatns client allocation for a specific day/time
$query = "INSERT INTO allocation (consultant_id, allocated_to, allocation_slot, office_status)
            VALUES ($id, '$allocatedTo', $allocationSlot, $officeStatus)";

//Run query on connection
$conn->query($query);

echo ($conn->error);
