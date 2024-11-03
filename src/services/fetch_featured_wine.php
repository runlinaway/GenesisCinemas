<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Query to find all featured wines
$sql = "SELECT id, name, description, image_url FROM wine WHERE featured = 1"; // Fetching wines marked as featured

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
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection (optional, as it's done automatically at the end of the script)
$conn = null; 
?>
