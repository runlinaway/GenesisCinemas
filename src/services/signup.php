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
$name = trim($data['name']);
$email = trim($data['email']);
$password = trim($data['password']);

// Validate input
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit; // Ensure script stops here
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}
if (!preg_match('/^[a-zA-Z0-9]+$/', $password)) {
    echo json_encode(['success' => false, 'message' => 'Password must be alphanumeric.']);
    exit;
}

try {
    // Check if the email already exists
    $sql = "SELECT * FROM members WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->execute(['email' => $email]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email is already registered.']);
        exit;
    }

    // Hash the password and insert the new user
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $sql = "INSERT INTO members (member_name, email, password_hash, points) VALUES (:member_name, :email, :password_hash, 0)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt->execute(['member_name' => $name, 'email' => $email, 'password_hash' => $password_hash])) {
        // Generate a session token
        $token = bin2hex(random_bytes(16)); // Simplified token example

        // Create user data array
        $userData = [
            'name' => $name,
            'email' => $email
        ];

        $cookieData = json_encode(['name' => $name, 'email' => $email, 'token' => $token]);
        setcookie('user', $cookieData, 0, "/"); // 0 timing till browser close for my sanity

        echo json_encode(['success' => true, 'token' => $token]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    exit; // Ensure script stops here
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'An unexpected error occurred.']);
    exit; // Ensure script stops here
}

// Close the connection (optional as it’s automatically closed at the end of the script)
$conn = null;
