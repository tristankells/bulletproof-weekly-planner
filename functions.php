<?php

function addClient($name)
{
    echo "<tr>";
    echo "<td id='clientName'>" . $name . "</td>";
    echo "<td> </td>";
    echo "<td><input type='button' id='removeClient' value='REMOVE'/></td>";
    echo "</tr>";
    echo "</tr>";
}

function addConsultant($name, $clients)
{
    $clientNames = array();


    if ($clients->num_rows > 0) {
        while ($row = $clients->fetch_assoc()) {
            array_push($clientNames, $row['clientName']);
        }
    }

    echo "<tr>";
    echo "<td colspan='2'><input id='consultantName' contenteditable='true' value = '$name'> </td>";
    for ($x = 0; $x < 10; $x++) {
        echo "<td><select class='form-control' id='clientdropdown'><option></option>";
        if (sizeof($clientNames) > 0 ) {
            for ($i = 0; $i < sizeof($clientNames);$i++) {
                echo "<option>" . $clientNames[$i]  . "</option>";
            }
        }
        echo "</td>";
    }
    echo "<td><input type='button' id='removeConsultant' value='REMOVE'/></td>";
    echo "</tr>";
}
