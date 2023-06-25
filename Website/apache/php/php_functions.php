<?php

function printHeader(): void
{
    echo '<header>
            <h2 class="logo">Logo</h2>
            <nav class="navigation">
                <a href="/auth/logout.php">Sign Out</a>
                <a href="#">Profile</a>
                <button class="btnDashboard">Dashboard</button>
            </nav>
        </header>
        ';
}