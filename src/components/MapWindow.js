import { GOOGLE_MAPS_API_KEY } from '../config.js';

class MapWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.markers = {};
    this.map = null;
    
    this.shadowRoot.innerHTML = `
      <style>
        #map {
          width: 100%;
          height: 400px;
          margin-bottom: 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
      </style>
      <div id="map"></div>
    `;
  }

  async connectedCallback() {
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', () => this.initMap());
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  async initMap() {
    this.map = new google.maps.Map(this.shadowRoot.getElementById('map'), {
      zoom: 12,
      center: { lat: 1.3521, lng: 103.8198 },
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#242f3e" }]
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#746855" }]
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }]
        }
      ]
    });

    try {
      const response = await fetch('./src/services/fetch_locations.php');
      const locations = await response.json();
      
      locations.forEach(async location => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: location.postcode }, (results, status) => {
          if (status === 'OK') {
            const marker = new google.maps.Marker({
              map: this.map,
              position: results[0].geometry.location,
              title: location.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#E31837',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              },
              animation: google.maps.Animation.DROP
            });
            
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="
                    background-color: white;
                    color: #1e1e1e;
                    padding: 12px;
                    border-radius: 8px;
                    font-family: 'Kantumruy Pro', sans-serif;
                    min-width: 200px;
                ">
                    <h3 style="
                        margin: 0 0 8px 0;
                        font-size: 1.2rem;
                        color: #1e1e1e;
                        font-weight: 600;
                    ">${location.name}</h3>
                    <p style="
                        margin: 0;
                        color: #4a4a4a;
                        font-size: 0.9rem;
                    ">${location.address}</p>
                    <p style="
                        margin: 4px 0 0 0;
                        color: #4a4a4a;
                        font-size: 0.9rem;
                    ">${location.postcode}</p>
                </div>
              `,
              pixelOffset: new google.maps.Size(0, -5),
              maxWidth: 300
            });

            marker.addListener('click', () => {
              infoWindow.open(this.map, marker);
            });

            this.markers[location.postcode] = {
              marker: marker,
              infoWindow: infoWindow
            };
          }
        });
      });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  zoomToLocation(postcode, locationName) {
    const markerInfo = this.markers[postcode];
    if (markerInfo) {
      // Close any open info windows
      Object.values(this.markers).forEach(info => {
        info.infoWindow.close();
      });

      // Zoom to the selected location
      this.map.setZoom(16);
      this.map.panTo(markerInfo.marker.getPosition());
      
      // Open this location's info window
      markerInfo.infoWindow.open(this.map, markerInfo.marker);
      
      // Bounce the marker briefly
      markerInfo.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        markerInfo.marker.setAnimation(null);
      }, 1500);
    }
  }
}

customElements.define('map-window', MapWindow); 