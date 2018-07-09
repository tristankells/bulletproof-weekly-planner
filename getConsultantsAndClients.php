<?php

require_once 'database.php';

$query = "";

//Check if table exists, otherwise create table
$result = $conn->query("SHOW TABLES LIKE 'clients'");

if ($result->num_rows == 1) {
   
} else {
    

    $query = "CREATE TABLE clients (
        ClientID int NOT NULL AUTO_INCREMENT,
        ClientName VARCHAR(100) UNIQUE,
        ClientAbbrevation VARCHAR(3) UNIQUE,
        PRIMARY KEY (ClientID)
        )";

    $conn->query($query);
}

//Query to retrieve all client names from clients table
$query = "SELECT * FROM clients";

//Run query on connection
$result = $conn->query($query);

$clientsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $client =
            [
            "id" => $row['ClientID'],
            "name" => $row['ClientName'],
            "abbrevation" => $row['ClientAbbrevation'],
        ];
        array_push($clientsArray, $client);
    }
}

$result = $conn->query("SHOW TABLES LIKE 'consultants'");

if ($result->num_rows == 1) {
 
} else {
   

    $query = "CREATE TABLE consultants (
        ConsultantID int NOT NULL AUTO_INCREMENT,
        ConsultantName VARCHAR(100) UNIQUE,
        ConsultantJob VARCHAR(50),
        Allocation0 VARCHAR(3),
        Allocation1 VARCHAR(3),
        Allocation2 VARCHAR(3),
        Allocation3 VARCHAR(3),
        Allocation4 VARCHAR(3),
        Allocation5 VARCHAR(3),
        Allocation6 VARCHAR(3),
        Allocation7 VARCHAR(3),
        Allocation8 VARCHAR(3),
        Allocation9 VARCHAR(3),
        PRIMARY KEY (ConsultantID)
        )";

    $conn->query($query);
}

//Query to retrieve all client names from clients table
$query = "SELECT * FROM consultants";

//Run query on connection
$result = $conn->query($query);

$consultantsArray = array();
//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {

    while ($row = $result->fetch_assoc()) {
        $consultant =
            [
            "id" => $row['ConsultantID'],
            "name" => $row['ConsultantName'],
            "role" => $row['ConsultantJob'],
            "allocation0" => $row['Allocation0'],
            "allocation1" => $row['Allocation1'],
            "allocation2" => $row['Allocation2'],
            "allocation3" => $row['Allocation3'],
            "allocation4" => $row['Allocation4'],
            "allocation5" => $row['Allocation5'],
            "allocation6" => $row['Allocation6'],
            "allocation7" => $row['Allocation7'],
            "allocation8" => $row['Allocation8'],
            "allocation9" => $row['Allocation9'],
        ];
        array_push($consultantsArray, $consultant);
    }
}
// Convert Array to JSON String
$returnArrays = array($consultantsArray, $clientsArray);
echo json_encode($returnArrays);
mysqli_close($conn);
