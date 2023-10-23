<?php
ini_set('display_errors', 0);
session_start();
if (!isset($_SESSION["loggedIn"]))
{
    $_SESSION["loggedIn"] = "false";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="registerStyle.css">
    <title>HoneyWall - Register</title>
</head>
<body>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="register_auth.php" method="POST">
                    <h2>Register</h2>
                    <div class="inputbox">
                        <ion-icon name="person-outline"></ion-icon>
                        <input type="text" name="username" required>
                        <label for="">Username</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" name="password1" required>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" name="password2" required>
                        <label for="">Confirm Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" name="email" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="person-circle-outline"></ion-icon>
                        <input type="text" name="first_name" required>
                        <label for="">First Name</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="person-circle-outline"></ion-icon>
                        <input type="text" name="last_name" required>
                        <label for="">Last Name</label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    </section>
    <?php
    $status = $_GET["status"];
    if($status == "badpassword")
    {
        echo "<script>alert('Bad input!');</script>";
    }
    else if($status == "userexists")
    {
        echo "<script>alert('Username already exists!');</script>";
    }
    else if($status == "password_mismatch")
    {
        echo "<script>alert('Passwords do not match!');</script>";
    }
    ?>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>