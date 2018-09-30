<?php

/*
file removeConsultant.php

Takes a client name handed in from POST and removes the the database record with
that name.
 */

require_once '../database.php';

$dynamicData = $_POST['dynamicData'];
$id = $dynamicData['id'];
$monday = $dynamicData["monday"];
$sunday = $dynamicData["sunday"];

echo($monday . $sunday);

$query = "DELETE allocation
    FROM allocation
    LEFT OUTER JOIN consultant ON allocation.consultant_id = consultant.id
    WHERE consultant.id = $id
    AND date_created >= '$monday'
    AND date_created <= '$sunday'";

$conn->query($query);

echo ($conn->error);

mysqli_close($conn);
