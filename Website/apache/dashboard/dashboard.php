<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <script src="../js/js_functions.js"></script>
  <script src="../js/d3.v7.js"></script>
  <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
<h1><b>Dashboard</b></h1>
<button type="button" onclick="changeColor()">Try it</button>

<script>
var data = [2, 4, 8, 10]
var pie = d3.pie()
console.log(pie(data))
</script>





<?php
require_once "../php/database_functions.php";
$result = queryDatabase_honeywall("SELECT * FROM connections");
while($row = mysqli_fetch_array($result))
{
    print_r($row);
}
?>
</body>
</html>