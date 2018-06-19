<?php

/*
file removeClients.php

Takes a client name handed in from POST and removes the the database record with 
that name.
*/

require_once 'databaseConnection.php';

$clientName = $_POST['clientName']; //Client name retrieved from post

$query = "DELETE FROM clients WHERE clientName = '" . $clientName ."'";

$result = $conn->query($query);

mysqli_close($conn);