<?php
require_once '../utils/db_connection.php';

try {
    if (!isset($_GET['show_id'])) {
        throw new Exception('Show ID is required');
    }

    $show_id = $_GET['show_id'];
    
    $query = "
        SELECT l.name as location_name, 
               GROUP_CONCAT(TIME_FORMAT(s.show_date, '%H:%i') ORDER BY s.show_date SEPARATOR ',') as times,
               l.location_id,
               DATE(s.show_date) as show_date
        FROM showtimes s
        JOIN locations l ON s.location_id = l.location_id
        WHERE s.show_id = :show_id
        GROUP BY l.location_id, l.name, DATE(s.show_date)
        ORDER BY l.name, show_date
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute(['show_id' => $show_id]);
    $showtimes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($showtimes);

} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
