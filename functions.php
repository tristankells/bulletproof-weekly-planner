<?php

function addClient($name, $abbreviation)
{
    echo "<tr>";
    echo "<td id='clientName'>$name</td>";
    echo "<td id='clientAbrevation'>$abbreviation</td>";
    echo "<td> </td>";
    echo "<td><input type='button' id='removeClient' value='REMOVE'/></td>";
    echo "</tr>";
    echo "</tr>";
}

//Php function that takes a consultant name, an string array of client names, and string array of that consultants allocations
//The function outputs a table row for a consultants
function addConsultant($name, $clients, $currentAllocations)
{
    echo "<tr>";
    echo "<td colspan='2'><input id='consultantName' value = '$name'> </td>"; //Set consultant name
    for ($x = 0; $x < 10; $x++) { //Iterate through the ten dropdown lists that make up a client potnetial AM/PM allocations
        echo "<td ><select class='form-control clientdropdown'><option></option>"; //
        if (sizeof($clients) > 0) { //If clients exist, populate dropdown options
            for ($i = 0; $i < sizeof($clients); $i++) { 
                echo "<option value='$clients[$i]' ";
                
                if ($clients[$i] == $currentAllocations[$x]) //If name of client being added to dropdown is the same as the name of the client allocated in the current alllocation array set opttion to selected.
                {
                    echo "selected='selected'";
                }
                echo ">$clients[$i]</option>";
            }
        }
        echo "</select></td>";
    }
    echo "<td><input type='button' id='removeConsultant' value='REMOVE'/></td>";
    echo "</tr>";
}
