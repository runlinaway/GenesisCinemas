class CinemaLayout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedSeats = new Set();
        this.bookedSeats = new Set();
    }

    connectedCallback() {
        this.showtimeId = this.getAttribute('showtime-id');
        this.fetchBookedSeats();
        this.render();
    }

    async fetchBookedSeats() {
        try {
            const response = await fetch(`./src/services/fetch_booked_seats.php?showtime_id=${this.showtimeId}`);
            const data = await response.json();
            this.bookedSeats = new Set(data.map(seat => seat.seat_loc));
            this.updateSeats();
        } catch (error) {
            console.error('Error fetching booked seats:', error);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .cinema-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                }

                .screen-label {
                    color: #888;
                    text-align: center;
                    font-family: 'Kantumury Pro Thin', serif;
                    font-size: 1.2rem;
                    margin-bottom: 10px;
                }

                .screen {
                    width: 80%;
                    height: 10px;
                    background: #ffffff;
                    border-radius: 5px;
                    margin-bottom: 40px;
                }

                .seats-container {
                    display: grid;
                    grid-template-columns: repeat(10, 1fr);
                    gap: 10px;
                    padding: 20px;
                }

                .seat {
                    width: 30px;
                    height: 30px;
                    border: 2px solid #ffffff;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                }

                .seat:hover:not(.booked) {
                    background-color: #4CAF50;
                }

                .seat.selected {
                    background-color: #4CAF50;
                    border-color: #4CAF50;
                }

                .seat.booked {
                    background-color: #cccccc;
                    border-color: #999999;
                    cursor: not-allowed;
                }

                .legend {
                    display: flex;
                    gap: 20px;
                    margin-top: 20px;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: white;
                }

                .legend-box {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ffffff;
                    border-radius: 3px;
                }

                .legend-box.selected {
                    background-color: #4CAF50;
                    border-color: #4CAF50;
                }

                .legend-box.booked {
                    background-color: #cccccc;
                    border-color: #999999;
                }
            </style>

            <div class="cinema-container">
                <div class="screen"></div>
                <div class="screen-label">SCREEN</div>
                <div class="seats-container">
                    ${this.generateSeats()}
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-box"></div>
                        <span>Available</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box selected"></div>
                        <span>Selected</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box booked"></div>
                        <span>Booked</span>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    generateSeats() {
        let seatsHTML = '';
        for (let i = 0; i < 50; i++) {
            const seatId = `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`;
            seatsHTML += `<div class="seat" data-seat="${seatId}">${seatId}</div>`;
        }
        return seatsHTML;
    }

    setupEventListeners() {
        const seats = this.shadowRoot.querySelectorAll('.seat');
        seats.forEach(seat => {
            seat.addEventListener('click', () => this.toggleSeat(seat));
        });
    }

    toggleSeat(seatElement) {
        const seatId = seatElement.dataset.seat;
        if (this.bookedSeats.has(seatId)) return;

        if (this.selectedSeats.has(seatId)) {
            this.selectedSeats.delete(seatId);
            seatElement.classList.remove('selected');
        } else {
            this.selectedSeats.add(seatId);
            seatElement.classList.add('selected');
        }

        this.dispatchEvent(new CustomEvent('seat-selection-change', {
            detail: { selectedSeats: Array.from(this.selectedSeats) },
            bubbles: true,
            composed: true
        }));
    }

    updateSeats() {
        const seats = this.shadowRoot.querySelectorAll('.seat');
        seats.forEach(seat => {
            const seatId = seat.dataset.seat;
            if (this.bookedSeats.has(seatId)) {
                seat.classList.add('booked');
            }
        });
    }

    getSelectedSeats() {
        return Array.from(this.selectedSeats);
    }
}

customElements.define('cinema-layout', CinemaLayout); 