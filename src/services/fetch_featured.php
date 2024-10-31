<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Query to find all entries where banner is not null
$sql = "SELECT show_id, title, synopsis, banner_url FROM shows WHERE banner_url IS NOT NULL";

try {
    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch results
    $shows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($shows);
} catch (PDOException $e) {
    // Handle query error
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection (optional, as it's done automatically at the end of the script)
$conn = null; 
?>
