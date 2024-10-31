// banner.js

class MovieBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a Shadow DOM
        this.movies = [];
        this.currentIndex = 0;
        this.bannerContainer = document.createElement('div'); // Create the banner container
        this.bannerContainer.setAttribute('id', 'banner-container');
        this.shadowRoot.appendChild(this.bannerContainer); // Append to Shadow DOM
        this.intervalId = null; // To store the interval ID
    }

    // Function to fetch movie data from the server
    async fetchMovieData() {
        try {
            const response = await fetch('./src/services/fetch_featured.php');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.movies = await response.json();
            this.createBanner();
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    }

    // Function to create and display the banner
    // Update createBanner to set container width dynamically
    createBanner() {
        this.bannerContainer.style.width = `${this.movies.length * 100}%`; // Set container width based on the number of items

        let maxTitleHeight = 0;

        this.movies.forEach((movie) => {
            const bannerItem = document.createElement('div');
            bannerItem.className = 'banner-item';
            // In the createBanner method
            const bannerImage = document.createElement('img');
            bannerImage.src = `./src/assets/images/${movie.banner_url}`;
            bannerImage.className = 'banner-image'; // Add a class for styling
            bannerItem.appendChild(bannerImage);
            // Create movie info box
            const movieInfo = document.createElement('div');
            movieInfo.className = 'movie-info';
            movieInfo.innerHTML = `
                <strong class="movie-title">${movie.title}</strong>
                <p class="movie-synopsis">${movie.synopsis}</p>
            `;
            bannerItem.appendChild(movieInfo);

            // Add mouse enter and leave event listeners to pause/resume auto-scroll
            movieInfo.addEventListener('mouseenter', () => clearInterval(this.intervalId)); // Pause auto-scroll
            movieInfo.addEventListener('mouseleave', () => this.startAutoScroll()); // Resume auto-scroll


            this.bannerContainer.appendChild(bannerItem);

        });

        this.createNavigationButtons(); // Create navigation buttons
        this.startAutoScroll(); // Start auto-scrolling
    }


    // Function to create navigation buttons
    createNavigationButtons() {
        const leftButton = document.createElement('button');
        leftButton.className = 'nav-button left';
        leftButton.textContent = '<'; // Button content
        leftButton.addEventListener('click', () => this.scrollLeft());

        const rightButton = document.createElement('button');
        rightButton.className = 'nav-button right';
        rightButton.textContent = '>'; // Button content
        rightButton.addEventListener('click', () => this.scrollRight());

        this.shadowRoot.appendChild(leftButton);
        this.shadowRoot.appendChild(rightButton);
    }

    // Function to start auto-scrolling through the banner items
    startAutoScroll() {
        this.intervalId = setInterval(() => {
            this.scrollRight();
        }, 5000); // Change every 30 seconds
    }

    // Function to scroll to the right
    scrollRight() {
        this.currentIndex = (this.currentIndex + 1) % this.movies.length; // Cycle through movies
        this.updateBannerPosition();
        this.resetAutoScroll();
    }

    // Function to scroll to the left
    scrollLeft() {
        this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length; // Cycle backwards
        this.updateBannerPosition();
        this.resetAutoScroll();
    }

    // Function to update the banner position
    // Function to update the banner position
updateBannerPosition() {
    const bannerItemWidth = 100 / this.movies.length; // Calculate width percentage of each banner item
    const offset = this.currentIndex * -bannerItemWidth; // Calculate the offset for scrolling
    this.bannerContainer.style.transform = `translateX(${offset}%)`; // Move banner to the left
}


    // Function to reset the auto-scroll timer
    resetAutoScroll() {
        clearInterval(this.intervalId); // Clear existing interval
        this.startAutoScroll(); // Restart auto-scroll
    }

    // Called when the element is connected to the DOM
    connectedCallback() {
        this.fetchMovieData(); // Fetch movie data when the element is added to the DOM
        this.attachStyles(); // Attach styles for the component
    }

    // Function to attach styles for the component
    attachStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #banner-container {
                position: relative;
                display: flex; /* Display flex ensures items are aligned horizontally */
                height: 600px;
                width: 100%;
                overflow: hidden; /* Hide overflow */
                transition: transform 0.5s ease; /* Smooth transition for scrolling */
                margin: 0; /* Remove margin */
                padding: 0; /* Remove padding */
            }

            .banner-item {
                position: relative;
                flex: 1 0 auto;
                width: 100vw;
                height: 100%;
                overflow: hidden; /* Hide overflow to prevent images from spilling */
                margin: 0; /* Remove margin */
                padding: 0; /* Remove padding */
            }

            .banner-image {
                width: 100vw;
                height: 100%;
                object-fit: cover; /* Ensures image covers the banner */
                object-position: top;
            }

            .movie-info {
                position: absolute;
                bottom: 10px; /* Position at the bottom */
                right: 300px; /* Position to the right */
                min-width: 355px; /* Minimum width */
                max-width: calc(100% - 20px); /* Set a maximum width */
                background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
                color: white;
                padding: 10px;
                transition: transform 0.3s ease; /* Smooth transition for hover effect */
                transform: translateY(75%); /* Initially position below the banner item */
                display: flex; /* Use flexbox */
                flex-direction: column; /* Stack children vertically */
                box-sizing: border-box; /* Include padding in width calculations */
            }

            .movie-title {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 50px;
                white-space: nowrap; /* Prevent text from wrapping */
                overflow: hidden; /* Hide overflow text */
                text-overflow: ellipsis; /* Show ellipsis if text is too long */
                padding-left: 10px; /* Add left padding */
                padding-right: 10px; /* Add right padding */

            }

            .movie-synopsis {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 20px;
                white-space: normal; /* Allow synopsis text to wrap */
                margin-top: 5px; /* Add spacing between title and synopsis */
                flex-grow: 1; /* Allow synopsis to grow and take remaining space */
                max-width: 400px;
                padding-left: 10px; /* Add left padding */
                padding-right: 10px; /* Add right padding */
            }


            .movie-info:hover {
                transform: translateY(0); /* Move the card up into view on hover */
            }

            /* Keep the title visible while hiding the synopsis */
            .movie-synopsis {
                opacity: 0; /* Start hidden */
                transition: opacity 0.3s ease; /* Smooth transition for opacity */
            }

            .movie-info:hover .movie-synopsis {
                opacity: 1; /* Show synopsis on hover */
            }


            .nav-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px; /* Adjust width to a smaller value */
                height: auto; /* Remove height 100%, this allows button to fit content */
                padding: 10px; /* Add padding for button content */
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                cursor: pointer;
                z-index: 1;
            }

            .nav-button.left {
                left: 0;
            }

            .nav-button.right {
                right: 0;
            }

                    `;
        this.shadowRoot.appendChild(style); // Append styles to Shadow DOM
    }
}

// Define the custom element
customElements.define('movie-banner', MovieBanner);

