<?php
header('Content-Type: application/json');
require_once '../utils/db_connection.php';

try {
    if (!isset($_GET['showtime_id'])) {
        throw new Exception('Showtime ID is required');
    }

    $showtime_id = $_GET['showtime_id'];
    
    $query = "
        SELECT s.title, st.show_date, l.name as location_name
        FROM showtimes st
        JOIN shows s ON st.show_id = s.show_id
        JOIN locations l ON st.location_id = l.location_id
        WHERE st.showtime_id = :showtime_id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->execute(['showtime_id' => $showtime_id]);
    
    $details = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($details);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 