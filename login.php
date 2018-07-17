<?php
 session_start();

$username = isset($_POST['username']) ? trim($_POST['username']) : 0;
$password = isset($_POST['password']) ? trim($_POST['password']) : 0;
$msg="";
if(empty($username) || empty($password))
{
	$msg = urlencode("Please fill in all the fields. ");
	header("Location: ./index.php?msg=".$msg);
	exit();
}
else
{
	$passwordHash = sha1($password);
	require './database.php';
	$passwordCheckQuery = "SELECT username,login_password FROM user_profile WHERE username='$username'";
	if($passwordCheckSql = mysqli_query($conn,$passwordCheckQuery))
	{
		$numOfuser_profile= mysqli_num_rows($passwordCheckSql);
		if($numOfuser_profile==0)
		{
			$msg = urlencode("No user found");
			header("Location: ./index.php?msg=".$msg);
			exit();
		}
		else if($numOfuser_profile==1)
		{
			$user_profilePassword="";
			while($row = mysqli_fetch_row($result))
			{
				$user_profilePassword = $row['login_password'];
			}
			if(strcmp($password,$user_profilePassword))
			{
				$msg = urlencode("Duplicate username found");
				header("Location: ./index.php?msg=".$msg);
				exit();
			}
			else
			{
				$msg = urlencode("Incorrect password");
				header("Location: ./index.php?msg=".$msg);
				exit();
			}
		}
		else
		{
			$msg = urlencode("Duplicate username found");
			header("Location: ./index.php?msg=".$msg);
			exit();
		}
		
		mysqli_free_result($passwordCheckSql);
	}
	else
	{
		$msg = urlencode("password checking query error");
		header("Location: ./index.php?msg=".$msg);
		exit();
	}
	$msg = urlencode("success");
	header("Location: ./index.php?msg=".$msg);
	exit();
}
?>