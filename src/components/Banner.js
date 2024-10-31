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
            movieInfo.innerHTML = `<strong>${movie.title}</strong><p>${movie.synopsis}</p>`;
            bannerItem.appendChild(movieInfo);

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
        }, 30000); // Change every 30 seconds
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
                width: 100%
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
                top: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                border-radius: 5px;
                width: 355px;
                height: 177px;
                display: none;
            }

            .banner-item:hover .movie-info {
                display: block;
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

