<?php
header('Content-Type: application/json');
require_once '../utils/db_connection.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        throw new Exception('Invalid JSON data received');
    }
    
    // Debug log
    error_log('Received booking data: ' . print_r($data, true));
    
    // Validate required data
    if (!isset($data['showtime_id']) || !isset($data['seats']) || !isset($data['total'])) {
        throw new Exception('Missing required booking data');
    }

    $conn->beginTransaction();

    // Handle member_id properly (could be null for guest bookings)
    $member_id = null;
    if (isset($data['member_id']) && !empty($data['member_id'])) {
        // Verify member exists
        $memberCheck = $conn->prepare("SELECT member_id FROM members WHERE member_id = ?");
        $memberCheck->execute([$data['member_id']]);
        if ($memberCheck->fetch()) {
            $member_id = $data['member_id'];
        } else {
            error_log('Member ID not found in database: ' . $data['member_id']);
        }
    }

    error_log('Using member_id: ' . ($member_id ?? 'null')); // Debug log

    // Insert booking
    $bookingQuery = "INSERT INTO bookings (member_id, showtime_id, booking_date, seats_booked, seat_loc, price, payment_status) 
                     VALUES (:member_id, :showtime_id, NOW(), :seats_booked, :seat_loc, :price, 'completed')";
    
    $stmt = $conn->prepare($bookingQuery);
    $stmt->execute([
        'member_id' => $member_id,
        'showtime_id' => $data['showtime_id'],
        'seats_booked' => count($data['seats']),
        'seat_loc' => implode(',', $data['seats']),
        'price' => $data['total']
    ]);

    $bookingId = $conn->lastInsertId();

    // Insert payment
    $paymentQuery = "INSERT INTO payments (booking_id, payment_date, amount, status) 
                     VALUES (:booking_id, NOW(), :amount, 'completed')";
    
    $stmt = $conn->prepare($paymentQuery);
    $stmt->execute([
        'booking_id' => $bookingId,
        'amount' => $data['total']
    ]);

    // Update member points if logged in
    if ($member_id && isset($data['points']) && $data['points'] > 0) {
        error_log('Updating points for member: ' . $member_id . ' with points: ' . $data['points']); // Debug log
        
        $pointsQuery = "UPDATE members SET points = points + :points WHERE member_id = :member_id";
        $stmt = $conn->prepare($pointsQuery);
        $stmt->execute([
            'points' => $data['points'],
            'member_id' => $member_id
        ]);
        
        // Verify points were updated
        $verifyPoints = $conn->prepare("SELECT points FROM members WHERE member_id = ?");
        $verifyPoints->execute([$member_id]);
        $newPoints = $verifyPoints->fetchColumn();
        error_log('New points total: ' . $newPoints); // Debug log
    }

    $conn->commit();
    echo json_encode([
        'success' => true,
        'debug' => [
            'member_id' => $member_id,
            'points_added' => $data['points'] ?? 0
        ]
    ]);

} catch (Exception $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    error_log('Booking error: ' . $e->getMessage()); // Debug log
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage(),
        'debug' => [
            'member_id' => $member_id ?? null,
            'data' => $data ?? null
        ]
    ]);
}
?> 