<?php
// Include the database connection file
require_once '../utils/db_connection.php'; // Update the path as per your directory structure

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
    $movieTitle = isset($_POST['movie-title']) ? htmlspecialchars($_POST['movie-title']) : '';
    $eventDate = isset($_POST['event-date']) ? htmlspecialchars($_POST['event-date']) : '';
    $eventName = isset($_POST['event-name']) ? htmlspecialchars($_POST['event-name']) : 'N/A';
    $numberOfPax = isset($_POST['number-of-pax']) ? (int)$_POST['number-of-pax'] : 0;
    $preferredTime = isset($_POST['preferred-time']) ? htmlspecialchars($_POST['preferred-time']) : '';

    // Validate required fields
    if (empty($name) || empty($email) || empty($message) || empty($movieTitle) || empty($eventDate) || empty($numberOfPax) || empty($preferredTime)) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
        exit;
    }

    try {
        // Save data to the database
        $sql = "INSERT INTO inquiries (name, email, message, movie_title, event_date, event_name, number_of_pax, preferred_time) 
                VALUES (:name, :email, :message, :movie_title, :event_date, :event_name, :number_of_pax, :preferred_time)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
            ':movie_title' => $movieTitle,
            ':event_date' => $eventDate,
            ':event_name' => $eventName,
            ':number_of_pax' => $numberOfPax,
            ':preferred_time' => $preferredTime
        ]);

        // Construct the email content
        $to = "user@localhost"; // Replace with the email address to receive inquiries
        $subject = "Corporate Inquiry from $name";
        $emailMessage = "
            A new corporate inquiry has been submitted:

            - Name: $name
            - Email: $email
            - Message: $message
            - Movie Title: $movieTitle
            - Event Date: $eventDate
            - Event Name: $eventName
            - Number of Pax: $numberOfPax
            - Preferred Time: $preferredTime
        ";

        $headers = "From: noreply@localhost\r\n" .
                   "Reply-To: $email\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send the email
        if (mail($to, $subject, $emailMessage, $headers)) {
            // Success response
            echo json_encode(['status' => 'success', 'message' => 'Your inquiry has been submitted successfully and saved to the database.']);
        } else {
            echo json_encode(['status' => 'success', 'message' => 'Data saved to the database, but the email could not be sent.']);
        }
    } catch (PDOException $e) {
        // Handle database errors
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Failed to save data to the database.', 'error' => $e->getMessage()]);
    }
} else {
    // Handle invalid request methods
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
