import '../components/MapWindow.js';

class LocationsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        h2 {
          color: #333;
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .locations-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .location-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .location-card h3 {
          margin: 0 0 10px 0;
          color: #333;
        }

        .location-card p {
          margin: 5px 0;
          color: #666;
        }

        .view-movies-btn {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 15px;
          background-color: #1e1e1e;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .view-movies-btn:hover {
          background-color: #333;
        }
      </style>

      <h2>Our Locations</h2>
      <map-window></map-window>
      <div class="locations-list"></div>
    `;
  }

  async connectedCallback() {
    await this.fetchAndDisplayLocations();
  }

  async fetchAndDisplayLocations() {
    try {
      const response = await fetch('./src/services/fetch_locations.php');
      const locations = await response.json();
      
      const locationsList = this.shadowRoot.querySelector('.locations-list');
      
      locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'location-card';
        card.innerHTML = `
          <h3>${location.name}</h3>
          <p>${location.address}</p>
          <p>${location.postcode}</p>
          <button class="view-movies-btn">View Movies</button>
        `;

        card.querySelector('.view-movies-btn').addEventListener('click', () => {
          window.location.hash = `#Movies/nowshowing?location=${location.location_id}`;
          const event = new CustomEvent('location-selected', {
            detail: { locationId: location.location_id },
            bubbles: true,
            composed: true
          });
          document.dispatchEvent(event);
        });

        locationsList.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
}

customElements.define('locations-page', LocationsPage);
  