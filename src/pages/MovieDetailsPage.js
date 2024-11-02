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
                    <style>
                        .container {
                            display: flex;
                            flex-direction: column; /* Stack elements vertically */
                            position: relative; /* Needed for absolute positioning of children */
                            width: 100%; /* Use full width for proper positioning */
                            position: relative; /* Needed for absolute positioning of children */
                        }

                        .movie-trailer {
                            width: 100%; /* Allow the trailer to take full width */
                            overflow: hidden; /* Hide overflow to maintain the aspect ratio */
                        }

                        .synopsis_container {
                            width: 422px; /* Set the width of the synopsis container */
                            color: white; /* Set text color to white */
                            font-family: 'Kantumury Pro Thin', serif;
                            margin-top: 10px; /* Space between trailer and synopsis */
                            padding-left: 40px; /* Add padding from the left edge */
                        }
                        
                        .synopsis_container h1 {
                            font-family: 'Italiana', serif;
                            font-size: 3rem; /* Italiana size 3rem */
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
                            margin-left: 40px; /* Add padding from the left edge */
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

  