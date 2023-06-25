<?php

function printHeader(): void
{
    echo '<header>
            <h2 class="logo"><ion-icon name="leaf-outline"></ion-icon> Honey Wall</h2>
            
            <nav class="navigation">
                <a href="/auth/logout.php">Sign Out</a>
                <a href="/user/profile.php">Profile</a>
                <button class="btnDashboard">Dashboard</button>
            </nav>
        </header>
        ';
}