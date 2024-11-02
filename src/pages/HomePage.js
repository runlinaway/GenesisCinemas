import '../components/Banner.js';
import '../components/MovieCard.js'; // Ensure you have imported the MovieCard component
import { MovieCard } from '../components/MovieCard.js'; // Adjust based on your export

class HomePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 0;
                    color: #333;
                    background-color: #f5f5f5;
                }

                .page-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 0;
                }

                .movie-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
            </style>
  
            <div class="page-content">
                <movie-banner></movie-banner>
                <div class="movie-list"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.fetchMovies();
    }

    async fetchMovies() {
        try {
            const response = await fetch('./src/services/fetch_now_showing.php');
            const movies = await response.json();
            console.log('Fetched Movies:', movies);
            this.renderMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    renderMovies(movies) {
        const movieList = this.shadowRoot.querySelector('.movie-list');
        movieList.innerHTML = ''; // Clear previous content
    
        let row;
        movies.forEach((movie, index) => {
            // Create a new row every 5 movies
            if (index % 5 === 0) {
                row = document.createElement('div');
                row.classList.add('movie-row');
                movieList.appendChild(row);
            }
    
            // Create a MovieCard element for each movie
            const movieCard = new MovieCard(movie.title, movie.poster_url, movie.director, movie.cast); // Directly pass parameters
            
            row.appendChild(movieCard);
        });
    }
  
}

customElements.define('home-page', HomePage);

  