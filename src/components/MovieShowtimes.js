class MovieShowtimes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.selectedDate = null;
        this.movieTitle = '';
        this.showtimes = null;
    }

    connectedCallback() {
        this.movieTitle = this.getAttribute('movie-title');
        const showId = this.getAttribute('show-id');
        if (showId) {
            this.fetchShowtimes(showId);
        }
    }

    async fetchShowtimes(showId) {
        try {
            const response = await fetch(`./src/services/fetch_showtimes.php?show_id=${showId}`);
            this.showtimes = await response.json();
            
            const dates = [...new Set(this.showtimes.map(item => item.show_date))];
            this.selectedDate = dates[0];

            this.render(dates);
        } catch (error) {
            console.error('Error fetching showtimes:', error);
            this.shadowRoot.innerHTML = '<p>Error loading showtimes.</p>';
        }
    }

    render(dates) {
        this.shadowRoot.innerHTML = `
            <style>
                .showtimes-container {
                    width: 500px;
                    color: white;
                    font-family: 'Kantumury Pro Thin', serif;
                    background: #1e1e1e;
                    padding: 20px;
                    border-radius: 10px;
                    border: 2px solid white;
                }

                h2 {
                    font-family: 'Italiana', serif;
                    font-size: 2rem;
                    margin: 0 0 20px 0;
                }

                /* Date Selector Styles */
                .date-selector {
                    margin-bottom: 20px;
                    width: 100%;
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

                select:hover, select:focus {
                    background: #3c3c3c;
                    outline: none;
                }

                /* Location and Times Styles */
                .location-row {
                    display: flex;
                    flex-direction: column;
                    margin: 30px 0;
                }

                .location-name {
                    font-size: 1.5rem;
                    margin-bottom: 15px;
                    padding-left: 20px;
                }

                .times-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .time-slot {
                    font-size: 1.5rem;
                    padding: 5px 15px;
                    border: 2px solid white;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .time-slot:hover {
                    background-color: white;
                    color: #1e1e1e;
                }

                /* Animation Classes */
                #showtimes-content {
                    transition: opacity 0.2s ease;
                }

                .fade-out { opacity: 0; }
                .fade-in { opacity: 1; }
            </style>

            <div class="showtimes-container">
                <h2>Showtimes</h2>
                <div class="date-selector">
                    <select id="date-select">
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
                    ${this.renderShowtimes(this.showtimes, this.selectedDate)}
                </div>
            </div>
        `;

        // Add event listener for date changes
        this.shadowRoot.getElementById('date-select').addEventListener('change', this.handleDateChange.bind(this));
    }

    handleDateChange(event) {
        const newDate = event.target.value;
        const content = this.shadowRoot.getElementById('showtimes-content');
        
        if (content) {
            content.classList.add('fade-out');
            
            setTimeout(() => {
                this.selectedDate = newDate;
                const updatedContent = this.shadowRoot.getElementById('showtimes-content');
                if (updatedContent) {
                    updatedContent.innerHTML = this.renderShowtimes(this.showtimes, this.selectedDate);
                    updatedContent.classList.remove('fade-out');
                }
            }, 200);
        }
    }

    renderShowtimes(showtimes, selectedDate) {
        const filteredShowtimes = showtimes.filter(item => item.show_date === selectedDate);
        const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        return filteredShowtimes.map(location => {
            const times = location.times.split(',');
            const showtimeIds = location.showtime_id.split(',');
            
            return `
                <div class="location-row">
                    <div class="location-name">${location.location_name}</div>
                    <div class="times-container">
                        ${times.map((time, index) => `
                            <div class="time-slot" 
                                onclick="window.location.hash='#SeatSelection?movie=${encodeURIComponent(this.movieTitle)}&location=${encodeURIComponent(location.location_name)}&time=${encodeURIComponent(time.trim())}&date=${encodeURIComponent(formattedDate)}&showtimeId=${showtimeIds[index].trim()}'">
                                ${time.trim()}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
}

customElements.define('movie-showtimes', MovieShowtimes);
