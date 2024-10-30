<?php
// db_connection.php

$dsn = 'mysql:host=localhost;dbname=genesiscinemas;charset=utf8'; // Data Source Name
$username = 'root'; // Your database username
$password = ''; // Your database password

try {
    // Create a PDO instance
    $conn = new PDO($dsn, $username, $password);
    
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Optional: Set the charset to UTF-8 (already done in DSN)
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Return the connection object
return $conn;
?>
