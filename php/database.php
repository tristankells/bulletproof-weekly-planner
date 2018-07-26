<?php

$host = "localhost";
$user = "root";
$pswd = "root";
$dbnm = "glance";

$conn = new mysqli($host, $user, $pswd, $dbnm);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
