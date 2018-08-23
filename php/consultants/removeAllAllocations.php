<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once '../database.php';

$board = 1;

$query = "DELETE allocation
FROM allocation 
LEFT OUTER JOIN consultant ON allocation.consultant_id = consultant.id
WHERE consultant.board_id = $board";

$conn->query($query);

echo ($conn->error);

mysqli_close($conn);
