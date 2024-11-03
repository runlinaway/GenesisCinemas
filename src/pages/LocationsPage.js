import '../components/MapWindow.js';

class LocationsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 0;
          background-color: #1e1e1e;
          color: white;
        }

        h2 {
          font-family: 'Italiana', serif;
          font-size: 2.5rem;
          font-weight: normal;
          text-align: left;
          margin: 30px 0;
          margin-left: 20px;
          text-decoration: underline;
          text-decoration-thickness: 2px;
        }

        .locations-list {
          display: flex;
          flex-direction: column;
          gap: 25px;
          padding: 20px;
        }

        .location-card {
          background: #2a2a2a;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .location-card:hover {
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        }

        .location-info {
          flex: 1;
        }

        .location-card h3 {
          margin: 0 0 15px 0;
          color: white;
          font-family: 'Kantumruy Pro', sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
        }

        .location-card p {
          margin: 8px 0;
          color: #b3b3b3;
          font-family: 'Kantumruy Pro', sans-serif;
          font-size: 1rem;
        }
      </style>

      <h2>Our Locations</h2>
      <map-window id="locationMap"></map-window>
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
      const mapWindow = this.shadowRoot.querySelector('map-window');
      
      locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'location-card';
        card.innerHTML = `
          <div class="location-info">
            <h3>${location.name}</h3>
            <p>${location.address}</p>
            <p>${location.postcode}</p>
          </div>
        `;

        card.addEventListener('click', () => {
          mapWindow.zoomToLocation(location.postcode, location.name);
        });

        locationsList.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }
}

customElements.define('locations-page', LocationsPage);
  