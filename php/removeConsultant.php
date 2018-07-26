<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$id = $_POST['consultantID']; //Client name retrieved from post
$board = 1;

$query = "DELETE FROM allocation WHERE consultant_id = $id";
$conn->query($query);

$query = "DELETE FROM consultant WHERE id = $id";
$conn->query($query);

mysqli_close($conn);
