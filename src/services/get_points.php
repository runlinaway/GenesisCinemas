<?php
error_reporting(0);

$pdo = require_once __DIR__ . '/../utils/db_connection.php';

header('Content-Type: application/json');

if (!isset($_GET['userId']) || !is_numeric($_GET['userId'])) {
    echo json_encode(['success' => false, 'message' => 'Valid User ID is required']);
    exit;
}

$userId = intval($_GET['userId']);

try {
    if (!isset($pdo)) {
        throw new Exception('Database connection not established');
    }

    $stmt = $pdo->prepare("SELECT points FROM members WHERE member_id = ?");
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['success' => true, 'points' => $result['points']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Member not found']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?> 