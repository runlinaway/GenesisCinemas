<?php
// Include the database connection
$conn = require '../utils/db_connection.php'; // Adjust the path as needed

// Get the wine name from the query string
$name = isset($_GET['name']) ? $_GET['name'] : null;

if ($name) {
    // Prepare a SQL query to find the wine by name
    $sql = "SELECT id, name, vintage, region, description, price, image_url FROM wine WHERE name = :name LIMIT 1"; // Limit to 1 item

    try {
        // Prepare and execute the query
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->execute();
        
        // Fetch results
        $wineItem = $stmt->fetch(PDO::FETCH_ASSOC);

        // Return results as JSON
        header('Content-Type: application/json');
        echo json_encode($wineItem ? $wineItem : ['error' => 'Wine not found']);
    } catch (PDOException $e) {
        // Handle query error
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    // If no name is provided
    echo json_encode(['error' => 'No wine name provided']);
}

// Close the connection (optional, as it's done automatically at the end of the script)
$conn = null; 
?>
