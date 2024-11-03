<?php
header('Content-Type: application/json');
require_once '../utils/db_connection.php';

try {
    if (!isset($_GET['showtime_id'])) {
        throw new Exception('Showtime ID is required');
    }

    $showtime_id = $_GET['showtime_id'];
    
    // Simpler query first to debug
    $query = "SELECT seat_loc FROM bookings WHERE showtime_id = :showtime_id AND payment_status = 'completed'";
    
    $stmt = $conn->prepare($query);
    $stmt->execute(['showtime_id' => $showtime_id]);
    
    $bookedSeats = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Process the seats to split them into an array
    $allSeats = [];
    foreach ($bookedSeats as $booking) {
        $seatArray = explode(',', $booking['seat_loc']);
        foreach ($seatArray as $seat) {
            $allSeats[] = ['seat_loc' => trim($seat)];
        }
    }
    
    echo json_encode($allSeats);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 