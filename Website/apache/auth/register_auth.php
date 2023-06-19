<?php
session_start();
if (!isset($_SESSION["loggedIn"]))
{
    $_SESSION["type"] = "false";
}
require_once "../php/database_functions.php";

if(empty($_POST["username"]) || empty($_POST["password1"]) || ($_POST["password1"] !=  $_POST["password2"]) || empty($_POST["email"]) || empty($_POST["first_name"]) || empty($_POST["last_name"])) # If user input is empty AND passwords don't match
{
    # Redirect user back to Registration page with Status Message
    header("location: /auth/register.php?status=missinginput");
    exit();
}


$username = inputSanitize($_POST["username"]);
$password = inputSanitize(hash("sha256", $_POST["password1"]));
$email = inputSanitize($_POST["email"]);
$first_name = inputSanitize($_POST["first_name"]);
$last_name = inputSanitize($_POST["last_name"]);

$sql = "SELECT username FROM users WHERE username='".$username."';";
$result = queryDatabase($sql);

if(mysqli_num_rows($result) > 0) # If Username already exists
{
    # Redict to Register page with Status Message
    header("location: /auth/register.php?status=userexists");
    exit();
}

$sql = "INSERT INTO users VALUES ('".$username."','".$password."','".$email."','".$first_name."','".$last_name."',false);";
$result = queryDatabase($sql);

# If everything is successful, redirect to Login page
header("location: /auth/login.php");
exit();