class MovieCard extends HTMLElement {
    constructor(movieTitle, posterUrl, directorName, castMembers) {
        super();
        this.attachShadow({ mode: 'open' });
        this.movieTitle = movieTitle;
        // Constants for the movie details
        const posterSrc = posterUrl;
        const posterAlt = `${movieTitle} poster`;
        const titleText = movieTitle;
        const directorText = `Director:<br>${directorName}`;
        const castText = `Cast:<br>${castMembers}`;
        const posterPath = './src/assets/images/';
        // Create elements
        this.card = document.createElement('div');
        this.card.setAttribute('class', 'card');

        this.poster = document.createElement('img');
        this.poster.setAttribute('class', 'poster');
        this.poster.setAttribute('src', posterPath+posterSrc); // Set the source from the constant
        this.poster.setAttribute('alt', posterAlt); // Set the alt text from the constant



        this.infoOverlay = document.createElement('div');
        this.infoOverlay.setAttribute('class', 'info-overlay');
        this.infoOverlay.innerHTML = `
            <div class="title">${titleText}</div>
            <div class="director">${directorText}</div> <!-- Use the director constant -->
            <div class="cast">${castText}</div> <!-- Use the cast constant -->
        `;

        // Append elements to card
        this.card.appendChild(this.poster);
        //this.card.appendChild(this.title);
        this.card.appendChild(this.infoOverlay);
        
        this.shadowRoot.append(this.card);
        
        this.styleCard(); // Call styleCard without parameters
    }

    styleCard() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: relative;
                display: inline-block;
                width: 198px;
                height: 300px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.2s;
            }

            .card:hover {
                transform: scale(1.05);
            }

            .poster {
                width: 100%;
                height: 100%;
                object-fit: cover; /* Ensures the image fills the container while preserving aspect ratio */
                border-radius: 8px; /* Maintain rounded edges for the image */
            }

            .title {
                padding: 10px;
                text-align: center;
                font-size: 1.5rem;
            }



            .info-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                opacity: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center; /* Center the text within each div */
                transition: opacity 0.3s;
                border-radius: 8px; /* Maintain rounded edges for the overlay */
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 1.5rem;
            }

            .director{
                font-size: 1rem;
                padding:5px
            }

            .cast{
                font-size: 0.8rem;
            }
            .card:hover .info-overlay {
                opacity: 1;
            }

        `;
        this.shadowRoot.append(style);

        this.card.addEventListener('click', () => {
            window.location.hash = `#MovieDetails/${encodeURIComponent(this.movieTitle)}`;
        });
    }
}

// Ensure the custom element is only defined once
if (!customElements.get('movie-card')) {
    customElements.define('movie-card', MovieCard);
}

export { MovieCard };
