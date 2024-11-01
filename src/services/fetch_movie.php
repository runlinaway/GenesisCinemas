<?php
// fetch_movie.php
header('Content-Type: application/json');

// Include the database connection
$conn = require '../utils/db_connection.php';

try {
    if (isset($_GET['title'])) {
        $title = urldecode($_GET['title']); // Decode the URI-encoded title
        $stmt = $conn->prepare("SELECT * FROM shows WHERE title = :title");
        $stmt->bindParam(':title', $title, PDO::PARAM_STR);
        $stmt->execute();

        $movie = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($movie);
    } else {
        echo json_encode(['error' => 'No title provided']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
