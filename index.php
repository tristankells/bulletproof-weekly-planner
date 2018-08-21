<?php session_start(); 
if(isset($_SESSION['authentication'])&&$_SESSION['authentication']==1)
    header("Location: ./week-calendar.php");?>
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
    <script src="js/login-screen/LoginModule.js"></script>
    <script src="js/login-screen/RegisterModule.js"></script>
    <script src="js/login-screen/ResetLostPasswordModule.js"></script>
    <script src="js/login-screen/app.js"></script>
    $(document).ready(function () {
        <?php if(isset($_SESSION['message'])) {
    echo "var message = '".$_SESSION['message']."';";
    echo "alert(message);";
    unset($_SESSION['message']);
} ?>
});
</head>

<body>
    <div class="container-fluid login-page" id="background">
        <div class="row-fluid logo">
            <img class="logo-image" src="img/glance_logo_white_lg.png">
        </div>
        <div class="form">
            <div class="register-form">
                <input type="text" id='register-firstname-input' placeholder="first name" />
                <input type="text" id='register-lastname-input' placeholder="last name" />
                <input type="text" id='register-email-input' placeholder="email address" />
                <input type="password" id='register-password-input' placeholder="password" />
                <input type="password" id='register-repassword-input' placeholder="enter password again" />
                <button id='register-button'>Create</button>
                <p class="message">Already registered?
                    <a class="login-form-btn" href="#">Sign In</a>
                </p>
            </div>
            <div class="login-form">
                <input id='email-input' type="text" placeholder="email" />
                <input id='password-input' type="password" placeholder="password" />
                <button id='login-button'>Login</button>
                <p class="message">Not registered?
                    <a class="register-form-btn" href="#">Create an account</a>
                </p>
                <p class="message">Forgot password?
                    <a class="reset-form-btn" href="#">Reset password</a>
                </p>
            </div>
            <div class="reset-form">
                <input id='reset-email-input' type="text" placeholder="email" />
                <button id='reset-btn'>Reset password</button>
                <p class="message">Not registered?
                    <a class="register-form-btn" href="#">Create an account</a>
                </p>
                <p class="message">Remember your password?
                    <a class="login-form-btn" href="#">Sign In</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>