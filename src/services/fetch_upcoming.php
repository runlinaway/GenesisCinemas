<?php
// fetch_now_showing.php

// Include the database connection
$conn = require '../utils/db_connection.php';

try {
    // Prepare the SQL query to fetch required columns where release_date is earlier than today
    $stmt = $conn->prepare("SELECT title, poster_url, director, cast 
                            FROM shows 
                            WHERE release_date > NOW()");

    // Execute the query
    $stmt->execute();

    // Fetch all results as an associative array
    $shows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Output the results as JSON
    echo json_encode($shows);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>