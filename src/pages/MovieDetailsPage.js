import '../components/MovieTrailer.js';

class MovieDetailsPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const movieId = decodeURIComponent(this.getAttribute('movie-id'));
        this.fetchMovieDetails(movieId);
    }

    async fetchMovieDetails(title) {
        try {
            const response = await fetch(`./src/services/fetch_movie.php?title=${encodeURIComponent(title)}`);
            const movie = await response.json();

            if (movie && !movie.error) {
                this.shadowRoot.innerHTML = `
                    <movie-trailer
                        url="${movie.trailer_url}"
                        title="${movie.title}"
                        director="${movie.director}"
                        starring="${movie.cast}">
                    </movie-trailer>
                    <p>${movie.synopsis}</p>
                `;
            } else {
                this.shadowRoot.innerHTML = `<p>Movie not found or error fetching details.</p>`;
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            this.shadowRoot.innerHTML = `<p>Error fetching movie details.</p>`;
        }
    }
}

customElements.define('movie-details-page', MovieDetailsPage);

  