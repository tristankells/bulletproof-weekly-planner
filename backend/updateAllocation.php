<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php'
;
//Store the consultant ID, client name and the day/time of the client allocation
$consultantID = $_POST["consultantID"];
$clientAbbrevation = $_POST["clientAbbrevation"];
$allocationNo = $_POST["allocationNo"];
$outOffice = 0;

$query = "DELETE FROM ALLOCATIONS WHERE ConsultantID = $consultantID AND AllocationSlot = $allocationNo";

$conn->query($query);

//Query to update a consultatns client allocation for a specific day/time
$query = "INSERT INTO ALLOCATIONS (ConsultantID, AllocatedTo, AllocationSlot, OutOffice) VALUES ($consultantID, '$clientAbbrevation', $allocationNo, $outOffice)";

//Run query on connection
$conn->query($query);

echo ($conn->error);
