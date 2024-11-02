<?php
header('Content-Type: application/json');

require_once '../utils/db_connection.php';

try {
    $stmt = $conn->prepare("SELECT * FROM locations");
    $stmt->execute();
    $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($locations);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?> 