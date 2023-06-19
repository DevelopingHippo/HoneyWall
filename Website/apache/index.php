<?php
session_start();
if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] == "false")
 {
     $_SESSION["loggedIn"] = "false";
     header("location: /auth/login.php");
     exit();
 }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HoneyWall - Home</title>
</head>
<body>
    <h1>This is the index page</h1>
</body>
</html>