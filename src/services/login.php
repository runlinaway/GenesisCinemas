<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection and assign it to $conn
$conn = include '../utils/db_connection.php';

header('Content-Type: application/json');

// Read input data
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email']);
$password = trim($data['password']);

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit; // Ensure script stops here
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

try {
    // Check if the email exists
    $sql = "SELECT * FROM members WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Email not found.']);
        exit;
    }

    // Fetch the user data
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Verify the password
    if (!password_verify($password, $user['password_hash'])) {
        echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
        exit;
    }

    // Check if the session token is empty
    if (empty($user['session_token'])) {
        // Generate a new session token
        $token = bin2hex(random_bytes(16)); // Simplified token example

        // Update the session_token in the database
        $updateSql = "UPDATE members SET session_token = :token WHERE email = :email";
        $updateStmt = $conn->prepare($updateSql);
        $updateStmt->execute(['token' => $token, 'email' => $email]);
    } else {
        // Use the existing session token
        $token = $user['session_token'];
    }

    error_log("Token: " . var_export($token, true));
    // Create user data array
    $userData = [
        'name' => $user['member_name'],
        'email' => $email
    ];

    $cookieData = json_encode(['name' => $user['member_name'], 'email' => $email, 'token' => $token]);
    setcookie('user', $cookieData, 0, "/"); // 0 timing till browser close for my sanity

    echo json_encode(['success' => true, 'userData' => $userData]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    exit; // Ensure script stops here
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'An unexpected error occurred.']);
    exit; // Ensure script stops here
}

// Close the connection (optional as it’s automatically closed at the end of the script)
$conn = null;
