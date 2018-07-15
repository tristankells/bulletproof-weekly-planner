<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$name = $_POST["consultantName"];
$role = $_POST["consultantJob"];
$position = $_POST["position"];
$board = 1; //Placeholder

//Query to insert new consultant information to the client table stored in the application database
$query = "INSERT INTO consultant (full_name, job_title, board_id, board_position)
            VALUES ('$name','$role', $board, $position)";

//Run query on connection
if ($conn->query($query) === true) {
    $lastId = $conn->insert_id;

    $query = "SELECT id, full_name, job_title, board_position 
                FROM consultant WHERE id = $lastId";

    if ($result = $conn->query($query)) {
        while ($row = mysqli_fetch_assoc($result)) {
            $consultant =
                [
                "id" => $row["id"],
                "name" => $row["full_name"],
                "role" => $row["job_title"],
                "position" => $row["board_position"],
            ];
        }
    }

    echo ($conn->error);
}

echo ($conn->error);

$consultantJSON = json_encode($consultant);
echo $consultantJSON;
mysqli_close($conn);
