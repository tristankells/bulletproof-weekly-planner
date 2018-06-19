<?php

require_once 'databaseConnection.php';
require_once 'functions.php';



//Query to retrieve all client names from clients table
$query = "SELECT * FROM clients";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        addClient($row['clientName'],$row['clientAbbrev']);
    }
}

echo "";

mysqli_close($conn);