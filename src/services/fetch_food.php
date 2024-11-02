<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Query to find all food items (adjust based on your database structure)
// $sql = "SELECT id, name, description, price, image_url FROM food"; // Limiting to 4 items

try {
    // Prepare and execute the query
    $stmt = $conn->prepare("SELECT id, name, description, price, image_url  FROM food");
    $stmt->execute();
    
    // Fetch results
    $foodItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return results as JSON
    header('Content-Type: application/json');
    echo json_encode($foodItems);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>
