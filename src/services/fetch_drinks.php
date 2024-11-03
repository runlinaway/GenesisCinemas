<?php
// fetch_drinks.php

// Include the database connection
$conn = require '../utils/db_connection.php';

try {
    // Prepare the SQL query to fetch required columns
    $stmt = $conn->prepare("SELECT id, name, description, price, image_url 
                            FROM drinks");

    // Execute the query
    $stmt->execute();

    // Fetch all results as an associative array
    $drinks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the results as JSON
    echo json_encode($drinks);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
