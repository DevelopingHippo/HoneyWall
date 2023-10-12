<?php
session_start();
if (!isset($_SESSION["uid"]))
{
    session_destroy();
}
# If uid is set, destroy session
if(isset($_SESSION['uid'])){
    $_SESSION['uid'] = "";
    $_SESSION['loggedIn'] = "false";
    $_SESSION['admin'] = "false";
    session_destroy();
}
# Redirect to Home page
header("location: /auth/login.php");
exit();