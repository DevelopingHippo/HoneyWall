<?php
session_start();
if (!isset($_SESSION["type"])) {
    $_SESSION["type"] = "";
    header("location: /html/login.php");
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