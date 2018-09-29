<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once '../database.php';

$board = 1;
$dynamicData = $_POST["dynamicData"];
$monday = date("Y-m-d", strtotime($dynamicData["monday"]));
$sunday = date("Y-m-d", strtotime($dynamicData["sunday"]));

$query = "DELETE allocation
FROM allocation
LEFT OUTER JOIN consultant ON allocation.consultant_id = consultant.id
WHERE consultant.board_id = $board
AND date_created >= '$monday'
AND date_created <= '$sunday'";

$conn->query($query);

echo ($conn->error);

mysqli_close($conn);
