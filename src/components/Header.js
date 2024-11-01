class AppHeader extends HTMLElement {
  constructor() {
      super();
      // Attach shadow DOM to the element
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
            display: none; /* Hide by default */
            position: absolute;
            background-color: #444;
            box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
            min-width: 160px;
            z-index: 1;
            transform: translateY(-5px); /* Start 5px above its normal position */
            opacity: 0; /* Start hidden */
            transition: transform 0.3s ease, opacity 0.3s ease; /* Smooth transition for position and visibility */
        }

        .dropdown-content.show {
            display: block; /* Show the dropdown content */
            transform: translateY(0); /* Move to its original position */
            opacity: 1; /* Fully visible */
        }

        .dropdown-content a {
            color: white;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            position: relative; /* Position for pseudo-element */
            transition: background-color 0.2s; /* Smooth background color transition */
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

        .dropdown-content a:hover {
            background-color: #555;
        }

        .dropdown-content a:hover::after {
            width: 100%; /* Extend underline on hover */
        }

        /* Show the dropdown content when hovering over .dropdown */
        .dropdown:hover .dropdown-content {
            display: block; /* Show the dropdown content */
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

        /* Show the dropdown content when hovering over .dropdown */
        .dropdown:hover .dropdown-content {
            display: block;
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
                <a href="#Movies" class="dropbtn">Movies</a>
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="dropdown-chevron">
                        <title>Chevron Down</title>
                        <g id="Complete">
                            <g id="F-Chevron">
                                <polyline id="Down" points="5 8.5 12 15.5 19 8.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </g>
                    </g>
                </svg>

                <div class="dropdown-content">
                    <a href="#">Featured</a>
                    <a href="#">Upcoming</a>
                    <a href="#">Now Showing</a>
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
                <div class="dropdown-content">
                    <a href="#">Location 1</a>
                    <a href="#">Location 2</a>
                    <a href="#">Location 3</a>
                </div>
            </li>

            <li><a href="#Bar">Bar</a></li>
            <li><a href="#Corporate">Corporate</a></li>
            <li><a href="#FAQ">FAQ</a></li>

            <li>
                <div class="navbar-search">
                    <input type="text" class="search-input" placeholder="Search...">
                    <button class="search-btn">
                        <i class="fas fa-search"></i> <!-- Font Awesome icon, requires external link -->
                    </button>
                </div>
            </li>
        </ul>
    </nav>
    `;
  }

  // Use the connectedCallback lifecycle method to add event listeners
  connectedCallback() {
    // Add event listener for popstate
    window.addEventListener('popstate', this.updateLoginLink.bind(this));
    
    this.updateLoginLink();

    const dropdowns = this.shadowRoot.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.classList.add('show');
      });

      dropdown.addEventListener('mouseleave', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.classList.remove('show');
      });
    });
  }

  updateLoginLink() {
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userCookie = getCookie('user');
    console.log('User Cookie:', userCookie); // Debugging: Log the cookie

    if (userCookie) {
        try {
            // Decode the cookie value before parsing
            const decodedCookie = decodeURIComponent(userCookie);
            const userData = JSON.parse(decodedCookie);
            console.log('User Data:', userData); // Debugging: Log parsed user data
    
            if (userData.email) {
                const memberLink = this.shadowRoot.querySelector('.login-link a');
                memberLink.textContent = userData.email; // Set the text to the member's email
                memberLink.setAttribute('href', '#Signup'); 
                console.log('Updated login link to:', userData.email); // Debugging: Confirm update
            }
        } catch (e) {
            console.error('Error parsing user cookie:', e); // Debugging: Log parsing error
        }
    } else {
        console.log('No user cookie found.'); // Debugging: Log when cookie is not found
    }
    
}

disconnectedCallback() {
    // Remove event listener to prevent memory leaks
    window.removeEventListener('popstate', this.updateLoginLink.bind(this));
}




}

// Define the custom element
customElements.define('app-header', AppHeader);
