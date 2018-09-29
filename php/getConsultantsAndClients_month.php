<?php

require_once 'database.php';

$boardID = 1;
$clients = array();
$consultants = array();
$data = array();

$query = "SELECT id,
full_name,
abbreviation,
board_position,
colour
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
WHERE board_id = $boardID";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $monthlyAllocations = array();
        $weekAllocations = array();
        $query = "SELECT
        monthly_allocation.consultant_id,
        monthly_allocation.allocation_slot,
        client.full_name,
        client.abbreviation,
        client.colour
        FROM monthly_allocation
        INNER JOIN client ON monthly_allocation.client_id = client.id
        WHERE consultant_id =  $id";

        $allocationResult = $conn->query($query);

        echo ($conn->error);
        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "consultant_id" => $allocationRow['consultant_id'],
                    "full_name" => $allocationRow['full_name'],
                    "colour" => $allocationRow['colour'],
                    "abbreviation" => $allocationRow['abbreviation'],
                    "allocation_slot" => $allocationRow['allocation_slot'],
                ];
                array_push($monthlyAllocations, $allocation);
            }
        }

        $query = "SELECT DISTINCT
        client.abbreviation,
        client.colour
        FROM client
        LEFT OUTER JOIN allocation ON client.id = allocation.client_id
        WHERE allocation.consultant_id =$id";

        $allocationResult = $conn->query($query);

        echo ($conn->error);
        if ($allocationResult->num_rows > 0) {
            while ($allocationRow = $allocationResult->fetch_assoc()) {
                $allocation = [
                    "allocated_to" => $allocationRow['abbreviation'],
                    "colour" => $allocationRow['colour'],
                ];
                array_push($weekAllocations, $allocation);
            }
        }

        $consultant =
            [
            "id" => $row['id'],
            "full_name" => $row['full_name'],
            "job_title" => $row['job_title'],
            "board_position" => $row['board_position'],
            "monthly_allocations" => $monthlyAllocations,
            "week_allocations" => $weekAllocations,
        ];
        array_push($consultants, $consultant);
    }
}
// Convert client and consultants arrays to JSON
$data['consultants'] = $consultants;
$data['clients'] = $clients;
echo json_encode($data);
mysqli_close($conn);
