<?php

require_once '../database.php';

session_start();

$email = $_SESSION['email'];
$theme = $_POST['theme'];
$_SESSION['theme'] = $theme;
$query = "UPDATE user_profile
SET theme = $theme
WHERE email = '$email';";



$results = mysqli_query($conn, $query);
echo (mysqli_error($conn));
