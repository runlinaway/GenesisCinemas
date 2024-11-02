<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Query to find all wine items (adjust based on your database structure)
$sql = "SELECT id, name, vintage, region, description, price, image_url FROM wine_selection LIMIT 4"; // Limiting to 4 items

try {
    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch results
    $wineItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($wineItems);
} catch (PDOException $e) {
    // Handle query error
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection (optional, as it's done automatically at the end of the script)
$conn = null; 
?>
