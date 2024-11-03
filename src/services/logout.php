<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Include the database connection and assign it to $conn
$conn = include '../utils/db_connection.php';

// Start the session to access session variables
session_start();

// Check if user cookie exists
if (isset($_COOKIE['user'])) {
    // Get the user data from the cookie
    $userData = json_decode($_COOKIE['user'], true);
    
    // Debug log
    error_log("User data from cookie: " . print_r($userData, true));
    
    // Ensure that email is available
    if (isset($userData['email'])) {
        $email = $userData['email'];
        
        try {
            // Debug log before query
            error_log("Attempting to clear session_token for email: " . $email);
            
            // Update the session_token in the members table to NULL
            $sql = "UPDATE members SET session_token = NULL WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $result = $stmt->execute(['email' => $email]);
            
            // Debug log after query
            error_log("Query executed. Affected rows: " . $stmt->rowCount());

            // Delete the user cookie
            setcookie('user', '', time() - 3600, "/");

            // Destroy the session
            session_destroy();

            // Return a success response
            echo json_encode(['success' => true, 'message' => 'Logged out successfully.']);
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            exit;
        } catch (Exception $e) {
            error_log("Unexpected error: " . $e->getMessage());
            echo json_encode(['success' => false, 'message' => 'An unexpected error occurred.']);
            exit;
        }
    } else {
        error_log("Email not found in user data");
        echo json_encode(['success' => false, 'message' => 'User data not found.']);
    }
} else {
    error_log("No user cookie found");
    echo json_encode(['success' => false, 'message' => 'No user is logged in.']);
}

// Close the connection
$conn = null;
