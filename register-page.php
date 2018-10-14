
    <!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title> Bulletproof </title>
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
            <div class="register-form">
                <input type="text" id='register-firstname-input' placeholder="first name" />
                <input type="text" id='register-lastname-input' placeholder="last name" />
                <input type="text" id='register-email-input' placeholder="email address" />
                <input type="password" id='register-password-input' placeholder="password" />
                <input type="password" id='register-repassword-input' placeholder="enter password again" />
                <button id='register-button'>Create</button>
            </div>
        </div>
    </div>
</body>
</html>