<?php

/*
file removeClients.php

Takes a client ID no handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$id = $_POST['clientID']; //Client name retrieved from post
$abbrevation = $_POST['abbrevation'];
$board = 1;

$query = "DELETE FROM ALLOCATIONS WHERE AllocatedTo = '$abbrevation'";
$conn->query($query);

$query = "DELETE FROM BOARDCLIENTS WHERE BoardID = $board AND ClientID = $id";
$conn->query($query);

$query = "DELETE FROM clients WHERE ID = $id";
$conn->query($query);
echo ($conn->error);

mysqli_close($conn);
