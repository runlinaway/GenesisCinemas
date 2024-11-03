DROP TABLE IF EXISTS wine_selection;
DROP TABLE IF EXISTS wine;
DROP TABLE IF EXISTS alcohol;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS drinks;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS showtimes;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS wine_selection;
DROP TABLE IF EXISTS wine;
DROP TABLE IF EXISTS alcohol;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS drinks;



CREATE TABLE IF NOT EXISTS members (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    member_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    session_token VARCHAR(64)
)AUTO_INCREMENT=1;

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


CREATE TABLE IF NOT EXISTS locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT,
    city VARCHAR(50),
    postcode VARCHAR(20),
    contact_number VARCHAR(20)
);




CREATE TABLE IF NOT EXISTS showtimes (
    showtime_id INT AUTO_INCREMENT PRIMARY KEY,
    show_id INT NOT NULL,
    location_id INT NOT NULL,
    show_date DATETIME NOT NULL,
    price FLOAT NOT NULL,
    seats_available INT NOT NULL,
    FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    showtime_id INT NOT NULL,
    booking_date DATETIME NOT NULL,
    seats_booked INT NOT NULL,
    seat_loc VARCHAR(50),
    price FLOAT NOT NULL,
    payment_status VARCHAR(50) CHECK (payment_status IN ('pending', 'failed', 'completed')),
    FOREIGN KEY (member_id) REFERENCES members(member_id) ON DELETE SET NULL,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    payment_date DATETIME NOT NULL,
    amount FLOAT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('pending', 'failed', 'completed')),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);

-- CREATE TABLE IF NOT EXISTS showtimes (
--     showtime_id INT AUTO_INCREMENT PRIMARY KEY,
--     show_id INT NOT NULL,
--     location_id INT NOT NULL,
--     show_date DATETIME NOT NULL,
--     price FLOAT NOT NULL,
--     seats_available INT NOT NULL,
--     FOREIGN KEY (show_id) REFERENCES shows(show_id) ON DELETE CASCADE,
--     FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
-- );

