class FilterBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initial UI setup
        const container = document.createElement('div');
        container.setAttribute('class', 'filter-bar');

        // Links for Now Showing and Upcoming
        this.nowShowingLink = document.createElement('a');
        this.nowShowingLink.setAttribute('href', '#');
        this.nowShowingLink.textContent = 'Now Showing';
        this.nowShowingLink.classList.add('filter-link');
        this.nowShowingLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchMovies('now_showing');
        });

        this.upcomingLink = document.createElement('a');
        this.upcomingLink.setAttribute('href', '#');
        this.upcomingLink.textContent = 'Upcoming';
        this.upcomingLink.classList.add('filter-link');
        this.upcomingLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.fetchMovies('upcoming');
        });

        // Filter dropdowns
        this.movieFilter = this.createDropdown('movie', 'Select Movie');
        this.dateFilter = this.createDropdown('date', 'Select Date');

        // Append elements to container
        container.appendChild(this.nowShowingLink);
        container.appendChild(this.upcomingLink);
        container.appendChild(this.movieFilter);
        container.appendChild(this.dateFilter);
        this.shadowRoot.append(container);

        // Styles
        this.addStyles();
    }

    // Method to create dropdowns
    createDropdown(id, placeholder) {
        const select = document.createElement('select');
        select.setAttribute('id', id);
        select.classList.add('filter-dropdown');

        // Placeholder option
        const placeholderOption = document.createElement('option');
        placeholderOption.textContent = placeholder;
        placeholderOption.setAttribute('disabled', '');
        placeholderOption.setAttribute('selected', '');
        placeholderOption.setAttribute('value', '');
        select.appendChild(placeholderOption);

        select.addEventListener('change', () => this.applyFilters());
        return select;
    }

    // Fetch movies based on status (Now Showing or Upcoming)
    async fetchMovies(status) {
        const endpoint = status === 'now_showing' ? './src/services/fetch_now_showing.php' : './src/services/fetch_upcoming.php';
        const response = await fetch(endpoint);
        const movies = await response.json();
        
        // Check for errors in the response
        if (movies.error) {
            console.error(movies.error);
            return;
        }

        this.populateFilters(movies);
    }

    // Populate dropdown filters with movie data
    populateFilters(movies) {
        this.clearDropdown(this.movieFilter);
        this.clearDropdown(this.dateFilter);

        const movieTitles = new Set();
        const dates = new Set();

        movies.forEach(movie => {
            movieTitles.add(movie.title);
            dates.add(movie.release_date);
        });

        this.populateDropdown(this.movieFilter, movieTitles);
        this.populateDropdown(this.dateFilter, dates);

        this.filteredMovies = movies; // Store all movies for filtering
        this.applyFilters(); // Initial filtering
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
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }

    // Apply filters based on dropdown selections
    applyFilters() {
        const selectedMovie = this.movieFilter.value;
        const selectedDate = this.dateFilter.value;

        const filtered = this.filteredMovies.filter(movie => {
            return (
                (!selectedMovie || movie.title === selectedMovie) &&
                (!selectedDate || movie.release_date === selectedDate)
            );
        });

        // Handle displaying the filtered results (implement your display logic here)
        console.log(filtered); // You can replace this with actual UI update code
    }

    // Add component-specific styles
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .filter-bar {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px;
                background-color: #f1f1f1;
                border-radius: 8px;
            }

            .filter-link {
                text-decoration: none;
                font-weight: bold;
                color: #333;
                margin-right: 10px;
                cursor: pointer;
                transition: color 0.3s;
            }

            .filter-link:hover {
                color: #007bff;
            }

            .filter-dropdown {
                padding: 5px;
                font-size: 1em;
                border: 1px solid #ccc;
                border-radius: 5px;
                background-color: #fff;
                cursor: pointer;
            }
        `;
        this.shadowRoot.append(style);
    }
}

// Ensure the custom element is only defined once
if (!customElements.get('filter-bar')) {
    customElements.define('filter-bar', FilterBar);
}

export { FilterBar };
