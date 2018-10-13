<?php 
	session_start(); 
if(isset($_COOKIE['email']))
{
    $_SESSION['email'] = $_COOKIE['email'];
	$_SESSION['authentication']=1;
}

if(isset($_SESSION['authentication'])&&$_SESSION['authentication']==1)
    header("Location: ./week-calendar.php");?>
<?php
//Include GP config file && User class
include_once 'gpConfig.php';
include_once 'User.php';

if(isset($_GET['code'])){
	$gClient->authenticate($_GET['code']);
	$_SESSION['token'] = $gClient->getAccessToken();
	header('Location: ' . filter_var($redirectURL, FILTER_SANITIZE_URL));
}

if (isset($_SESSION['token'])) {
	$gClient->setAccessToken($_SESSION['token']);
}

if ($gClient->getAccessToken()) {
	//Get user profile data from google
	$gpUserProfile = $google_oauthV2->userinfo->get();
	
	//Initialize User class
	$user = new User();
	
	//Insert or update user data to the database
    $gpUserData = array(
        'oauth_provider'=> 'google',
        'oauth_uid'     => $gpUserProfile['id'],
        'first_name'    => $gpUserProfile['given_name'],
        'last_name'     => $gpUserProfile['family_name'],
        'email'         => $gpUserProfile['email'],
        'gender'        => $gpUserProfile['gender'],
        'locale'        => $gpUserProfile['locale'],
        'picture'       => $gpUserProfile['picture'],
        'link'          => $gpUserProfile['link']
    );
    $userData = $user->checkUser($gpUserData);
	$_SESSION['email'] = $gpUserProfile['email'];
    $_SESSION['authentication'] = 1;
	header('Location: ./week-calendar.php');
	exit();
}
	$authUrl = $gClient->createAuthUrl();
	$output = '<a href="'.filter_var($authUrl, FILTER_SANITIZE_URL).'"><img src="img/glogin.png" alt=""/></a>';
	//$output = '<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>';


?>
    <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title> Glance: Manage your team </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="style/login-style.css">
    <script src="js/login-screen/SharedLoginFunctionsModule.js"></script>
    <script src="js/login-screen/LoginModule.js"></script>
    <script src="js/login-screen/RegisterModule.js"></script>
    <script src="js/login-screen/ResetLostPasswordModule.js"></script>
    <script src="js/login-screen/login_index.js"></script>
    <script>
    $(document).ready(function () {
        <?php if(isset($_SESSION['message'])) {
    echo "var message = '".$_SESSION['message']."';";
    echo "alert(message);";
    unset($_SESSION['message']);
} ?>
});
</script>
</head>

<body>
    <div class="container-fluid login-page" id="background">
        <div class="row-fluid logo">
            <img class="logo-image" src="img/bulletproof-logo-white.png">
        </div>
        <div class="form">
            <div class="login-form">
                <form id='login-form'>
                    <input id='email-input' type="text" placeholder="email" />
                    <input id='password-input' type="password" placeholder="password" />
                    <button type='submit' id='login-button'>Login</button>
                    <input style="float:left; width: 10%; margin: 10px 0 15px 0;" id='staying_logged' type="checkbox"/> 
                    <p style="font-size: 10px; width: 90%; margin: 10px 0 15px 0; text-align: left;">Keep me signed in</p>
					<!-- <div><?php echo $output; ?></div> -->
                </form>
                <p class="message">
                    <!-- Not registered?
                    <a class="register-form-btn" href="#">Create an account</a><br> -->
                    Forgot password?
                    <a class="reset-form-btn" href="#">Reset password</a>
                </p>
            </div>
            <div class="reset-form">
                <input id='reset-email-input' type="text" placeholder="email" />
                <button id='reset-btn'>Reset Password</button>
                <p class="message">Remember your password?
                    <a class="login-form-btn" href="#">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>