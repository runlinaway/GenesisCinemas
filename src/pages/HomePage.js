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
                    background-color: #1e1e1e;
                }

                .page-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 0;
                }
                    
                .movie-list {
                  display: flex;
                  flex-direction: column;
                  align-items: center; /* Center the rows within the movie list */
                  width: 100%;
                }
                .page-content h1 {
                    align-self: center; /* Centers only the h1 element */
                    font-family: 'Italiana', serif;
                    font-size: 3rem;
                    font-weight: normal;
                    margin-bottom: 10px;
                    color:white;
                    text-decoration: underline;
                    text-decoration-color: white;
                    text-decoration-thickness: 2px;
                    border-radius: 10px;
                }
                .movie-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
            </style>
  
            <div class="page-content">
                <movie-banner></movie-banner>
                <h1>Now Showing</h1>
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

  