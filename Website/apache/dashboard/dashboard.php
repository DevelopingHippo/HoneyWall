<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <script src="../js/js_functions.js"></script>
</head>
<body>
<h1><b>Dashboard</b></h1>
<button type="button" onclick="changeColor()">Try it</button>

<?php
require_once "../php/database_functions.php";
$results = queryDatabase_honeywall("SELECT * FROM connections");
echo $results;
?>
</body>
</html>