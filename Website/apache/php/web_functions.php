<?php

function loginCheck(): void
{

    #    session_start();
    #if (!isset($_SESSION["loggedIn"]) || $_SESSION["loggedIn"] == "false")
    #{
    #    $_SESSION["loggedIn"] = "false";
    #    header("location: /auth/login.php");
    #    exit();
    #}

}




function printPreloader(): void
{
    echo
    '<div class="loader-wrapper">
<span class="loader"><span class="loader-inner"></span></span></div>
    <script>
        $(window).on("load", function(){
        $(".loader-wrapper").fadeOut("slow");
    });</script>';
}


function printHeader(): void
{
    if (isset($_SESSION["admin"]) && $_SESSION["admin"] == "true")
    {
        echo
        '<header>
            <h2 class="logo"><img src="data:image/png;base64,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"> honeywall</h2>
            <nav class="navigation">
                <a href="_blank">0/2312</a>
                <a href="/admin/panel.php">Settings</a>
                <a href="/auth/logout.php">Sign Out</a>
                <button onclick="location.href =\'/dashboard/dashboard.php\'" class="btnDashboard">Dashboard</button>
            </nav>
        </header>';
    }
    else {
        echo
        '<header>
            <h2 class="logo"><img src="data:image/png;base64,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"> honeywall</h2>
            <nav class="navigation">
                <a href="_blank">0/2312</a>
                <a href="/auth/logout.php">Sign Out</a>
                <button onclick="location.href =\'/dashboard/dashboard.php\'" class="btnDashboard">Dashboard</button>
            </nav>
        </header>';
    }
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