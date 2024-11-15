# Genesis Cinemas

A functional cinema website built for the web development course **IE4727** at **NTU**.

---

## Technology Stack

### Frontend
- Vanilla **JavaScript** with **Web Components**
- Custom **CSS** styling
- **Responsive** design
- **Dynamic routing**

### Backend
- **PHP 7.4+**
- **MySQL/MariaDB**
- **PDO** for database operations
- **RESTful API** architecture

### Database Schema
The application uses multiple interconnected tables:
- `members`
- `shows`
- `locations`
- `showtimes`
- `bookings`
- `payments`
- `food`
- `drinks`
- `wine`
- `alcohol`
- `inquiries`

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/genesis-cinemas.git

2.	Set up the database:
    ```bash
    mysql -u root -p < databaseinit.sql

3. Configure your web server (Apache/Nginx) to point to the project directory.

4. Update database connection settings in: src/utils/db_connection.php
    ```php
    $host = 'localhost';
    $dbname = 'your_database_name';
    $username = 'your_username';
    $password = 'your_password';

## Project Structure
    genesis-cinemas/
    ├── src/
    │ ├── assets/
    │ ├── components/
    │ ├── pages/
    │ ├── services/
    │ └── utils/
    ├── index.html
    ├── app.js
    └── databaseinit.sql

## API Endpoints

### Movies
- `fetch_now_showing.php`: Get currently showing movies
- `fetch_upcoming.php`: Get upcoming movies
- `fetch_movie.php`: Get specific movie details
- `fetch_showtimes.php`: Get movie showtimes

### Bookings
- `process_booking.php`: Handle booking submissions
- `fetch_booked_seats.php`: Get occupied seats
- `fetch_showtime_details.php`: Get specific showtime information

### Corporate
- `form_submit.php`: Handle corporate inquiries

