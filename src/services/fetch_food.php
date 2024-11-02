<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Query to find all food items (adjust based on your database structure)
$sql = "SELECT id, name, description, price, image_url FROM food LIMIT 4"; // Limiting to 4 items

try {
    // Prepare and execute the query
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    
    // Fetch results
    $foodItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Debug output to check the fetched image URLs
    foreach ($foodItems as $item) {
        if (empty($item['image_url'])) {
            echo json_encode(['error' => 'Image URL is empty for item ID ' . $item['id']]);
            return;
        }
    }
    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($foodItems);
} catch (PDOException $e) {
    // Handle query error
    echo json_encode(['error' => $e->getMessage()]);
}

// Close the connection (optional, as it's done automatically at the end of the script)
$conn = null; 
?>
