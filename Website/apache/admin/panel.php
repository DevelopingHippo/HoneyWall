<?php
session_start();
if(!isset($_SESSION["admin"]) || $_SESSION["admin"] != "true")
{
    header("location: /auth/login.php");
    exit();
}