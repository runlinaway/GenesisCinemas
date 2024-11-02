class FilterBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.filteredMovies = [];

        const container = document.createElement('div');
        container.setAttribute('class', 'filter-bar');

        // Create a single line container for all elements
        const filterLineContainer = document.createElement('div');
        filterLineContainer.classList.add('filter-line-container');

        // Create left and right sections
        const leftSection = document.createElement('div');
        leftSection.classList.add('left-section');
        
        const rightSection = document.createElement('div');
        rightSection.classList.add('right-section');

        // Links section
        this.nowShowingLink = document.createElement('a');
        this.nowShowingLink.setAttribute('href', '#');
        this.nowShowingLink.textContent = 'Now Showing';
        this.nowShowingLink.classList.add('filter-link');
        this.nowShowingLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchMovies('now_showing');
            this.updateActiveLink('nowshowing');
        });

        this.upcomingLink = document.createElement('a');
        this.upcomingLink.setAttribute('href', '#');
        this.upcomingLink.textContent = 'Upcoming';
        this.upcomingLink.classList.add('filter-link');
        this.upcomingLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchMovies('upcoming');
            this.updateActiveLink('upcoming');
        });

        // Filters section with connecting words
        this.movieFilter = this.createDropdown('movie', 'All Movies');
        const atText = document.createElement('span');
        atText.textContent = ' at ';
        atText.classList.add('connector-text');
        
        this.locationFilter = this.createDropdown('location', 'All Locations');
        const onText = document.createElement('span');
        onText.textContent = ' on ';
        onText.classList.add('connector-text');
        
        this.dateFilter = this.createDropdown('date', 'All Dates');

        // Add elements to their respective sections
        leftSection.appendChild(this.nowShowingLink);
        leftSection.appendChild(this.upcomingLink);

        rightSection.appendChild(this.movieFilter);
        rightSection.appendChild(atText);
        rightSection.appendChild(this.locationFilter);
        rightSection.appendChild(onText);
        rightSection.appendChild(this.dateFilter);

        // Add sections to the filter line container
        filterLineContainer.appendChild(leftSection);
        filterLineContainer.appendChild(rightSection);

        // Append the line container to the main container
        container.appendChild(filterLineContainer);
        
        this.shadowRoot.appendChild(container);
        this.addStyles();

        // Initial data fetch
        this.fetchLocations();
        this.fetchMovies('now_showing');

        // Initial active state based on URL or default to now showing
        const initialHash = window.location.hash;
        if (initialHash.includes('upcoming')) {
            this.updateActiveLink('upcoming');
        } else {
            this.updateActiveLink('nowshowing');
        }

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            if (hash.includes('upcoming')) {
                this.updateActiveLink('upcoming');
            } else if (hash.includes('nowshowing')) {
                this.updateActiveLink('nowshowing');
            }
        });

        // Add event listener for location selection from header
        document.addEventListener('location-selected', (event) => {
            if (this.locationFilter) {
                this.locationFilter.value = event.detail.locationId;
                // Only apply filters if we have movies loaded
                if (this.filteredMovies && this.filteredMovies.length > 0) {
                    this.applyFilters();
                }
            }
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: '2-digit'
        });
    }

    populateFilters(movies) {
        this.clearDropdown(this.movieFilter);
        this.clearDropdown(this.dateFilter);

        const allMoviesOption = document.createElement('option');
        allMoviesOption.value = '';
        allMoviesOption.textContent = 'All Movies';
        this.movieFilter.appendChild(allMoviesOption);

        const allDatesOption = document.createElement('option');
        allDatesOption.value = '';
        allDatesOption.textContent = 'All Dates';
        this.dateFilter.appendChild(allDatesOption);

        const movieTitles = new Set();
        const dates = new Set();

        movies.forEach(movie => {
            movieTitles.add(movie.title);
            
            if (movie.showtimes) {
                const showDates = movie.showtimes.split(',');
                showDates.forEach(date => {
                    if (date) {
                        const formattedDate = this.formatDate(date.trim());
                        dates.add(formattedDate);
                    }
                });
            }
        });

        this.populateDropdown(this.movieFilter, Array.from(movieTitles));
        this.populateDropdown(this.dateFilter, Array.from(dates).sort());

        this.filteredMovies = movies;
        this.applyFilters();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .filter-bar {
                padding: 0;
                background-color: #1e1e1e;
                border-bottom: 1px solid white;
            }

            .filter-line-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0;
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
                margin-top: 5px;
                margin-bottom: 5px;
            }

            .left-section {
                display: flex;
                gap: 20px;
                margin-left: 20px;
            }

            .right-section {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-right: 20px;
            }

            .filter-link {
                text-decoration: none;
                color: #fff;
                padding: 8px 16px;
                transition: all 0.3s;
                font-family: 'Italiana', serif;
                font-weight: normal;
                font-size: 1.5rem;
                position: relative;
            }

            .filter-link::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: 0;
                left: 50%;
                background-color: white;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            }

            .filter-link:hover::after {
                width: 80%;
            }

            .filter-link.active::after {
                width: 80%;
            }

            .filter-dropdown {
                padding: 8px;
                font-size: 1em;
                border: 1px solid #333;
                border-radius: 4px;
                background-color: #2a2a2a;
                color: #fff;
                cursor: pointer;
                font-family: 'Kantumury Pro Thin', serif;
            }

            .filter-dropdown:hover {
                border-color: #555;
            }

            .connector-text {
                color: #fff;
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 1.2rem;
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    // Update applyFilters to use the new date format
    applyFilters() {
        const selectedMovie = this.movieFilter.value;
        const selectedLocation = this.locationFilter.value;
        const selectedDate = this.dateFilter.value;

        const filtered = this.filteredMovies.filter(movie => {
            const matchesTitle = !selectedMovie || movie.title === selectedMovie;

            const matchesLocation = !selectedLocation || 
                (movie.showtimes && movie.locations && 
                 movie.locations.split(',').includes(selectedLocation));

            const matchesDate = !selectedDate || 
                (movie.showtimes && movie.showtimes.split(',').some(date => {
                    const formattedDate = this.formatDate(date.trim());
                    return formattedDate === selectedDate;
                }));

            return matchesTitle && matchesLocation && matchesDate;
        });

        const event = new CustomEvent('filter-update', {
            detail: { filteredMovies: filtered },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    // Method to create dropdowns
    createDropdown(id, placeholder) {
        const select = document.createElement('select');
        select.setAttribute('id', id);
        select.classList.add('filter-dropdown');

        // Add "All" option
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = placeholder;
        select.appendChild(allOption);

        select.addEventListener('change', () => this.applyFilters());
        return select;
    }

    async fetchLocations() {
        try {
            const response = await fetch('./src/services/fetch_locations.php');
            const locations = await response.json();
            if (!locations.error) {
                this.populateDropdown(this.locationFilter, locations.map(loc => ({
                    value: loc.location_id,
                    text: loc.name
                })));
            }
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    }

    // Fetch movies based on status (Now Showing or Upcoming)
    async fetchMovies(status) {
        let endpoint;
        switch(status) {
            case 'upcoming':
                endpoint = './src/services/fetch_upcoming.php';
                this.updateActiveLink('upcoming');
                break;
            case 'now_showing':
                endpoint = './src/services/fetch_now_showing.php';
                this.updateActiveLink('nowshowing');
                break;
            default:
                endpoint = './src/services/fetch_now_showing.php';
                this.updateActiveLink('nowshowing');
        }

        try {
            const response = await fetch(endpoint);
            const movies = await response.json();
            
            if (movies.error) {
                console.error(movies.error);
                return;
            }

            this.populateFilters(movies);
            
            const event = new CustomEvent('movies-updated', {
                detail: { movies },
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(event);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    // Clear and populate dropdown options
    clearDropdown(select) {
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }
    }

    // Populate dropdown with values
    populateDropdown(select, values) {
        values.forEach(value => {
            const option = document.createElement('option');
            if (typeof value === 'object') {
                option.value = value.value;
                option.textContent = value.text;
            } else {
                option.value = value;
                option.textContent = value;
            }
            select.appendChild(option);
        });
    }

    updateActiveLink(status) {
        // Remove active class from both links
        this.nowShowingLink.classList.remove('active');
        this.upcomingLink.classList.remove('active');

        // Add active class based on status
        if (status === 'upcoming') {
            this.upcomingLink.classList.add('active');
        } else {
            this.nowShowingLink.classList.add('active');
        }
    }

    setLocation(locationId) {
        if (this.locationFilter) {
            this.locationFilter.value = locationId;
            if (this.filteredMovies && this.filteredMovies.length > 0) {
                this.applyFilters();
            }
        }
    }
}

// Ensure the custom element is only defined once
if (!customElements.get('filter-bar')) {
    customElements.define('filter-bar', FilterBar);
}

export { FilterBar };
