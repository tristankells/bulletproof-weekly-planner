<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$name = $_POST["consultantName"];
$role = $_POST["consultantJob"];
$position = $_POST["position"];
$board = 1; //Placeholder
$consultant = [];

//Query to insert new consultant information to the client table stored in the application database
$query = "INSERT INTO consultants (name, role) VALUES ('$name','$role')";

//Run query on connection
if ($conn->query($query) === true) {
    $lastId = $conn->insert_id;
    $query = "INSERT INTO boardConsultants (BoardID, ConsultantID, BoardPosition ) VALUES ($board, $lastId, $position)";
    if ($result = $conn->query($query)) {
        $query = "SELECT * FROM consultants WHERE id = $lastId";
        if ($result = $conn->query($query)) {
            while ($row = mysqli_fetch_assoc($result)) {
                $consultant =
                    [
                    "id" => $row["ID"],
                    "name" => $row["Name"],
                    "role" => $row["Role"],
                ];
            }
        }
    }
    echo ($conn->error);
}

echo ($conn->error);

$consultantJSON = json_encode($consultant);
echo $consultantJSON;
mysqli_close($conn);
