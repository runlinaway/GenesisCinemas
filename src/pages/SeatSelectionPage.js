class SeatSelectionPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        const movieTitle = decodeURIComponent(params.get('movie'));
        const locationName = decodeURIComponent(params.get('location'));
        const showtime = decodeURIComponent(params.get('time'));
        const date = decodeURIComponent(params.get('date'));
        const showtimeId = params.get('showtimeId');

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 20px;
                    color: white;
                    font-family: 'Kantumury Pro Thin', serif;
                }

                .header-info {
                    display: flex;
                    flex-direction: column;
                    padding: 10px 20px;
                    background: #1e1e1e;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                .movie-info {
                    font-size: 1.8rem;
                    text-align: center;
                    margin-top: 15px;
                    width: 100%;
                }

                .button-container {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    padding: 20px;
                }

                button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: background-color 0.3s;
                }

                .back-button {
                    background-color: #333;
                    color: white;
                }

                .next-button {
                    background-color: #4CAF50;
                    color: white;
                }

                button:hover {
                    opacity: 0.9;
                }

                button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }
                
                .header-info h1 {
                    font-size: 2.5rem;
                    font-family: 'Italiana', serif;
                    font-weight: normal;
                    margin-top: 0;
                    margin-bottom: 10px;
                    align-self: flex-start;
                }
            </style>

            <div class="container">
                <div class="header-info">
                    <h1>Seat Selection</h1>
                    <div class="movie-info">
                        <div>${movieTitle} - ${locationName} - ${showtime} - ${date}</div>
                    </div>
                </div>

                <cinema-layout showtime-id="${showtimeId}"></cinema-layout>

                <div class="button-container">
                    <button class="back-button" onclick="window.history.back()">Back</button>
                    <button class="next-button" id="nextButton" disabled>Next</button>
                </div>
            </div>
        `;

        this.setupNextButton();
    }

    setupNextButton() {
        const nextButton = this.shadowRoot.querySelector('#nextButton');
        const cinemaLayout = this.shadowRoot.querySelector('cinema-layout');

        cinemaLayout.addEventListener('seat-selection-change', (event) => {
            nextButton.disabled = event.detail.selectedSeats.length === 0;
        });

        nextButton.addEventListener('click', () => {
            const selectedSeats = cinemaLayout.getSelectedSeats();
            // Navigate to payment page with selected seats
            window.location.hash = `#Payment?seats=${selectedSeats.join(',')}&showtimeId=${cinemaLayout.getAttribute('showtime-id')}`;
        });
    }
}

customElements.define('seat-selection-page', SeatSelectionPage); 