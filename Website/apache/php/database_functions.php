<?php
function queryDatabase($sql)
{
    $conn = mysqli_connect("db_honey","web","P@ssw0rd", "www");
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}

# Sanitize input before being added to SQL query
function inputSanitize($input): string
{
    $conn = new mysqli("db_honey","web","P@ssw0rd", "www");
    return mysqli_real_escape_string($conn, $input);
}