<?php
// Include config file
require_once 'backend/database.php';

// Define varaible and initilaise with empty values
$username = $password = "";

// Processing form data when form is submitted

if ($_SERVER['REQUEST_METHOD'] == "POST") {

	// Check if username or password haven't been entered
	if (empty(trim($_POST['username'])) || empty(trim($_POST['password']))) {
        echo("Please fill in all the fields. ");
        exit();
    } else { 
		$username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $passwordHash = sha1($password);

		$passwordCheckQuery = "SELECT username,login_password FROM user_profile WHERE username='$username'";

		//Check if query succesful
        if ($passwordCheckSql = mysqli_query($conn, $passwordCheckQuery)) {
			$numOfuser_profile = mysqli_num_rows($passwordCheckSql);
			
			//Check if any user match that username
            if ($numOfuser_profile == 0) {
                echo("No user found");
                exit();
			} 
			
			//Check that one user matches username
			else  {
                $user_profilePassword = "";
                while ($row = mysqli_fetch_assoc($passwordCheckSql)) {
                    $user_profilePassword = $row['login_password'];
                }
                if (strcmp($passwordHash, $user_profilePassword)) {
                    echo("Incorrect password" . $passwordHash . "    " . $user_profilePassword);
                    exit();
                } else {					
					//Save username to session
					session_start();
					$_SESSION['username'] = $username;
					echo('success');
                }
            } 

            mysqli_free_result($passwordCheckSql);
        } else {
            echo("password checking query error");
            exit();
        }
    }
}

