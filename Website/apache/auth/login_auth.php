<?php
session_start();
if (!isset($_SESSION["loggedIn"]))
{
    $_SESSION["loggedIn"] = "";
}
require_once "../php/database_functions.php";

if(!empty($_POST["username"]) && !empty($_POST["password"])) # If Username and Password NOT empty
{
    $username = inputSanitize_www($_POST["username"]);
    $password = hash('sha256', $_POST["password"]);
    $password = inputSanitize_www($password);
}
else # redirect the user to Login page with status message
{
    header("location: /auth/login.php?status=loginfail");
    exit();
}

$sql = "SELECT isAdmin FROM users WHERE username='".$username."' AND password='".$password."';";
$result = queryDatabase_www($sql);
if (mysqli_num_rows($result) > 0) # If query comes back with results
{
    $row = $result->fetch_assoc();
    $_SESSION["uid"] = $username;
    if($row["isAdmin"] == "1")
    {
        $_SESSION["admin"] = "true";
    }
    else
    {
        $_SESSION["admin"] = "false";
    }
    $_SESSION["loggedIn"] = "true";
    header("location: /dashboard/dashboard.php");
}
else # redirect the user to Login page with status message
{
    header("location: /auth/login.php?status=loginfail");
}
exit();