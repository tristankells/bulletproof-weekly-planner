<?php

// Include config file
require_once 'database.php';

// Define varaible and initilaise with empty values
$firstName = $lastName = $password = $email = $savePassword = "";

// Processing form data when form is submitted

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Check if username or password haven't been entered

    $email = $_POST['email'];
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $password = $_POST['password'];
    $savePassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO  user_profile (first_name,last_name,email,login_password )
        VALUES ('$firstName','$lastName','$email','$savePassword')";

    //Check if query succesful
    if (mysqli_query($conn, $query)) {
        echo ("Sucess");
    } else {
        echo (mysqli_error($conn));
    }

}
