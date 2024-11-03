<?php
// Include the database connection
$conn = require '../utils/db_connection.php';

// Modified query to find wines with featured banner URLs
$sql = "SELECT name, description, featured_banner_url as image_url FROM wine WHERE featured_banner_url IS NOT NULL";

try {
    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch results
    $wines = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($wines);
} catch (PDOException $e) {
    // Handle query error
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection
$conn = null; 
?>
