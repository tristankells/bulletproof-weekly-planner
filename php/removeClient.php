<?php

/*
file removeClients.php

Takes a client ID no handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$id = $_POST['clientID']; //Client name retrieved from post
$board = 1;

$query = "DELETE FROM allocation WHERE client_id = $id";
$conn->query($query);

$query = "DELETE FROM client WHERE id = $id";
$conn->query($query);

mysqli_close($conn);
