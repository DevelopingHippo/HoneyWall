<?php
session_start();
if (!isset($_SESSION["type"]))
{
    $_SESSION["type"] = "";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="../css/login.css">
    <title>HoneyWall - Login</title>
</head>
<body>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="../php/login_auth.php" method="POST">
                    <h2>Login</h2>
                    <div class="inputbox">
                        <ion-icon name="person-outline"></ion-icon>
                        <input type="text" name="username" required>
                        <label for="">Username</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" name="password" required>
                        <label for="">Password</label>
                    </div>
                    <div class="forget">
                        <label for=""><input type="checkbox" id="remember" name="remember" value="true">Remember Me?</label>
                        <a href="ADD A LINK HERE FOR SOMETHING">Forgot Password</a>
                    </div>
                    <button type="submit" formaction="../php/login_auth">Log In</button>
                    <div class="register">
                    <p>Don't have an account? <a href="register.php">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>