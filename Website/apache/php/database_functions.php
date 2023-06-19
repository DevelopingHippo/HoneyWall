<?php
function queryDatabase($sql)
{
    $conn = mysqli_connect("db_honeywall","web","P@ssw0rd", "web");
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}

# Sanitize input before being added to SQL query
function inputSanitize($input): string
{
    $conn = new mysqli("db_honeywall","web","P@ssw0rd", "web");
    return mysqli_real_escape_string($conn, $input);
}