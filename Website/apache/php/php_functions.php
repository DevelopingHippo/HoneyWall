<?php

function printHeader(): void
{
    echo
'<header>
    <h2 class="logo"><ion-icon name="leaf-outline"></ion-icon> Honey Wall</h2>
        <nav class="navigation">
            <a href="/auth/logout.php">Sign Out</a>
            <a href="/account/profile.php">Profile</a>
            <button class="btnDashboard">Dashboard</button>
        </nav>
</header>';
}

function printFooter(): void
{
    echo '
<footer>
    <nav class="navigation">
        <a href="https://www.linkedin.com/in/thadsander" target="_blank">Thad Sander</a>
        <a href="https://www.ethanbrinks.com/" target="_blank">Ethan Brinks</a>
        <a href="#" target="_blank">Aston Purdom</a>
        <a href="https://github.com/DevelopingHippo/HoneyWall" target="_blank">GitHub Repo</a>
    </nav>
</footer>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
';
}