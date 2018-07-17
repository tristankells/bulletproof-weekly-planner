<?php
// Include config file
require_once 'backend/database.php';

// Define varaible and initilaise with empty values
$username = $password = "";
$msg = "";

// Processing form data when form is submitted
if ($_SERVER['REQUEST_METHOD'] == "POST") {

	// Check if username or password haven't been entered
	if (empty(trim($_POST['username'])) || empty(trim($_POST['password']))) {
        $msg = urlencode("Please fill in all the fields. ");
		header("Location: ./index.php?msg=" . $msg);
		echo($username .  $password);
        exit();
    } else { 
		$username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $passwordHash = sha1($password);

		$passwordCheckQuery = "SELECT username,login_password FROM user_profile WHERE username='$username'";

		//Check if query succesful
        if ($passwordCheckSql = mysqli_query($conn, $passwordCheckQuery)) {
            $numOfuser_profile = mysqli_num_rows($passwordCheckSql);
            if ($numOfuser_profile == 0) {
                $msg = urlencode("No user found");
                header("Location: ./index.php?msg=" . $msg);
                exit();
            } else if ($numOfuser_profile == 1) {
                $user_profilePassword = "";
                while ($row = mysqli_fetch_assoc($passwordCheckSql)) {
                    $user_profilePassword = $row['login_password'];
                }
                if (strcmp($passwordHash, $user_profilePassword)) {
                    $msg = urlencode("Incorrect password" . $passwordHash . "    " . $user_profilePassword);
                    header("Location: ./index.php?msg=" . $msg);
                    exit();
                } else {
					$msg = urlencode("Correct Password");
					
					//Save username to session
					session_start();
					$_SESSION['username'] = $username;

                    header("Location: ./index.html");
                    exit();
                }
            } else {
                $msg = urlencode("Duplicate username found");
                header("Location: ./index.php?msg=" . $msg);
                exit();
            }

            mysqli_free_result($passwordCheckSql);
        } else {
            $msg = urlencode("password checking query error");
            header("Location: ./index.php?msg=" . $msg);
            exit();
        }
        $msg = urlencode("success");
        header("Location: ./index.php?msg=" . $msg);
        exit();
    }
}
