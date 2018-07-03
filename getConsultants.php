<?php

require_once 'database.php';

//Query to retrieve all client names from clients table
$query = "SELECT * FROM consultants";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    $consultantsArray = array();
    while ($row = $result->fetch_assoc()) {
        $consultant =
            [
            "id" => $row['ConsultantID'],
            "name" => $row['ConsultantName'],
            "role" => $row['ConsultantJob'],
            "allocation0" => $row['MondayAm'],
            "allocation1" => $row['MondayPm'],
            "allocation2" => $row['TuesdayAm'],
            "allocation3" => $row['TuesdayPm'],
            "allocation4" => $row['WednesdayAm'],
            "allocation5" => $row['WednesdayPm'],
            "allocation6" => $row['ThursdayAm'],
            "allocation7" => $row['ThursdayPm'],
            "allocation8" => $row['FridayAm'],
            "allocation9" => $row['FridayPm'],
        ];
        array_push($consultantsArray, $consultant);
    }
}
// Convert Array to JSON String
$consultantsJSON = json_encode($consultantsArray);
echo $consultantsJSON;
mysqli_close($conn);
