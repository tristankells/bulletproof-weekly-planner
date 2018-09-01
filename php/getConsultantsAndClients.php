<?php

require_once 'database.php';

$boardID = 1;
$clients = array();
$consultants = array();

$query = "SELECT id,
full_name,
abbreviation,
board_position,
colour
FROM client
WHERE board_id = $boardID
ORDER BY board_position ASC";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "id" => $row['id'],
            "full_name" => $row['full_name'],
            "abbreviation" => $row['abbreviation'],
            "position" => $row['board_position'],
            "colour" => $row["colour"],
        ];
        array_push($clients, $client);
    }
}

//Query to retrieve all client names from clients table
$query = "SELECT id,
    full_name,
    job_title,
    board_position
FROM consultant
WHERE board_id = $boardID
ORDER BY board_position ASC";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $allocations = array();
        $query = "SELECT
        client.abbreviation,
        client.id,
        client.colour,
        allocation.allocation_slot,
        allocation.office_status,
        allocation.time_allocated
        FROM allocation
        LEFT OUTER JOIN client ON client.id = allocation.client_id
        WHERE consultant_id =  $id";

        $allocationResult = $conn->query($query);

        echo ($conn->error);

        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "clientID" => $allocationRow['id'],
                    "abbreviation" => $allocationRow['abbreviation'],
                    "colour" => $allocationRow['colour'],
                    "allocationSlot" => $allocationRow['allocation_slot'],
                    "officeStatus" => $allocationRow['office_status'],
                    "timeAllocated" => $allocationRow['time_allocated'],
                ];
                array_push($allocations, $allocation);
            }
        }

        $consultant =
            [
            "id" => $row['id'],
            "name" => $row['full_name'],
            "role" => $row['job_title'],
            "position" => $row['board_position'],
            "allocations" => $allocations,
        ];
        array_push($consultants, $consultant);
    }
}
// Convert Array to JSON String
$returnArrays = array($consultants, $clients);
echo json_encode($returnArrays);
mysqli_close($conn);
