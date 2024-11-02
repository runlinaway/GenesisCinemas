<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection file and capture the returned PDO instance
$pdo = require_once '../utils/db_connection.php'; // Adjust path if necessary

// Check if the search parameter is set
if (isset($_GET['search'])) {
    // Get the search term and sanitize it
    $searchTerm = strtolower(trim($_GET['search'])); // Convert to lowercase and trim spaces

    // Prepare and execute the SQL query
    try {
        // Create a prepared statement
        $stmt = $pdo->prepare("SELECT title FROM shows WHERE LOWER(title) LIKE :searchTerm");
        $stmt->execute(['searchTerm' => '%' . $searchTerm . '%']);
        
        // Fetch results
        $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return results as JSON
        echo json_encode($movies);
    } catch (PDOException $e) {
        // Return error message in JSON format
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    // If no search term is provided, return an empty array
    echo json_encode([]);
}
