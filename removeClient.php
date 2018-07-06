<?php

/*
file removeClients.php

Takes a client ID no handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$clientID = $_POST['clientID']; //Client name retrieved from post

$query = "SELECT ClientAbbrevation FROM clients WHERE ClientID = '$clientID'";

$result = $conn->query($query);

$row = $result->fetch_assoc();

$clientAbbrevation = $row['ClientAbbrevation'];

$query = "DELETE FROM clients WHERE ClientID = '$clientID'";

$result = $conn->query($query);

//Check for any consultants allocated to the client and remove their allocation
$i = 0;
for ($i; $i < 10; $i++) {
    $query = "UPDATE Consultants SET allocation$i = null WHERE allocation$i = '$clientAbbrevation'";
    $conn->query($query);
}

mysqli_close($conn);
