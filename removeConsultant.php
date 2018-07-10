<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once 'database.php';

$id = $_POST['consultantID']; //Client name retrieved from post
$board = 1;

$query = "DELETE FROM ALLOCATIONS WHERE ConsultantID = $id";
$conn->query($query);

$query = "DELETE FROM BOARDCONSULTANTS WHERE BoardID = $board AND ConsultantID = $id";
$conn->query($query);

$query = "DELETE FROM consultants WHERE ID = $id";
$conn->query($query);
echo ($conn->error);
mysqli_close($conn);
