<?php
session_start();
if(!isset($_SESSION["admin"]) || $_SESSION["admin"] != "true")
{
    header("location: /auth/login.php");
    exit();
}
?>
<!DOCTYPE html>
<?php
require_once "../php/web_functions.php";
loginCheck();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="panel.css">
    <link rel="stylesheet" href="../css/site-global.css">
</head>
<body>
</body>
<?php
printFooter();
?>
</html>