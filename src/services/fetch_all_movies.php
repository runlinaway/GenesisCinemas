<?php
header('Content-Type: application/json');

require_once '../utils/db_connection.php';

try {
    $stmt = $conn->prepare("
        SELECT s.*, l.name as location_name, l.location_id,
        GROUP_CONCAT(DISTINCT st.show_date) as show_dates
        FROM shows s
        LEFT JOIN showtimes st ON s.show_id = st.show_id
        LEFT JOIN locations l ON st.location_id = l.location_id
        GROUP BY s.show_id, l.location_id
    ");
    
    $stmt->execute();
    $movies = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($movies);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?> 