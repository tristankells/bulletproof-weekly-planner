<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once '../database.php';

$dynamicData = $_POST['dynamicData']; //Client name retrieved from post
$id = $dynamicData['id'];
$board = 1;

$query = "DELETE FROM allocation WHERE consultant_id = $id";
$conn->query($query);

$query = "DELETE FROM monthly_allocation WHERE consultant_id = $id";
$conn->query($query);

$query = "DELETE FROM consultant WHERE id = $id";
$conn->query($query);

mysqli_close($conn);
