<?php
function queryDatabase_www($sql)
{
    $conn = mysqli_connect("db_honey","web","P@ssw0rd", "www");
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}

# Sanitize input before being added to SQL query
function inputSanitize_www($input): string
{
    $conn = new mysqli("db_honey","web","P@ssw0rd", "www");
    return mysqli_real_escape_string($conn, $input);
}

function queryDatabase_honeywall($sql)
{
    $conn = mysqli_connect("db_honey","web","P@ssw0rd", "honeywall");
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}

# Sanitize input before being added to SQL query
function inputSanitize_honeywall($input): string
{
    $conn = new mysqli("db_honey","web","P@ssw0rd", "honeywall");
    return mysqli_real_escape_string($conn, $input);
}