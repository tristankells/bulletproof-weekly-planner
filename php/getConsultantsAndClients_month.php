<?php

require_once 'database.php';

$boardID = 1;
$clients = array();
$consultants = array();
$data = array();

$query = "SELECT id,
full_name,
abbreviation,
board_position
FROM client
WHERE board_id = $boardID";

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
            "board_position" => $row['board_position'],
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
WHERE board_id = $boardID";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $allocations = array();
        $query = "SELECT
        consultant_id,
        client_id,
        allocation_slot,
		full_name,
		abbreviation
        FROM monthly_allocation ma
		INNER JOIN client ON client.id=ma.client_id
        WHERE consultant_id =  $id";

        $allocationResult = $conn->query($query);

        echo ($conn->error);

        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "consultant_id" => $allocationRow['consultant_id'],
                    "client_id" => $allocationRow['client_id'],
                    "allocation_slot" => $allocationRow['allocation_slot'],
                    "full_name" => $allocationRow['full_name'],
                    "abbreviation" => $allocationRow['abbreviation'],
                ];
                array_push($allocations, $allocation);
            }
        }

        $consultant =
            [
            "id" => $row['id'],
            "full_name" => $row['full_name'],
            "job_title" => $row['job_title'],
            "board_position" => $row['board_position'],
            "allocations" => $allocations,
        ];
        array_push($consultants, $consultant);
    }
}
// Convert client and consultants arrays to JSON
$data['consultants'] = $consultants;
$data['clients'] = $clients;
echo json_encode($data);
mysqli_close($conn);