CREATE TABLE IF NOT EXISTS drinks (
    drink_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    category VARCHAR(50),
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS alcohol (
    alcohol_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    price FLOAT NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS wine (
    wine_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    vintage INT,
    region VARCHAR(100),
    description TEXT,
    price FLOAT NOT NULL,
    image_url VARCHAR(255),
    featured_banner_url VARCHAR(255) DEFAULT NULL
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
    'https://www.youtube.com/watch?v=FtPhrCTjMtQ&ab_channel=Akira2019', 
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
    'https://www.youtube.com/watch?v=u2NuUWuwPCM&ab_channel=ParamountPictures',
    'tfone_banner.jpeg'
),
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
    'https://www.youtube.com/watch?v=x0XDEhP4MQs&ab_channel=20thCenturyStudios',
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
    'https://www.youtube.com/watch?v=FjzxI6uf8H8&ab_channel=UniversalPictures',
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
    'https://www.youtube.com/watch?v=DLET_u31M4M&ab_channel=SonyPicturesEntertainment',
    NULL
),
(
    'Red One',
    'After Santa Claus (code name: Red One) is kidnapped, the North Pole''s Head of Security (Dwayne Johnson) must team up with the world''s most infamous bounty hunter (Chris Evans) in a globe-trotting, action-packed mission to save Christmas.',
    'Dwayne Johnson, Chris Evans, Lucy Liu, J. K. Simmons',
    'Hiram Garcia',
    'Action, Adventure, Comedy, Fantasy, Mystery',
    '2:03:00',
    3.5,
    '2024-11-15 00:00:00',
    'redone.jpg',
    'https://www.youtube.com/watch?v=U8XH3W0cMss&ab_channel=AmazonMGMStudios',
    NULL
),
(
    'Gladiator II',
    'After his home is conquered by the tyrannical emperors who now lead Rome, Lucius is forced to enter the Colosseum and must look to his past to find strength to return the glory of Rome to its people.',
    'Paul Mescal, Pedro Pascal, Joseph Quinn, Fred Hechinger',
    'Ridley Scott',
    'Action, Adventure, Drama',
    '2:28:00',
    4.5,
    '2024-11-14 00:00:00',
    'gladiator2.jpg',
    'https://www.youtube.com/watch?v=4rgYUipGJNo&ab_channel=ParamountPictures',
    'gladiator2_banner.jpg'
),
(
    'Cars',
    'Lightning McQueen, a hotshot rookie race car driven to succeed, discovers that life is about the journey, not the finish line, when he finds himself unexpectedly detoured in the sleepy Route 66 town of Radiator Springs.',
    'Owen Wilson, Paul Newman, Bonnie Hunt, Larry the Cable Guy, Cheech Marin, Michael Keaton, Tony Shalhoub, John Ratzenberger, Paul Dooley, George Carlin',
    'John Lasseter',
    'Animation, Comedy, Family',
    '1:57:00',
    4.5,
    '2006-06-09 00:00:00',
    'cars.jpg',
    'https://www.youtube.com/watch?v=W_H7_tDHFE8&ab_channel=RottenTomatoesClassicTrailers',
    NULL
),
(
    'Wall-E',
    'In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    'Ben Burtt, Elissa Knight, Jeff Garlin, Fred Willard, John Ratzenberger, Kathy Najimy, Bill Irwin, Sigourney Weaver, Bob Peterson',
    'Andrew Stanton',
    'Animation, Adventure, Family',
    '1:38:00',
    4.5,
    '2008-06-27 00:00:00',
    'wall-e.jpg',
    'https://www.youtube.com/watch?v=CZ1CATNbXg0&ab_channel=RottenTomatoesClassicTrailers',
    NULL
),
(
    'Spirited Away',
    'In this animated feature by noted Japanese director Hayao Miyazaki, 10-year-old Chihiro and her parents move to a new town to start a new business. After her father becomes spellbound and wanders away, Chihiro embarks on a quest to save him from a menacing witch who seeks to exploit the young girl''s supernatural abilities.',
    'Rumi Hiiragi, Miyu Irino, Mari Natsuki, Takashi Naitô, Yasuko Sawaguchi, Tsunehiko Kamijo, Akihiro Miwa, Tōru Furuya, Yōji Matsuda, Yuriko Ishida',
    'Hayao Miyazaki',
    'Animation, Adventure, Family',
    '1:57:00',
    4.5,
    '2001-07-20 00:00:00',
    'spiritedaway.jpg',
    'https://www.youtube.com/watch?v=ByXuk9QqQkk&ab_channel=CrunchyrollStoreAustralia',
    NULL
),
(
    'Ready Player One',
    'In a world where the population is over 90% and the environment is devastated, a man finds refuge in a virtual reality game called the "OASIS".',
    'Tye Sheridan, Olivia Cooke, Ben Barnes, Lena Waithe, T.J. Miller, Simon Pegg, Mark Rylance, Anthony Hopkins',
    'Steven Spielberg',
    'Action, Adventure, Science Fiction',
    '2:00:00',
    4.5,
    '2018-03-10 00:00:00',
    'readyplayerone.jpg',
    'https://www.youtube.com/watch?v=cSp1dM2Vj48&ab_channel=WarnerBros.Pictures',
    NULL
),
(
    'The Transformers: The Movie',
    'In The Transformers: The Movie (1986), the iconic battle between the Autobots and Decepticons reaches new heights. With the arrival of the planet-devouring Unicron, the Autobots must rally together, embracing new allies and facing unimaginable odds to save their world from annihilation.',
    'Frank Welker, Kirby Morrow, Casey Kasem, Dan Gilvezan, Leonard Nimoy, Leonard Whiting, Roddy McDowall, Robert Stack, Leonard Nimoy, Leonard Whiting, Roddy McDowall, Robert Stack',
    'Nelson Shin',
    'Action, Adventure, Science Fiction',
    '1:37:00',
    4.5,
    '1986-08-08 00:00:00',
    'transformersmovie.jpg',
    'https://www.youtube.com/watch?v=KKb_93r41zw&ab_channel=JohnnyFrickinRico',
    'transformersmovie_banner.jpg'
);




INSERT INTO locations (name, address, city, postcode, contact_number) VALUES
(
    'The Lido',
    '350, Orchard Road, Shaw House, 5th/6th Floor',
    'Singapore',
    '238868',
    '+65 612345667'
),

(
    'nex',
    '23, Serangoon Central, nex, #04-64',
    'Singapore',
    '556083',
    '+65 62983557'
),

(
    'PLQ',
    '10 Paya Lebar Road, Paya Lebar Quarter, PLQ Mall, #05-02',
    'Singapore',
    '409057',
    '+65 63489545'
);

INSERT INTO showtimes (show_id, location_id, show_date, price, seats_available) VALUES
-- Shows for November 8th
(1, 1, '2024-11-08 10:00:00', 10.00, 50),  -- Akira showing all dates
(1, 2, '2024-11-08 13:00:00', 10.00, 50),
(1, 3, '2024-11-08 16:00:00', 10.00, 50),
(2, 1, '2024-11-08 11:00:00', 10.00, 50),  -- Transformers One showing all dates
(2, 2, '2024-11-08 14:00:00', 10.00, 50),
(2, 3, '2024-11-08 17:00:00', 10.00, 50),
(3, 1, '2024-11-08 10:30:00', 12.00, 50),  -- Alien showing only Nov 8
(3, 2, '2024-11-08 13:30:00', 12.00, 50),
(3, 3, '2024-11-08 16:30:00', 12.00, 50),
(8, 1, '2024-11-08 15:00:00', 12.00, 50),  -- Cars showing Nov 8 and 22
(8, 2, '2024-11-08 18:00:00', 12.00, 50),
(8, 3, '2024-11-08 21:00:00', 12.00, 50),
(10, 1, '2024-11-08 12:00:00', 12.00, 50), -- Spirited Away showing Nov 8 and 15
(10, 2, '2024-11-08 15:00:00', 12.00, 50),
(10, 3, '2024-11-08 18:00:00', 12.00, 50),
(11, 1, '2024-11-08 11:30:00', 12.00, 50), -- Ready Player One showing all dates
(11, 2, '2024-11-08 14:30:00', 12.00, 50),
(11, 3, '2024-11-08 17:30:00', 12.00, 50),
(12, 1, '2024-11-08 13:30:00', 12.00, 50), -- Transformers Movie showing Nov 8 and 22
(12, 2, '2024-11-08 16:30:00', 12.00, 50),
(12, 3, '2024-11-08 19:30:00', 12.00, 50),

-- Shows for November 15th
(1, 1, '2024-11-15 10:00:00', 10.00, 50),
(1, 2, '2024-11-15 13:00:00', 10.00, 50),
(1, 3, '2024-11-15 16:00:00', 10.00, 50),
(2, 1, '2024-11-15 11:00:00', 10.00, 50),
(2, 2, '2024-11-15 14:00:00', 10.00, 50),
(2, 3, '2024-11-15 17:00:00', 10.00, 50),
(4, 1, '2024-11-15 11:00:00', 12.00, 50),  -- Speak No Evil showing only Nov 15
(4, 2, '2024-11-15 14:00:00', 12.00, 50),
(4, 3, '2024-11-15 17:00:00', 12.00, 50),
(9, 1, '2024-11-15 16:00:00', 12.00, 50),  -- Wall-E showing Nov 15 and 22
(9, 2, '2024-11-15 19:00:00', 12.00, 50),
(9, 3, '2024-11-15 22:00:00', 12.00, 50),
(10, 1, '2024-11-15 12:00:00', 12.00, 50), -- Spirited Away showing Nov 8 and 15
(10, 2, '2024-11-15 15:00:00', 12.00, 50),
(10, 3, '2024-11-15 18:00:00', 12.00, 50),
(11, 1, '2024-11-15 11:30:00', 12.00, 50),
(11, 2, '2024-11-15 14:30:00', 12.00, 50),
(11, 3, '2024-11-15 17:30:00', 12.00, 50),

-- Shows for November 22nd
(1, 1, '2024-11-22 10:00:00', 10.00, 50),
(1, 2, '2024-11-22 13:00:00', 10.00, 50),
(1, 3, '2024-11-22 16:00:00', 10.00, 50),
(2, 1, '2024-11-22 11:00:00', 10.00, 50),
(2, 2, '2024-11-22 14:00:00', 10.00, 50),
(2, 3, '2024-11-22 17:00:00', 10.00, 50),
(5, 1, '2024-11-22 12:00:00', 12.00, 50),  -- It Ends With Us showing only Nov 22
(5, 2, '2024-11-22 15:00:00', 12.00, 50),
(5, 3, '2024-11-22 18:00:00', 12.00, 50),
(8, 1, '2024-11-22 15:00:00', 12.00, 50),
(8, 2, '2024-11-22 18:00:00', 12.00, 50),
(8, 3, '2024-11-22 21:00:00', 12.00, 50),
(9, 1, '2024-11-22 16:00:00', 12.00, 50),
(9, 2, '2024-11-22 19:00:00', 12.00, 50),
(9, 3, '2024-11-22 22:00:00', 12.00, 50),
(11, 1, '2024-11-22 11:30:00', 12.00, 50),
(11, 2, '2024-11-22 14:30:00', 12.00, 50),
(11, 3, '2024-11-22 17:30:00', 12.00, 50),
(12, 1, '2024-11-22 13:30:00', 12.00, 50), -- Transformers Movie showing Nov 8 and 22
(12, 2, '2024-11-22 16:30:00', 12.00, 50),
(12, 3, '2024-11-22 19:30:00', 12.00, 50);

DELETE FROM showtimes WHERE show_id IN (6, 7);
-- Inserting Drinks
INSERT INTO drinks (name, description, price, category, image_url) VALUES
('Coke', 'Classic Coca-Cola, refreshing and fizzy', 2.50, 'Drink', 'coke.jpg'),
('Sprite', 'Lemon-lime soda for a crisp, clean taste', 2.50, 'Drink', 'sprite.jpg'),
('Ice Water', 'Chilled purified water, perfect for hydration', 1.00, 'Drink', 'ice_water.jpg'),
('Coffee', 'Freshly brewed coffee for an energizing kick', 3.00, 'Drink', 'coffee.jpg'),
('Tea', 'Hot or iced tea, available in a variety of flavors', 2.50, 'Drink', 'tea.jpg');

-- Inserting Snacks
INSERT INTO food (name, description, price, category, image_url) VALUES
('Nuggets', 'Crispy chicken nuggets served with dipping sauce', 4.00, 'Snack', 'nuggets.jpg'),
('Fries', 'Golden french fries, crispy and salted', 3.50, 'Snack', 'fries.jpg'),
('Nacho Chips', 'Crispy tortilla chips served with cheese sauce', 4.50, 'Snack', 'nacho_chips.jpg'),
('Pizza', 'Individual-sized pizza with a selection of toppings', 8.00, 'Snack', 'pizza.jpg'),
('Hotdogs', 'Classic hotdogs with ketchup and mustard', 4.00, 'Snack', 'hotdogs.jpg'),
('Ice Cream', 'Creamy ice cream, available in different flavors', 3.00, 'Snack', 'ice_cream.jpg'),
('Cheesy Nuggets', 'Chicken nuggets stuffed with gooey cheese', 4.50, 'Snack', 'cheesy_nuggets.jpg'),
('Chilli Cheese Dog', 'Hotdog topped with spicy chili and melted cheese', 5.00, 'Snack', 'chilli_cheese_dog.jpg'),
('Popcorn', 'Buttery popcorn with a touch of sweetness', 2.50, 'Snack', 'popcorn.jpg'),
('Mozzarella Sticks', 'Crispy on the outside, gooey on the inside', 5.00, 'Snack', 'mozzarella_sticks.jpg');

-- Inserting Cocktails and Alcoholic Drinks
INSERT INTO alcohol (name, type, price, image_url) VALUES
('Martini', 'Cocktail', 10.00, 'martini.jpg'),
('Margarita', 'Cocktail', 9.00, 'margarita.jpg'),
('Negroni', 'Cocktail', 11.00, 'negroni.jpg'),
('Cosmopolitan', 'Cocktail', 10.50, 'cosmopolitan.jpg'),
('Gimlet', 'Cocktail', 8.50, 'gimlet.jpg'),
('Whiskey Sour', 'Cocktail', 9.50, 'whiskey_sour.jpg'),
('Mojito', 'Cocktail', 8.00, 'mojito.jpg'),
('Old Fashioned', 'Cocktail', 10.00, 'old_fashioned.jpg'),
('Long Island Iced Tea', 'Cocktail', 11.00, 'long_island_iced_tea.jpg'),
('Manhattan', 'Cocktail', 10.00, 'manhattan.jpg'),
('Bloody Mary', 'Cocktail', 9.00, 'bloody_mary.jpg'),
('Daiquiri', 'Cocktail', 8.50, 'daiquiri.jpg'),
('Gin and Tonic', 'Cocktail', 7.50, 'gin_and_tonic.jpg'),
('Moscow Mule', 'Cocktail', 9.00, 'moscow_mule.jpg'),
('Piña Colada', 'Cocktail', 9.50, 'pina_colada.jpg'),
('Tiger Beer', 'Beer', 6.00, 'tiger_beer.jpg'),
('Cider', 'Beer', 5.50, 'cider.jpg'),
('Penicillin', 'Cocktail', 11.00, 'penicillin.jpg'),
('Sazerac', 'Cocktail', 12.00, 'sazerac.jpg'),
('Spritz', 'Cocktail', 8.00, 'spritz.jpg'),
('Tequila Sunrise', 'Cocktail', 8.50, 'tequila_sunrise.jpg'),
('Mai Tai', 'Cocktail', 9.50, 'mai_tai.jpg'),
('Mimosa', 'Cocktail', 7.50, 'mimosa.jpg'),
('Passionfruit Martini', 'Cocktail', 10.50, 'passionfruit_martini.jpg');


-- Insert Wines (modified version)
INSERT INTO wine (name, vintage, region, description, price, image_url, featured_banner_url) VALUES
('Cloudy Bay Sauvignon Blanc', 2021, 'Marlborough, New Zealand', 'Crisp and vibrant Sauvignon Blanc with citrus and tropical notes', 25.00, 'cloudy_bay_sauvignon_blanc.jpg', 'cloudy_bay_featured_banner.jpg'),
('Cabernet Sauvignon', 2020, 'Napa Valley, USA', 'Rich and full-bodied with flavors of dark fruit and oak', 30.00, 'cabernet_sauvignon.jpg', NULL),
('Catena Zapata', 2019, 'Mendoza, Argentina', 'Elegant red wine with notes of dark berries and spice', 35.00, 'catena_zapata.jpg', NULL),
('Merlot', 2020, 'Bordeaux, France', 'Soft and smooth with flavors of ripe plum and cherry', 22.00, 'merlot.jpg', NULL),
('Barons de Rothschild Legende Bordeaux Rouge', 2018, 'Bordeaux, France', 'Classic Bordeaux blend with notes of blackcurrant and cedar', 28.00, 'bordeaux_rouge.jpg', NULL),
('Chardonnay', 2021, 'Sonoma Coast, USA', 'Buttery and oaky Chardonnay with hints of vanilla', 20.00, 'chardonnay.jpg', NULL),
('Malbec', 2019, 'Mendoza, Argentina', 'Deep and bold Malbec with flavors of blackberry and cocoa', 24.00, 'malbec.jpg', NULL),
('Olema Cabernet Sauvignon', 2019, 'Sonoma County, USA', 'Balanced Cabernet Sauvignon with notes of black cherry and spice', 26.00, 'olema_cabernet.jpg', NULL),
('Cabernet Franc', 2020, 'Loire Valley, France', 'Earthy and aromatic with red fruit flavors', 23.00, 'cabernet_franc.jpg', NULL),
('Castello Albola Chianti Classico', 2018, 'Tuscany, Italy', 'Bright and lively Chianti with notes of cherry and spice', 21.00, 'chianti_classico.jpg', NULL),
('Chianti Classico Marchese Antinori Riserva', 2017, 'Tuscany, Italy', 'Complex Chianti with rich flavors of dark fruit and oak', 32.00, 'marchese_antinori.jpg', NULL),
('Châteauneuf-du-pape Vieilles Vignes', 2018, 'Rhône Valley, France', 'Powerful red wine with notes of blackberries and herbs', 40.00, 'chateauneuf_du_pape.jpg', 'chateauneuf_featured_banner.jpg'),
('Cloudy Bay Pinot Noir', 2021, 'Marlborough, New Zealand', 'Elegant Pinot Noir with flavors of cherry and spice', 35.00, 'cloudy_bay_pinot_noir.jpg', NULL),
('Masseto', 2016, 'Tuscany, Italy', 'Exceptional Merlot with velvety texture and deep fruit flavors', 400.00, 'masseto.jpg', NULL),
('Brunello di Montalcino', 2017, 'Tuscany, Italy', 'Full-bodied red wine with notes of leather and dried cherry', 45.00, 'brunello_di_montalcino.jpg', 'brunello_featured_banner.jpg');
