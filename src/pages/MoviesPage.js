import { FilterBar } from '../components/FilterBar.js'; // Adjust the path as necessary
import { MovieCard } from '../components/MovieCard.js'; // Adjust the path as necessary

class MoviesPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
            <filter-bar></filter-bar>
            <div class="movies-container">
                <div class="movie-cards-container"></div>
            </div>
        `;

        this.moviesContainer = this.shadowRoot.querySelector('.movie-cards-container');
        this.filterBar = this.shadowRoot.querySelector('filter-bar');

        // Listen for filter updates and new movie data
        this.filterBar.addEventListener('filter-update', (event) => {
            this.renderMovies(event.detail.filteredMovies);
        });

        this.filterBar.addEventListener('movies-updated', (event) => {
            this.allMovies = event.detail.movies;
            this.renderMovies(this.allMovies);
        });

        // Add hash change listener
        window.addEventListener('hashchange', () => {
            this.fetchMoviesByPath(window.location.hash);
        });

        // Initial fetch based on URL (moved to connectedCallback)
        this.initialSetup();
    }

    async initialSetup() {
        // Get location from URL if present
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        const locationId = urlParams.get('location');
        
        await this.waitForFilterBar();
        
        if (locationId) {
            this.filterBar.setLocation(locationId);
        }
        
        // Initial fetch based on URL
        await this.fetchMoviesByPath(window.location.hash);
    }

    async fetchMoviesByPath(hash) {
        let status;
        if (hash.includes('#Movies/upcoming')) {
            status = 'upcoming';
        } else if (hash.includes('#Movies/nowshowing')) {
            status = 'now_showing';
        } else if (hash.includes('#Movies/featured')) {
            status = 'featured';
        } else {
            status = 'now_showing'; // Default to now showing instead of 'all'
        }
        
        // Get location from URL
        const urlParams = new URLSearchParams(hash.split('?')[1] || '');
        const locationId = urlParams.get('location');
        
        // Wait for FilterBar to be fully initialized
        await this.waitForFilterBar();
        // Pass both status and locationId to fetchMovies
        this.filterBar.fetchMovies(status, locationId);
    }

    // Add helper method to wait for FilterBar
    async waitForFilterBar() {
        if (!this.filterBar) {
            await new Promise(resolve => {
                const checkFilterBar = () => {
                    this.filterBar = this.shadowRoot.querySelector('filter-bar');
                    if (this.filterBar) {
                        resolve();
                    } else {
                        setTimeout(checkFilterBar, 50);
                    }
                };
                checkFilterBar();
            });
        }
    }

    renderMovies(movies) {
        if (!movies || movies.length === 0) {
            this.moviesContainer.innerHTML = '<p style="color: white; text-align: center;">No movies found matching the selected filters.</p>';
            return;
        }

        this.moviesContainer.innerHTML = '';
        let row;
        
        movies.forEach((movie, index) => {
            if (index % 5 === 0) {
                row = document.createElement('div');
                row.classList.add('movie-row');
                this.moviesContainer.appendChild(row);
            }

            const movieCard = new MovieCard(
                movie.title, 
                movie.poster_url, 
                movie.director, 
                movie.cast
            );
            row.appendChild(movieCard);
        });
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .movies-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
            }

            .movie-cards-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 20px; /* Space between rows */
            }

            .movie-row {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                width: 100%;
                gap: 20px; /* Space between cards */
                justify-content: start; /* Align cards to the left */
            }

            @media (max-width: 1200px) {
                .movies-container {
                    padding: 20px 10px;
                }
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    connectedCallback() {
        this.addStyles();
        this.initialSetup(); // Call initialSetup when component is connected
    }

    disconnectedCallback() {
        // Clean up event listener when component is removed
        window.removeEventListener('hashchange', () => {
            this.fetchMoviesByPath(window.location.hash);
        });
    }
}

customElements.define('movies-page', MoviesPage);
