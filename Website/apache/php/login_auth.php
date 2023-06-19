<?php
session_start();
if (!isset($_SESSION["type"]))
{
    $_SESSION["type"] = "";
}
require_once "../php/database_functions.php";

if(!empty($_POST["username"]) && !empty($_POST["password"])) # If Username and Password NOT empty
{
    $username = inputSanitize($_POST["username"]);
    $password = inputSanitize($_POST["password"]);
}
else # redirect the user to Login page with status message
{
    header("location: /html/login.php?status=loginfail");
    exit();
}

$sql = "SELECT admin FROM users WHERE username='".$username."' AND password='".$password."';";
$result = queryDatabase($sql);

if ($result->num_rows == 1) # If query comes back with results
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
    header("location: /app/dashboard.html");
}
else # redirect the user to Login page with status message
{
    header("location: /html/login.php?status=loginfail");
}
exit();