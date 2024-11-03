class AppHeader extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
        body {
            background-color: #1e1e1e;
            margin: 0; /* Remove default margins */
            padding: 0; /* Remove default padding */
        }

        .header-wrapper {
            position: relative; /* Make the wrapper a positioned element */
        }

        .header-wrapper header {
            padding: 20px; /* Add some padding for the header */
        }

        /* Navbar styling */
        .navbar {
            background-color: #1e1e1e;
            padding: 0.5rem;
            display: flex;
            justify-content: center; /* Center navbar items */
            align-items: center;
            border-bottom: 1px solid #b3b3b3; 
        }

        .navbar-links {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            gap: 5rem;
            font-size: inherit;
            font-family: 'Kantumury Pro Thin', serif;
        }

        .navbar-links li {
            display: inline;
            position: relative; /* Position relative for pseudo-element */
        }

        .navbar-links a {
            color: #b3b3b3;
            text-decoration: none;
            font-size: 1.8rem;
            position: relative; /* Position for pseudo-element */
            transition: color 0.2s; /* Smooth color transition */
        }

        .navbar-links a::after {
            content: '';
            display: block;
            height: 2px; /* Height of the underline */
            color: white;
            background-color: #f0f0f0; /* Underline color */
            width: 0; /* Initial width */
            transition: width 0.2s; /* Smooth width transition */
            position: absolute;
            left: 0;
            bottom: 0px; /* Position below the text */
        }

        .navbar-links a:hover {
            color: #f0f0f0;
        }

        .navbar-links a:hover::after {
            width: 100%; /* Extend underline on hover */
        }

        .dropdown {
            position: relative;
        }

        .dropbtn {
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            position: relative; /* Position for pseudo-element */
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #444;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
            min-width: 160px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .dropdown-content.show {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }

        .dropdown-content a {
            color: #b3b3b3;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            transition: color 0.2s, background-color 0.2s;
            font-size: 1.2rem;
        }

        .dropdown-content a:hover {
            color: #f0f0f0;
            background-color: #555;
        }

        .dropdown-content a::after {
            content: '';
            display: block;
            height: 2px; /* Height of the underline */
            background-color: #f0f0f0; /* Underline color */
            width: 0; /* Initial width */
            transition: width 0.2s; /* Smooth width transition */
            position: absolute;
            left: 0;
            bottom: 0px; /* Adjusted position closer to the text */
        }

        .dropdown-content a:hover::after {
            width: 100%; /* Extend underline on hover */
        }

        /* Show the dropdown content when hovering over .dropdown */
        .dropdown:hover .dropdown-content {
            display: block;
            opacity: 1;
            transform: translateY(0);
        }


        .dropdown-chevron {
            width: 22px; /* Set the desired width */
            height: 22px; /* Set the desired height */
            margin-left: 5px; /* Space between the text and the icon */
            vertical-align: 50%%; /* Aligns the image vertically with the text */
            color: #b3b3b3;
        }
        
        .dropdown:hover .dropdown-chevron {
            color: white; /* Change color on hover */
            transition: color 0.2s; /* Smooth transition */
        }

        /* Style for the login link */
        .login-link {
            position: absolute; /* Position the login link absolutely */
            right: 10px; /* Align to the right */
            top: 20%; /* Center vertically relative to the header */
            transform: translateY(-50%);  
            white-space: nowrap; /* Prevent the link from wrapping */
            color: #b3b3b3; /* Default text color */
            font-size: 1.2rem; /* Font size */
            text-decoration: none; /* Remove default underline */
            margin-left: auto; /* Push to the right */
        }

        .login-link::after {
            content: ""; /* Empty content for the pseudo-element */
            position: absolute; /* Position it absolutely */
            left: 0; /* Start from the left */
            bottom: 0; /* Align at the bottom of the text */
            height: 2px; /* Thickness of the underline */
            width: 100%; /* Full width for the hover effect */
            background-color: #f0f0f0; /* Underline color to match hover text color */
            transform: scaleX(0); /* Initially scaled down to 0 */
            transition: transform 0.2s ease; /* Smooth transition for scaling */
            transform-origin: left; /* Origin of the scaling effect */
            color: white;
        }

        .login-link:hover {
            color: #f0f0f0; /* Change text color on hover */
            transition: color 0.2s; /* Smooth transition */
        }

        .login-link:hover::after {
            transform: scaleX(1); /* Scale to full width on hover */
        }

        header {
            display: flex;
            justify-content: center; /* Horizontally center the content */
            background-color: #1e1e1e; /* Optional: Add a background color */
        }

        header a {
            text-decoration: none; /* Remove underline */
            color: inherit; /* Use the current text color (white) */
        }

        header h1 {
            color: white; /* Optional: Adjust text color */
            font-size: 64px; /* Optional: Adjust font size */
            text-align: center; /* Ensure text is centered */
            font-family: 'Italiana', serif;
            padding: 0; /* Remove any padding */
            margin: 0; /* Remove any default margin */
            line-height: 1.2; /* Adjust line height for spacing */
            font-weight: normal;
        }

        .navbar-search {
            position: relative;
            display: flex;
            align-items: center;
            width: 24px;
            transition: width 0.3s ease;
            height: 100%; /* Match parent height */
            margin-top: 0px; /* Align with other navbar items */
        }

        .navbar-search:hover {
            width: 200px;
        }

        .search-input {
            position: absolute;
            left: 24px;
            padding: 8px;
            border: 1px solid #b3b3b3;
            border-radius: 4px;
            background-color: #2d2d2d;
            color: #f0f0f0;
            font-size: 1rem;
            width: 0;
            opacity: 0;
            transition: width 0.3s ease, opacity 0.3s ease;
            cursor: pointer;
            height: 20px; /* Match height with other navbar items */
        }

        .navbar-search:hover .search-input {
            width: calc(100% - 24px);
            opacity: 1;
        }

        .search-icon {
            position: absolute;
            left: 0;
            width: 20px;
            height: 20px;
            color: #b3b3b3; /* This controls the stroke color through currentColor */
            cursor: pointer;
            z-index: 2;
            transition: color 0.2s; /* Match other hover transitions */
        }

        .navbar-search:hover .search-icon {
            color: #f0f0f0; /* Change color on hover to match other elements */
        }

        .search-dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 24px;
            width: calc(100% - 24px);
            background-color: #2d2d2d;
            border: 1px solid #b3b3b3;
            border-radius: 4px;
            margin-top: 4px;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        }

        .search-dropdown a {
            display: block;
            padding: 10px 16px;
            color: #b3b3b3;
            text-decoration: none;
            transition: background-color 0.2s, color 0.2s;
            font-size: 1.2rem;
        }

        .search-dropdown a:hover {
            background-color: #444;
            color: #f0f0f0;
        }
    </style>

    <div class="header-wrapper">
    <nav class="login-link">
        <a href="#Signup" class="login-link">Member Login</a> <!-- Member login link -->
    </nav>

    <header>
        <a href="#"><h1>Genesis Cinemas</h1></a>
    </header>
    </div>

    <nav class="navbar">
        <ul class="navbar-links">
            <li class="dropdown">
                <a href="#Movies/nowshowing" class="dropbtn">Movies</a>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="dropdown-chevron">
                        <title>Chevron Down</title>
                        <g id="Complete">
                            <g id="F-Chevron">
                                <polyline id="Down" points="5 8.5 12 15.5 19 8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </g>
                </svg>

                <div class="dropdown-content">
                    <a href="#Movies/featured">Featured</a>
                    <a href="#Movies/upcoming">Upcoming</a>
                    <a href="#Movies/nowshowing">Now Showing</a>
                </div>
            </li>

            <li class="dropdown">
                <a href="#Locations" class="dropbtn">Locations</a>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="dropdown-chevron">
                        <title>Chevron Down</title>
                        <g id="Complete">
                            <g id="F-Chevron">
                                <polyline id="Down" points="5 8.5 12 15.5 19 8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </g>
                </svg>
                <div class="dropdown-content" id="locations-dropdown">
                    <!-- Locations will be populated dynamically -->
                </div>
            </li>

            <li><a href="#Bar">Bar</a></li>
            <li><a href="#Corporate">Corporate</a></li>
            <li><a href="#FAQ">FAQ</a></li>

            <li>
                <div class="navbar-search">
                    <input type="text" class="search-input" placeholder="Search">
                    <div class="search-dropdown"></div>
                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="search-icon">
                        <title>Search</title>
                        <g id="Complete">
                            <g id="Search">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="none"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </li>
        </ul>
    </nav>
    `;
  }

  async connectedCallback() {
    await this.fetchAndPopulateLocations();
    this.setupSearch();
    this.updateLoginLink();
    
    window.addEventListener('popstate', this.updateLoginLink.bind(this));
    document.addEventListener('cookieChange', () => {
        this.updateLoginLink();
    });
  }

  async fetchAndPopulateLocations() {
    try {
        const response = await fetch('./src/services/fetch_locations.php');
        const locations = await response.json();
        
        if (!locations.error) {
            const locationsDropdown = this.shadowRoot.querySelector('#locations-dropdown');
            locationsDropdown.innerHTML = ''; // Clear existing locations
            
            /*
            // Add "All Locations" option
            const allLocationsLink = document.createElement('a');
            allLocationsLink.href = '#Movies/nowshowing';
            allLocationsLink.textContent = 'All Locations';
            allLocationsLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '#Movies/nowshowing';
                // Dispatch event with a slight delay to ensure MoviesPage is mounted
                setTimeout(() => {
                    const event = new CustomEvent('location-selected', {
                        detail: { locationId: '' },
                        bubbles: true,
                        composed: true
                    });
                    document.dispatchEvent(event);
                }, 50);
            });
            locationsDropdown.appendChild(allLocationsLink);
            */
            // Add locations from database
            locations.forEach(location => {
                const link = document.createElement('a');
                link.href = `#Movies/nowshowing?location=${location.location_id}`;
                link.textContent = location.name;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.hash = `#Movies/nowshowing?location=${location.location_id}`;
                    // Dispatch event with a slight delay to ensure MoviesPage is mounted
                    setTimeout(() => {
                        const event = new CustomEvent('location-selected', {
                            detail: { locationId: location.location_id },
                            bubbles: true,
                            composed: true
                        });
                        document.dispatchEvent(event);
                    }, 50);
                });
                locationsDropdown.appendChild(link);
            });
        }
    } catch (error) {
        console.error('Error fetching locations:', error);
    }
  }

  setupSearch() {
    const searchInput = this.shadowRoot.querySelector('.search-input');
    const searchDropdown = this.shadowRoot.querySelector('.search-dropdown');
    const searchContainer = this.shadowRoot.querySelector('.navbar-search');
    let debounceTimeout;
    let isHovering = false;

    // Track hover state for both container and dropdown
    const handleMouseEnter = () => {
      isHovering = true;
      if (searchInput.value.trim()) {
        searchDropdown.style.display = 'block';
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      // Small timeout to check if we've moved to the other element
      setTimeout(() => {
        if (!isHovering) {
          searchDropdown.style.display = 'none';
          searchInput.value = '';
          searchInput.blur();
        }
      }, 100);
    };

    // Add hover behavior to both elements
    searchContainer.addEventListener('mouseenter', handleMouseEnter);
    searchContainer.addEventListener('mouseleave', handleMouseLeave);
    searchDropdown.addEventListener('mouseenter', handleMouseEnter);
    searchDropdown.addEventListener('mouseleave', handleMouseLeave);

    searchInput.addEventListener('input', (event) => {
      clearTimeout(debounceTimeout);
      const query = event.target.value.trim();

      if (!query) {
        searchDropdown.style.display = 'none';
        return;
      }

      debounceTimeout = setTimeout(async () => {
        const results = await this.searchMovies(query);
        this.updateSearchDropdown(results, searchDropdown);
      }, 300);
    });

    searchInput.addEventListener('focus', () => {
      searchInput.placeholder = '';
    });

    searchInput.addEventListener('blur', () => {
      searchInput.placeholder = 'Search';
    });
  }

  async searchMovies(query) {
    try {
      const response = await fetch(`./src/services/search_movies.php?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }

  updateSearchDropdown(results, dropdown) {
    dropdown.innerHTML = '';
    
    if (results.length > 0) {
      results.forEach(movie => {
        const link = document.createElement('a');
        link.href = `#MovieDetails/${encodeURIComponent(movie.title)}`;
        link.textContent = movie.title;
        link.addEventListener('click', () => {
          this.shadowRoot.querySelector('.search-input').value = '';
          dropdown.style.display = 'none';
        });
        dropdown.appendChild(link);
      });
      dropdown.style.display = 'block';
    } else {
      const noResults = document.createElement('a');
      noResults.textContent = 'No results found';
      noResults.style.cursor = 'default';
      noResults.style.pointerEvents = 'none';
      dropdown.appendChild(noResults);
      dropdown.style.display = 'block';
    }
  }

  updateLoginLink() {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userCookie = getCookie('user');
    if (userCookie) {
      try {
        const decodedCookie = decodeURIComponent(userCookie);
        const userData = JSON.parse(decodedCookie);
        if (userData.email) {
          const memberLink = this.shadowRoot.querySelector('.login-link a');
          memberLink.textContent = userData.email;
          memberLink.setAttribute('href', '#Signup');
        }
      } catch (e) {
        console.error('Error parsing user cookie:', e);
      }
    }
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.updateLoginLink.bind(this));
    document.removeEventListener('cookieChange', this.updateLoginLink.bind(this));
  }
}

customElements.define('app-header', AppHeader);