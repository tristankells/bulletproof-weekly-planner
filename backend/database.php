<?php

$host = "127.0.0.1";
$user = "root";
$pswd = "";
$dbnm = "glance";

$conn = new mysqli($host, $user, $pswd, $dbnm);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
