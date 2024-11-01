class MovieTrailer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Set up the initial HTML structure with overlay
        this.shadowRoot.innerHTML = `
            <style>
                .trailer-container {
                    position: relative;
                    width: 100%;
                    padding-bottom: 56.25%; /* 16:9 aspect ratio */
                    height: 0;
                    overflow: hidden;
                }
                .trailer-container iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 0;
                }
                
                /* Overlay styles */
                .overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    color: #fff;
                    font-family: 'Kantumury Pro Thin', serif;
                    padding: 10px;
                    box-sizing: border-box;
                    cursor: pointer; /* Indicate clickable overlay */
                }
                
                .overlay-content {
                    display: flex;
                    flex-direction: column;
                    opacity: 1;
                }
                
                .title {
                    font-size: 4rem;
                    font-weight: bold;
                }
                
                .details {
                    margin-top: 8px;
                    font-size: 1.25rem;
                }
            </style>
        
            <div class="trailer-container">
                <iframe
                    src=""
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                
                <!-- Overlay with movie details -->
                <div class="overlay">
                    <div class="overlay-content">
                        <div class="title"></div>
                        <div class="details">
                            <div class="director"></div>
                            <div class="starring"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.updateTrailerContent();
        this.addClickEvent(); // Add click event when component is connected
    }

    static get observedAttributes() {
        return ['url', 'title', 'director', 'starring'];
    }

    attributeChangedCallback() {
        this.updateTrailerContent();
    }

    updateTrailerContent() {
        const url = this.getAttribute('url');
        const title = this.getAttribute('title');
        const director = this.getAttribute('director');
        const starring = this.getAttribute('starring');

        // Update iframe source
        if (url) {
            // Ensure URL is in embed format
            const videoId = this.extractVideoId(url);
            if (videoId) {
                const iframe = this.shadowRoot.querySelector('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0`;
            }
        }

        // Update overlay content
        this.shadowRoot.querySelector('.title').textContent = title || '';
        this.shadowRoot.querySelector('.director').textContent = `Director: ${director || 'N/A'}`;
        this.shadowRoot.querySelector('.starring').textContent = `Starring: ${starring || 'N/A'}`;
    }

    extractVideoId(url) {
        const urlObj = new URL(url);
        // Check if it's a YouTube link and extract video ID
        if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
            return urlObj.searchParams.get('v');
        } else if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.split('/')[1];
        }
        return null; // Not a valid YouTube URL
    }

    addClickEvent() {
        const overlay = this.shadowRoot.querySelector('.overlay');
        overlay.addEventListener('click', () => {
            const url = this.getAttribute('url');
            if (url) {
                window.open(url, '_blank'); // Open the video in a new tab
            }
        });
    }
}

// Define the new element
customElements.define('movie-trailer', MovieTrailer);
