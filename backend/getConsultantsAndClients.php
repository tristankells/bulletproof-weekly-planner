<?php

require_once 'database.php';

$boardId = 1;

$query = "SELECT clients.Id,
clients.Name,
clients.Abbrevation,
boardclients.BoardPosition
FROM clients
INNER JOIN boardclients ON clients.ID=boardclients.ClientID
WHERE boardclients.boardid = $boardId;";

//Run query on connection
$result = $conn->query($query);

$clientsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "id" => $row['Id'],
            "name" => $row['Name'],
            "abbrevation" => $row['Abbrevation'],
            "position" => $row['BoardPosition'],
        ];
        array_push($clientsArray, $client);
    }
}

//Query to retrieve all client names from clients table
$query = "SELECT consultants.ID,
    consultants.Name,
    consultants.Role,
    boardconsultants.BoardPosition
FROM consultants
INNER JOIN boardconsultants ON consultants.ID=boardconsultants.ConsultantID
WHERE boardconsultants.boardid = $boardId;";

//Run query on connection
$result = $conn->query($query);

$consultantsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['ID'];
        $allocations = array();
        $query = "SELECT
        consultants.ID,
        consultants.Name,
        allocations.AllocatedTo,
        allocations.AllocationSlot,
        allocations.OutOffice
        FROM consultants
        INNER JOIN allocations ON consultants.id = allocations.ConsultantID
        WHERE allocations.ConsultantID =  $id;";

        $allocationResult = $conn->query($query);

        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "id" => $allocationRow['ID'],
                    "allocatedto" => $allocationRow['AllocatedTo'],
                    "allocationslot" => $allocationRow['AllocationSlot'],
                    "officestatus" => $allocationRow['OutOffice'],
                ];
                array_push($allocations, $allocation);
            }
        }

        $consultant =
            [
            "id" => $row['ID'],
            "name" => $row['Name'],
            "role" => $row['Role'],
            "position" => $row['BoardPosition'],
            "allocations" => $allocations,
        ];
        array_push($consultantsArray, $consultant);
    }
}
// Convert Array to JSON String
$returnArrays = array($consultantsArray, $clientsArray);
echo json_encode($returnArrays);
mysqli_close($conn);
