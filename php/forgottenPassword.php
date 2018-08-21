<?php

require_once 'database.php';

$email = "";

/*
Accept email of user whose password is to be reset
Send email to user to reset their password
 */
if (isset($_POST['email'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    // ensure that the user exists on our system
    $query = "SELECT email FROM user_profile WHERE email='$email'";
    $results = mysqli_query($conn, $query);
    echo(mysqli_error($conn));

    if (mysqli_num_rows($results) <= 0) {

        echo ("Sorry, no user exists on our system with that email");
    } else {
        // generate a unique random token of length 100
        $newPassword = bin2hex(random_bytes(50));
        $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        $query = "UPDATE user_profile SET login_password = '$newPasswordHash' WHERE email='$email'";
        $results = mysqli_query($conn, $query);
        echo(mysqli_error($conn));
        // Send email to user with the token in a link they can click on
        $to = $email;
        $subject = "Reset your password on glance.com";
        $msg = "Hi there, your temporary password is  $newPassword";
        $msg = wordwrap($msg, 70);
        $headers = "From: info@glance.com";
        mail($to, $subject, $msg, $headers);

        echo ("A temporary password has been sent to your email, please use this login. Password is  $newPassword");

    }
}
