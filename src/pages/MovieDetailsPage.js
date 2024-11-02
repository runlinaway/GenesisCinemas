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
                            width: 100%;
                            position: relative;
                        }

                        .movie-trailer {
                            width: 100%;
                            overflow: hidden;
                        }

                        .content-row {
                            display: flex;
                            justify-content: space-between;
                            padding: 40px;
                            gap: 40px;
                        }

                        .left-column {
                            flex: 1;
                        }

                        .synopsis_container {
                            width: 422px;
                            color: white;
                            font-family: 'Kantumury Pro Thin', serif;
                        }
                        
                        .synopsis_container h1 {
                            font-family: 'Italiana', serif;
                            font-size: 3rem; /* Italiana size 3rem */
                            font-weight: normal;
                            margin-bottom: 10px; /* Space below the heading */
                            text-decoration: underline; /* Underline the title */
                            text-decoration-color: white; /* Underline color */
                            text-decoration-thickness: 2px; /* Thickness of the underline */
                            border-radius: 10px; /* Rounded underline */
                        }
                        
                        .synopsis_container p {
                            font-family: 'Kantumury Pro Thin', serif;
                            font-size: 1.5rem; /* Synopsis text size */
                            margin: 0; /* Remove default margins */
                        }

                        .info_box {
                            
                            border: 2px solid white; /* White border */
                            border-radius: 10px; /* Rounded corners */
                            padding: 20px; /* Padding inside the box */
                            margin-top: 40px; /* Space between synopsis and info box */
                            background:#1e1e1e; 
                            width: 378px; /* Match width with synopsis container */
                            color: white; /* Text color */
                            font-family: 'Kantumury Pro Thin', serif;

                        }

                        .info_box div {
                            margin-bottom: 10px; /* Space between each info item */
                            font-size: 1.5rem; /* Set font size for info items */
                        }

                        .info_box div span {
                             /* Bold label for each info item */
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
                        
                        <div class="content-row">
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

                            <movie-showtimes show-id="${movie.show_id}"></movie-showtimes>
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

  