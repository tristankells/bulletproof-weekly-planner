<?php
require_once '../database.php';
session_start();

// Unset all of the session variables.
$_SESSION = array();

// If it's desired to kill the session, also delete the session cookie.
// Note: This will destroy the session, and not just the session data!
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
if (isset($_COOKIE['email'])) {
    unset($_COOKIE['email']);
    setcookie('email', null, -1, '/');
}  

//Include GP config file
include_once '../../gpConfig.php';

//Unset token and user data from session
unset($_SESSION['token']);
unset($_SESSION['userData']);

//Reset OAuth access token
$gClient->revokeToken();


// Finally, destroy the session.
session_destroy();
header("Location: ../../index.php");
?>