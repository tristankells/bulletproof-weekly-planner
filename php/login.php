<?php
// Include config file
require_once 'database.php';

// Define varaible and initilaise with empty values
$dynamicData = "";

$dynamicData = $_POST['dynamicData'];
// Processing form data when form is submitted

if ($_SERVER['REQUEST_METHOD'] == "POST") {

    // Check if email or password haven't been entered
    if (empty(trim($dynamicData['email'])) || empty(trim($dynamicData['password']))) {
        echo ("Please fill in all the fields. ");
        exit();
    } else {
        $email = mysqli_escape_string($conn, $dynamicData['email']);
        $password = mysqli_escape_string($conn, $dynamicData['password']);

        $passwordCheckQuery = "SELECT email,login_password FROM user_profile WHERE email='$email'";

        //Check if query succesful
        if ($passwordCheckSql = mysqli_query($conn, $passwordCheckQuery)) {
            $numOfuser_profile = mysqli_num_rows($passwordCheckSql);

            //Check if any user match that email
            if ($numOfuser_profile == 0) {
                echo ("No user found");
                exit();
            }

            //Check that one user matches email
            else {
                $user_profilePassword = "";
                while ($row = mysqli_fetch_assoc($passwordCheckSql)) {
                    $user_profilePassword = $row['login_password'];
                }
                if (!(password_verify($password, $user_profilePassword))) {
                    echo ("Incorrect password");
                    exit();
                } else {
                    //Save email to session
                    session_start();
                    $_SESSION['email'] = $email;
                    echo ('success');
                }
            }

            mysqli_free_result($passwordCheckSql);
        } else {
            echo ("password checking query error");
            exit();
        }
    }
}
