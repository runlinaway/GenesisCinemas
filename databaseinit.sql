DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS bookings; -- Drop dependent tables first
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS members;


CREATE TABLE IF NOT EXISTS members (
    member_id INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    points INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS shows (
    show_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    synopsis TEXT,
    cast TEXT,
    director VARCHAR(100),
    genre VARCHAR(100),
    duration TIME,
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),
    release_date DATETIME,
    poster_url VARCHAR(255),
    trailer_url VARCHAR(255) NULL,
    banner_url VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    show_id INT NOT NULL,
    booking_date DATETIME NOT NULL,
    seats_booked INT NOT NULL,
    seat_loc VARCHAR(50),
    price FLOAT NOT NULL,
    payment_status VARCHAR(50) CHECK (payment_status IN ('pending', 'failed', 'completed')),
    FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE SET NULL,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    payment_date DATETIME NOT NULL,
    amount FLOAT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'failed', 'completed')),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);

SHOW TABLES;

INSERT INTO shows (title, synopsis, cast, director, genre, duration, rating, release_date, poster_url, trailer_url, banner_url) VALUES
(
    'Akira (1988)', 
    'In 2019, 31 years after nuking the city, Kaneda, a bike gang leader, tries to save his friend Tetsuo from a secret government project. He battles against anti-government activists, greedy politicians, irresponsible scientists and a powerful military leader until Tetsuo''s supernatural power suddenly manifests.', 
    'Mitsuo Iwata, Nozomu Sasaki, Mami Koyama, Taro Ishida, Tesshō Genda, Mizuho Suzuki',
    'Katsuhiro Otomo',
    'Anime, Action, Science Fiction', 
    '2:04:00', 
    5.0, 
    '1988-07-16 00:00:00', 
    'Akira.jpg', 
    NULL, 
    'akira_banner.jpg'
),
(
    'Transformers One', 
    'TRANSFORMERS ONE is the untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever. In the first-ever fully CG-animated Transformers movie.',
    'Chris Hemsworth, Brian Tyree Henry, Scarlett Johansson and Keegan-Michael Key, Steve Buscemi, with Laurence Fishburne, Jon Hamm',
    'Josh Cooley',
    'Action, Adventure, Science Fiction', 
    '1:44:00', 
    4.94,
    '2024-09-12 00:00:00', 
    'tfone.jpg', 
    NULL,
    'tfone_banner.jpeg'),
(
    'Alien: Romulus',
    'The sci-fi/horror-thriller takes the phenomenally successful “Alien” franchise back to its roots: While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
    'Isabela Merced, Cailee Spaeny, Archie Renaux',
    'Fede Alvarez',
    'Horror, Science Fiction',
    '1:59:00',
    4.84,
    '2024-08-15 00:00:00',
    'romulus.jpg',
    NULL,
    'romulus_banner.jpg'
),
(
    'Speak No Evil',
    'When an American family is invited to spend the weekend at the idyllic country estate of a charming British family they befriended on vacation, what begins as a dream holiday soon warps into a snarled psychological nightmare.',
    'James McAvoy, Mackenzie Davis, Aisling Franciosi, Alix West Lefler, Dan Hough, Scoot McNairy',
    'James Watkins',
    'Thriller',
    '1:50:00',
    3.9,
    '2024-09-12 00:00:00',
    'speaknoevil.jpg',
    NULL,
    NULL
),
(
    'It Ends With Us',
    'Global publishing phenomenon IT ENDS WITH US (Colleen Hoover''s beloved book) becomes an inspiring theatrical event. Lily Bloom (Blake Lively) leaves her small hometown to embark on a new life in Boston, chasing a lifelong dream of opening her own flower shop.\nA chance meeting with charming neurosurgeon Ryle Kincaid (Justin Baldoni) sparks an intense connection, but as the two fall deeply in love, Lily begins to see sides of Ryle he has attempted to keep hidden.\nWhen Lily''s first love, Atlas Corrigan (Brandon Sklenar), suddenly reenters her life, her relationship with Ryle is upended, and she realizes she must rely on her own strength to make an impossible choice for her future.',
    'Blake Lively, Justin Baldoni, Brandon Sklenar, Jenny Slate, Hasan Minhaj, Isabela Ferrer, Alex Neustaedter, Amy Morton',
    'Justin Baldoni',
    'Drama, Romance',
    '2:10:00',
    3.5,
    '2024-09-05 00:00:00',
    'itendswithus.jpg',
    NULL,
    NULL
);



