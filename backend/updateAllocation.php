<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$consultantID = $_POST["consultantID"];
$clientAbbrevation = $_POST["clientabbreviation"];
$allocationNo = $_POST["allocationNo"];
$outOffice = $_POST["officeStatus"];

$query = "DELETE FROM allocation WHERE consultant_id = $consultantID AND allocation_slot = $allocationNo";

$conn->query($query);

//Query to update a consultatns client allocation for a specific day/time
$query = "INSERT INTO allocation (consultant_id, allocated_to, allocation_slot, office_status) VALUES ($consultantID, '$clientAbbrevation', $allocationNo, $outOffice)";

//Run query on connection
$conn->query($query);

echo ($conn->error);
