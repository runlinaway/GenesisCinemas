import '../components/MovieTrailer.js';
import '../components/MovieShowtimes.js';

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
                    <style>
                        .container {
                            display: flex;
                            flex-direction: column;
                            position: relative;
                            width: 100%;
                        }

                        .content-wrapper {
                            display: flex;
                            justify-content: space-between;
                            padding: 0 40px;
                            margin-top: 10px;
                        }

                        .left-column {
                            width: 422px;
                        }

                        .movie-trailer {
                            width: 100%;
                            overflow: hidden;
                        }

                        .synopsis_container {
                            color: white;
                            font-family: 'Kantumury Pro Thin', serif;
                        }
                        
                        .synopsis_container h1 {
                            font-family: 'Italiana', serif;
                            font-size: 3rem;
                            font-weight: normal;
                            margin-bottom: 10px;
                            text-decoration: underline;
                            text-decoration-color: white;
                            text-decoration-thickness: 2px;
                            border-radius: 10px;
                        }
                        
                        .synopsis_container p {
                            font-family: 'Kantumury Pro Thin', serif;
                            font-size: 1.5rem;
                            margin: 0;
                        }

                        .info_box {
                            border: 2px solid white;
                            border-radius: 10px;
                            padding: 20px;
                            margin-top: 40px;
                            background: #1e1e1e;
                            width: 378px;
                            color: white;
                            font-family: 'Kantumury Pro Thin', serif;
                        }

                        .info_box div {
                            margin-bottom: 10px;
                            font-size: 1.5rem;
                        }
                    </style>

                    <div class="container">
                        <movie-trailer
                            class="movie-trailer"
                            url="${movie.trailer_url}"
                            title="${movie.title}"
                            director="${movie.director}"
                            starring="${movie.cast}">
                        </movie-trailer>
                        
                        <div class="content-wrapper">
                            <div class="left-column">
                                <div class="synopsis_container">
                                    <h1>Synopsis</h1>
                                    <p>${movie.synopsis}</p>
                                </div>

                                <div class="info_box">
                                    <div><span>Genre:</span><br> ${movie.genre}</div>
                                    <div><span>Duration:</span><br> ${this.formatDuration(movie.duration)}</div>
                                    <div><span>Rating:</span><br> ${movie.rating}/5</div>
                                    <div><span>Release Date:</span><br> ${new Date(movie.release_date).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <movie-showtimes 
                                show-id="${movie.show_id}" 
                                movie-title="${movie.title}">
                            </movie-showtimes>
                        </div>
                    </div>
                `;


            } else {
                this.shadowRoot.innerHTML = `<p>Movie not found or error fetching details.</p>`;
            }
        } catch (error) {
            console.error('Error fetching movie details:', error);
            this.shadowRoot.innerHTML = `<p>Error fetching movie details.</p>`;
        }
    }

    formatDuration(duration) {
        const [hours, minutes] = duration.split(':');
        return `${parseInt(hours)}hr ${parseInt(minutes)}mins`;
    }
}

customElements.define('movie-details-page', MovieDetailsPage);
