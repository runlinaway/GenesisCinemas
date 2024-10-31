// banner.js

class MovieBanner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Create a Shadow DOM
        this.wrapper = document.createElement('div');
        this.wrapper.setAttribute('id', 'wrapper');
        this.shadowRoot.appendChild(this.wrapper); 
        this.movies = [];
        this.currentIndex = 0;
        this.bannerContainer = document.createElement('div'); // Create the banner container
        this.bannerContainer.setAttribute('id', 'banner-container');
        this.wrapper.appendChild(this.bannerContainer); // Append to Shadow DOM
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
    
        // Create the SVG element directly in JavaScript
        const leftIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        leftIcon.setAttribute("width", "24");
        leftIcon.setAttribute("height", "24");
        leftIcon.setAttribute("viewBox", "0 0 24 24");
        leftIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        
        // Create the polyline element for the chevron shape
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        polyline.setAttribute("fill", "none");
        polyline.setAttribute("points", "15.5 5 8.5 12 15.5 19");
        polyline.setAttribute("stroke", "currentColor"); // Use currentColor for CSS control
        polyline.setAttribute("stroke-linecap", "round");
        polyline.setAttribute("stroke-linejoin", "round");
        polyline.setAttribute("stroke-width", "2");

        // Append the polyline to the SVG
        leftIcon.appendChild(polyline);

        // Append the SVG to the button
        leftButton.appendChild(leftIcon);
    
        leftButton.addEventListener('click', () => this.scrollLeft());
    
        // Right Button
        const rightButton = document.createElement('button');
        rightButton.className = 'nav-button right';
        
        const rightIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        rightIcon.setAttribute("width", "24");
        rightIcon.setAttribute("height", "24");
        rightIcon.setAttribute("viewBox", "0 0 24 24");
        rightIcon.setAttribute("aria-label", "Right Navigation");

        const rightPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
        rightPolyline.setAttribute("fill", "none");
        rightPolyline.setAttribute("points", "8.5 5 15.5 12 8.5 19"); // Right chevron points
        rightPolyline.setAttribute("stroke", "currentColor");
        rightPolyline.setAttribute("stroke-linecap", "round");
        rightPolyline.setAttribute("stroke-linejoin", "round");
        rightPolyline.setAttribute("stroke-width", "2");

        rightIcon.appendChild(rightPolyline);
        rightButton.appendChild(rightIcon);
    
        rightButton.addEventListener('click', () => this.scrollRight());
    
        this.wrapper.appendChild(leftButton);
        this.wrapper.appendChild(rightButton);
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

            #wrapper {
                display: block; /* Ensure the wrapper behaves like a block element */
                height: 600px; /* Define the height of the movie banner */
                position: relative; /* Set relative positioning for absolute children */
                overflow: hidden; /* Hide overflow if necessary */
            }

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
                bottom: 0px; /* Position at the bottom */
                right: 300px; /* Position to the right */
                min-width: 355px; /* Minimum width */
                max-width: calc(100% - 20px); /* Set a maximum width */
                background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
                color: white;
                padding: 10px;
                transition: transform 0.3s ease; /* Smooth transition for hover effect */
                transform: translateY(72%); /* Initially position below the banner item */
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
                padding-bottom: 10px; /* Add right padding */

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
                position: absolute; /* Position buttons absolutely */
                top: 0; /* Start at the top */
                bottom: 0; /* Stretch to the bottom */
                width: 50px; /* Fixed width for buttons */
                background-color: rgba(0, 0, 0, 0.5);
                color: #b3b3b3;
                border: none;
                cursor: pointer;
                z-index: 1;
                transition: color 0.2s ease, background-color 0.2s ease;
            }

            .nav-button:hover {
                color:white;
                background-color: rgba(0, 0, 0, 0.8);
            }

            .nav-button.left {
                left: 0; /* Position left button to the left */
            }

            .nav-button.right {
                right: 0; /* Position right button to the right */
            }
        `;
        this.shadowRoot.appendChild(style); // Append styles to Shadow DOM
    }
}

// Define the custom element
customElements.define('movie-banner', MovieBanner);

