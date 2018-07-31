<?php

/*
file removeClients.php

Takes a client ID no handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$dynamicData = $_POST['dynamicData'];
$id = $dynamicData['id']; //Client name retrieved from post
$abbreviation = $dynamicData['abbreviation'];
$name = $dynamicData['name'];
$board = 1;

$query = "DELETE FROM allocation WHERE allocated_to = '$abbreviation'";
$conn->query($query);

$query = "DELETE FROM monthly_allocation WHERE allocated_to = '$name'";
$conn->query($query);

$query = "DELETE FROM client WHERE id = $id";
$conn->query($query);

mysqli_close($conn);
