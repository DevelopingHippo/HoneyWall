<?php
session_start();
if (!isset($_SESSION["loggedIn"]))
{
    $_SESSION["type"] = "false";
}

require_once "../php/database_functions.php";

if($_POST["password1"] != $_POST["password2"])
{
    header("location: /auth/register.php?status=password_mismatch");
    exit();
}


if(empty($_POST["username"]) || empty($_POST["password1"]) || ($_POST["password1"] !=  $_POST["password2"]) || empty($_POST["email"]) || empty($_POST["first_name"]) || empty($_POST["last_name"])) # If user input is empty AND passwords don't match
{
    # Redirect user back to Registration page with Status Message
    header("location: /auth/register.php?status=missinginput");
    exit();
}


$username = inputSanitize_www($_POST["username"]);
$password = inputSanitize_www(hash("sha256", $_POST["password1"]));
$email = inputSanitize_www($_POST["email"]);
$first_name = inputSanitize_www($_POST["first_name"]);
$last_name = inputSanitize_www($_POST["last_name"]);

$sql = "SELECT username FROM users WHERE username='".$username."';";
$result = queryDatabase_www($sql);

if(mysqli_num_rows($result) > 0) # If Username already exists
{
    # Redirect to Register page with Status Message
    header("location: /auth/register.php?status=userexists");
    exit();
}

$sql = "INSERT INTO users VALUES ('".$username."','".$password."','".$email."','".$first_name."','".$last_name."',false);";
$result = queryDatabase_www($sql);

# If everything is successful, redirect to Login page
header("location: /auth/login.php");
exit();