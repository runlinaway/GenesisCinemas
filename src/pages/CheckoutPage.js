class CheckoutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.seats = [];
        this.showtimeId = '';
        this.movieDetails = {};
    }

    connectedCallback() {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        this.seats = params.get('seats').split(',');
        this.showtimeId = params.get('showtimeId');
        this.fetchShowtimeDetails();
    }

    async fetchShowtimeDetails() {
        try {
            const response = await fetch(`./src/services/fetch_showtime_details.php?showtime_id=${this.showtimeId}`);
            this.movieDetails = await response.json();
            this.render();
        } catch (error) {
            console.error('Error fetching showtime details:', error);
        }
    }

    calculateTotal() {
        return this.seats.length * 12; // $12 per seat
    }

    render() {
        const total = this.calculateTotal();
        const userCookie = this.getCookie('user');
        const isLoggedIn = !!userCookie;

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 20px;
                    color: white;
                    font-family: 'Kantumury Pro Thin', serif;
                    max-width: 800px;
                    margin: 0 auto;
                }

                .header-info {
                    background: #1e1e1e;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                .movie-info {
                    font-size: 1.8rem;
                    text-align: center;
                }

                .details {
                    background: #1e1e1e;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }

                .seats-info {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                }

                .total {
                    font-size: 1.5rem;
                    text-align: right;
                    padding: 10px 0;
                    border-top: 1px solid white;
                }

                button {
                    width: 100%;
                    padding: 15px;
                    background: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-top: 20px;
                }

                button:hover {
                    background: #45a049;
                }
            </style>

            <div class="container">
                <div class="header-info">
                    <div class="movie-info">
                        ${this.movieDetails.title} - ${this.movieDetails.location_name}
                        <br>
                        ${new Date(this.movieDetails.show_date).toLocaleDateString()} - 
                        ${new Date(this.movieDetails.show_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>

                <div class="details">
                    <div class="seats-info">
                        <span>Selected Seats:</span>
                        <span>${this.seats.join(', ')}</span>
                    </div>
                    <div class="seats-info">
                        <span>Price per Seat:</span>
                        <span>$12.00</span>
                    </div>
                    <div class="total">
                        Total: $${total.toFixed(2)}
                    </div>
                    <button id="checkoutButton">Checkout</button>
                </div>

                ${!isLoggedIn ? '<login-form></login-form>' : ''}
            </div>
        `;

        this.shadowRoot.getElementById('checkoutButton')
            .addEventListener('click', () => this.handleCheckout());
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    async handleCheckout() {
        const userCookie = this.getCookie('user');
        let userData = null;
        
        if (userCookie) {
            try {
                userData = JSON.parse(decodeURIComponent(userCookie));
                console.log('User Data from cookie:', userData); // Debug log
            } catch (e) {
                console.error('Error parsing user cookie:', e);
            }
        }

        const total = this.calculateTotal();
        const requestData = {
            member_id: userData ? userData.member_id : null,
            showtime_id: this.showtimeId,
            seats: this.seats,
            total: total,
            points: userData ? total : 0
        };

        console.log('Sending booking data:', requestData); // Debug log

        try {
            const response = await fetch('./src/services/process_booking.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Server response:', result); // Debug log
            
            if (result.success) {
                this.renderThankYou();
            } else {
                throw new Error(result.message || 'Booking failed');
            }
        } catch (error) {
            console.error('Error processing booking:', error);
            alert('An error occurred during checkout. Please try again.');
        }
    }

    renderThankYou() {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 20px;
                    color: white;
                    font-family: 'Kantumruy Pro', sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    min-height: 60vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }

                .header-info {
                    background: #1e1e1e;
                    padding: 40px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    width: 100%;
                    box-sizing: border-box;
                }

                h1 {
                    font-family: 'Italiana', serif;
                    font-size: 2.5rem;
                    margin: 0 0 20px 0;
                    color: #FFD700;
                }

                p {
                    font-size: 1.2rem;
                    margin: 10px 0;
                    line-height: 1.6;
                }

                button {
                    background-color: #FFD700;
                    color: #1e1e1e;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    font-family: 'Kantumruy Pro', sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    border-radius: 4px;
                    margin-top: 2rem;
                    transition: background-color 0.3s ease;
                }

                button:hover {
                    background-color: #FFA500;
                }
            </style>
            <div class="container">
                <div class="header-info">
                    <h1>Thank You for Your Purchase!</h1>
                    <p>Your booking has been confirmed.</p>
                    <p>An email confirmation will be sent shortly.</p>
                    <button onclick="window.location.hash='#'">Return to Home</button>
                </div>
            </div>
        `;
    }
}

customElements.define('checkout-page', CheckoutPage); 