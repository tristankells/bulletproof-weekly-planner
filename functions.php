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
    echo "<tr>";
    echo "<td id='consultantName' colspan='2'>" . $name . "</td>";
    for ($x = 0; $x < 10; $x++) {
        echo "<td><select class='form-control' id='clientdropdown'><option></option>";
        if (sizeof($clients) > 0 ) {
            for ($i = 0; $i < sizeof($clients);$i++) {
                echo "<option>" . $clients[$i]  . "</option>";
            }
        }
        echo "</td>";
    }
    echo "<td><input type='button' id='removeConsultant' value='REMOVE'/></td>";
    echo "</tr>";
}
