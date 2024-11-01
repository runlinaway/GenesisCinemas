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
    
    // Ensure that email is available
    if (isset($userData['email'])) {
        $email = $userData['email'];

        try {
            // Update the session_token in the database
            $sql = "UPDATE members SET session_token = NULL WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->execute(['email' => $email]);

            // Delete the user cookie
            setcookie('user', '', time() - 3600, "/"); // Expire the cookie

            // Return a success response
            echo json_encode(['success' => true, 'message' => 'Logged out successfully.']);
        } catch (PDOException $e) {
            // Handle any database errors
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            exit;
        } catch (Exception $e) {
            // Handle any unexpected errors
            echo json_encode(['success' => false, 'message' => 'An unexpected error occurred.']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User data not found.']);
    }
} else {
    // If the cookie doesn't exist, return a message
    echo json_encode(['success' => false, 'message' => 'No user is logged in.']);
}

// Close the connection
$conn = null;
