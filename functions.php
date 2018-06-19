<?php

function addClient($name, $abbreviation)
{
    echo "<tr>";
    echo "<td id='clientName'>$name</td>";
    echo "<td>($abbreviation)</td>";
    echo "<td> </td>";
    echo "<td><input type='button' id='removeClient' value='REMOVE'/></td>";
    echo "</tr>";
    echo "</tr>";
}

function addConsultant($name, $clients)
{
    echo "<tr>";
    echo "<td colspan='2'><input id='consultantName' value = '$name'> </td>";
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
