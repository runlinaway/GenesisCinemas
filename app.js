import './src/pages/HomePage.js';
import './src/pages/MoviesPage.js';
import './src/pages/LocationsPage.js';
import './src/pages/BarPage.js';
import './src/pages/SignupPage.js';
import './src/pages/MovieDetailsPage.js';
import './src/components/Header.js';
import './src/components/Footer.js';
import './src/pages/SeatSelectionPage.js';
import './src/components/CinemaLayout.js';
import './src/pages/CheckoutPage.js';

// Main App Initialization
function init() {
    // Set up the main layout
    const root = document.getElementById('app');
    root.innerHTML = ''; // Clear any existing content

    // Add Header and Footer
    const header = document.createElement('app-header');
    const footer = document.createElement('app-footer');
    root.appendChild(header);

    // Create a container for the page content
    const pageContainer = document.createElement('div');
    pageContainer.id = 'page-container';
    root.appendChild(pageContainer);

    root.appendChild(footer);

    // Load the initial page based on the URL hash
    loadPage();

    // Set up a listener for hash changes (for navigation)
    window.addEventListener('hashchange', loadPage);
}

// Function to load the appropriate page component based on the URL hash
function loadPage() {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = '';

    let page;
    const hash = window.location.hash;

    if (hash.startsWith('#MovieDetails/')) {
        const movieId = hash.split('/')[1];
        page = document.createElement('movie-details-page');
        page.setAttribute('movie-id', movieId);
    } else if (hash.startsWith('#Movies')) {
        page = document.createElement('movies-page');
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        if (params.has('location')) {
            page.setAttribute('location-id', params.get('location'));
        }
    } else if (hash.startsWith('#SeatSelection')) {
        page = document.createElement('seat-selection-page');
    } else if (hash.startsWith('#Payment')) {
        page = document.createElement('checkout-page');
    } else {
        switch (hash) {
            case '#Locations':
                page = document.createElement('locations-page');
                break;
            case '#Bar':
                page = document.createElement('bar-page');
                break;
            case '#Signup':
                page = document.createElement('signup-page');
                break;
            case '#Home':
            default:
                page = document.createElement('home-page');
                break;
        }
    }
    
    pageContainer.appendChild(page);
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', init);

