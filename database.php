<?php 

//AWS Database
//$host = "glancedbinstance.ccw7olvlgk06.us-east-2.rds.amazonaws.com";
//$user = "glancemaster";
//$pswd = "glancemaster";
//$dbnm = "glancedatabase";

$host = "127.0.0.1";
$user = "root";
$pswd = "";
$dbnm = "test";

$conn = new mysqli($host, $user, $pswd, $dbnm);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}