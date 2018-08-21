<?php

// Include config file
require_once 'database.php';

// Define varaible and initilaise with empty values
$dynamicData = $firstName = $lastName = $password = $email = $savePassword = "";

// Processing form data when form is submitted

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    // Check if username or password haven't been entered
    $dynamicData = $_POST['dynamicData'];
    $email = $dynamicData['email'];
    $firstName = $dynamicData['firstName'];
    $lastName = $dynamicData['lastName'];
    $password = $dynamicData['password'];
    $savePassword = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO  user_profile (first_name,last_name,email,login_password )
        VALUES ('$firstName','$lastName','$email','$savePassword')";

    //Check if query succesful
    if (mysqli_query($conn, $query)) {
        session_start(); 
        $_SESSION['message'] = "Account Successfully Created. You Can Now Login";
        echo ('success');
    } else {
        echo ("Pleaser Enter A Unique Email Adress");
    }

}
