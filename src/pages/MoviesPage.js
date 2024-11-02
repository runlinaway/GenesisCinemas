import { FilterBar } from '../components/FilterBar.js'; // Adjust the path as necessary
import { MovieCard } from '../components/MovieCard.js'; // Adjust the path as necessary

class MoviesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initial HTML structure
        this.shadowRoot.innerHTML = `
            <div class="movies-container">
                <filter-bar></filter-bar>
                <div class="movie-cards-container"></div>
            </div>
        `;

        this.moviesContainer = this.shadowRoot.querySelector('.movie-cards-container');

        // Fetch movies based on the current URL path
        this.allMovies = []; // Store all movies data
        this.fetchMoviesByPath(window.location.hash); // Fetch movies on page load based on URL

        // Add event listener to the filter bar for filter updates
        this.shadowRoot.querySelector('filter-bar').addEventListener('filter-update', (event) => {
            this.renderMovies(event.detail.filteredMovies);
        });

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.fetchMoviesByPath(window.location.hash);
        });
    }

    async fetchMoviesByPath(hash) {
        let url = './src/services/fetch_now_showing.php'; // Default to now showing

        if (hash.includes('#Movies/featured')) {
            url = './src/services/fetch_featured.php'; // Adjust to your actual path for featured movies
        } else if (hash.includes('#Movies/upcoming')) {
            url = './src/services/fetch_upcoming.php';
        } else if (hash.includes('#Movies/nowshowing')) {
            url = './src/services/fetch_now_showing.php';
        }

        const response = await fetch(url);
        this.allMovies = await response.json(); // Store the fetched movies
        this.renderMovies(this.allMovies); // Render the movies based on the fetched data
    }

    renderMovies(movies) {
        this.moviesContainer.innerHTML = ''; // Clear previous cards

        movies.forEach(movie => {
            const movieCard = new MovieCard(movie.title, movie.poster_url, movie.director, movie.cast);
            this.moviesContainer.appendChild(movieCard);
        });
    }

    // Optional: Style the movies page
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .movies-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }

            .movie-cards-container {
                display: flex;
                flex-wrap: wrap;
                gap: 15px; /* Space between movie cards */
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.addStyles(); // Call to add styles when component is added to the DOM
    }
}

customElements.define('movies-page', MoviesPage);
