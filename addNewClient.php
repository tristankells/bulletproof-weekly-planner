<?php

//Required to retrieve $conn variable used to connect the application database
require_once 'database.php';

$clientName = $_POST["clientName"];
$clientAbbrevation = $_POST["clientAbbrev"];
$position = $_POST["position"];
$board = 1;
$client = [];

//Query to insert new client information to the client table stored in the application database
$query = "INSERT INTO clients (name, abbrevation) VALUES ('$clientName','$clientAbbrevation')";

//Run query on connection
if ($conn->query($query) === true) {
    $lastId = $conn->insert_id;

    $query = "INSERT INTO boardclients (BoardID, ClientID, BoardPosition ) VALUES ($board, $lastId, $position)";

    if ($result = $conn->query($query)) {
        $query = "SELECT * FROM clients WHERE id = $lastId";
        if ($result = $conn->query($query)) {
            while ($row = mysqli_fetch_assoc($result)) {
                $client =
                    [
                    "id" => $row["ID"],
                    "name" => $row["Name"],
                    "abbrevation" => $row["Abbrevation"],
                ];
            }
        }
    }
    echo ($conn->error);
}

echo ($conn->error);

$clientJSON = json_encode($client);
echo $clientJSON;
mysqli_close($conn);
