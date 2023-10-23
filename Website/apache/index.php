<?php
session_start();
ini_set('display_errors', 0);
if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] == "false")
 {
     $_SESSION["loggedIn"] = "false";
     setcookie("pie-chart-1-selection", "username");
     setcookie("pie-chart-2-selection", "password");
     setcookie("pie-chart-3-selection", "src_ip");
     setcookie("pie-chart-4-selection", "location");

     setcookie("vert-1-selection", "username");
     setcookie("vert-2-selection", "password");
     setcookie("vert-3-selection", "src_ip");
     setcookie("vert-4-selection", "location");
 }
header("location: /auth/login.php");
exit();


