<?php

require_once 'databaseConnection.php';
require_once 'functions.php';

echo "<select class='form-control' ><option></option>";
//Query to retrieve all client names from clients table
$query = "SELECT ClientAbbrevation FROM clients";

//Run query on connection
$result = $conn->query($query);

//If clients in database, insert a table row for each one
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<option id='" . $row["ClientAbbrevation"] . "'>" . $row["ClientAbbrevation"] . "</option>";
    }
}
mysqli_close($conn);
