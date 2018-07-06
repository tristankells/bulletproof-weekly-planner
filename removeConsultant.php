<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with 
that name.
*/

require_once 'database.php';

$consultantID = $_POST['consultantID']; //Client name retrieved from post

$query = "DELETE FROM consultants WHERE ConsultantID = '" . $consultantID ."'";

$result = $conn->query($query);

mysqli_close($conn);