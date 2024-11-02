class MovieShowtimes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedDate = null;
    }

    connectedCallback() {
        const showId = this.getAttribute('show-id');
        this.fetchShowtimes(showId);
    }

    async fetchShowtimes(showId) {
        try {
            const response = await fetch(`./src/services/fetch_showtimes.php?show_id=${showId}`);
            const showtimes = await response.json();
            
            const dates = [...new Set(showtimes.map(item => item.show_date))];
            this.selectedDate = dates[0];

            this.shadowRoot.innerHTML = `
                <style>
                    .showtimes-container {
                        width: 400px;
                        color: white;
                        font-family: 'Kantumury Pro Thin', serif;
                        background: #1e1e1e;
                        padding: 20px;
                        border-radius: 10px;
                        border: 2px solid white;
                    }

                    .date-selector {
                        margin-bottom: 20px;
                        width: 100%;
                        position: relative;
                    }

                    select {
                        width: 100%;
                        padding: 8px 12px;
                        background: #2c2c2c;
                        color: white;
                        border: 1px solid white;
                        border-radius: 5px;
                        font-family: 'Kantumury Pro Thin', serif;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: background-color 0.2s ease;
                    }

                    select:hover {
                        background: #3c3c3c;
                    }

                    select:focus {
                        outline: none;
                        background: #3c3c3c;
                    }

                    /* Override default option styling */
                    select option {
                        background: #2c2c2c;
                        color: white;
                        padding: 12px;
                    }

                    select option:hover,
                    select option:focus {
                        background: #3c3c3c;
                    }

                    .location-row {
                        margin-bottom: 20px;
                        opacity: 1;
                        transition: opacity 0.2s ease;
                    }

                    .location-name {
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                        padding-bottom: 5px;
                        border-bottom: 1px solid rgba(255,255,255,0.2);
                    }

                    .times-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }

                    .time-slot {
                        padding: 8px 16px;
                        border: 1px solid white;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        font-size: 0.9rem;
                        background: transparent;
                        color: white;
                    }

                    .time-slot:hover {
                        background-color: white;
                        color: #1e1e1e;
                    }

                    h2 {
                        font-family: 'Italiana', serif;
                        font-size: 2rem;
                        margin-top: 0;
                        margin-bottom: 20px;
                    }

                    #showtimes-content {
                        transition: opacity 0.2s ease;
                    }

                    .fade-out {
                        opacity: 0;
                    }

                    .fade-in {
                        opacity: 1;
                    }
                </style>

                <div class="showtimes-container">
                    <h2>Showtimes</h2>
                    <div class="date-selector">
                        <select>
                            ${dates.map(date => `
                                <option value="${date}">
                                    ${new Date(date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="showtimes-content" class="fade-in">
                        ${this.renderShowtimes(showtimes, this.selectedDate)}
                    </div>
                </div>
            `;

            // Add event listener for date changes
            this.shadowRoot.querySelector('select').addEventListener('change', (e) => this.handleDateChange(e, showtimes));

        } catch (error) {
            console.error('Error fetching showtimes:', error);
            this.shadowRoot.innerHTML = '<p>Error loading showtimes.</p>';
        }
    }

    handleDateChange(event, showtimes) {
        const content = this.shadowRoot.getElementById('showtimes-content');
        content.classList.add('fade-out');
        
        setTimeout(() => {
            this.selectedDate = event.target.value;
            content.innerHTML = this.renderShowtimes(showtimes, this.selectedDate);
            content.classList.remove('fade-out');
        }, 200);
    }

    renderShowtimes(showtimes, selectedDate) {
        const filteredShowtimes = showtimes.filter(item => item.show_date === selectedDate);
        
        return filteredShowtimes.map(location => `
            <div class="location-row">
                <div class="location-name">${location.location_name}</div>
                <div class="times-container">
                    ${location.times.split(',').map(time => `
                        <div class="time-slot">${time}</div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

customElements.define('movie-showtimes', MovieShowtimes);
