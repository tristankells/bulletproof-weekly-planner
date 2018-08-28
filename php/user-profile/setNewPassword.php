<?php

require_once '../database.php';

session_start();

$dynamicData = $email = "";

$dynamicData = $_POST["dynamicData"];
$email = $_SESSION['email'];
/*
Accept email of user whose password is to be reset
Send email to user to reset their password
 */

// ensure that the user exists on our system
$query = "SELECT email, login_password  FROM user_profile WHERE email='$email'";
$results = mysqli_query($conn, $query);
echo (mysqli_error($conn));

if (mysqli_num_rows($results) <= 0) {

    echo ("Sorry, no user exists on our system with that email");
} else {
    $user_profilePassword = "";
    while ($row = mysqli_fetch_assoc($results)) {
        $user_profilePassword = $row['login_password'];
    }
    if (!(password_verify($dynamicData["oldPassword"], $user_profilePassword))) {
        echo ("Incorrect password");
        exit();
    } else {
        $newPasswordHash = password_hash($dynamicData["newPassword"], PASSWORD_DEFAULT);

        $query = "UPDATE user_profile SET login_password = '$newPasswordHash' WHERE email='$email'";
        $results = mysqli_query($conn, $query);
        echo (mysqli_error($conn));

        echo ("Your password has been set");
    }
}
