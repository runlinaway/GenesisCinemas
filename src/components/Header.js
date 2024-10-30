class AppHeader extends HTMLElement {
  constructor() {
      super();
      // Attach shadow DOM to the element
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
          @font-face {
          font-family: 'Italiana';
          src: url('../assets/fonts/Italiana-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          }

          @font-face {
          font-family: 'Kantumury Pro Thin';
          src: url('../assets/fonts/KantumruyPro.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          }

          body {
              background-color: #1e1e1e;
              margin: 0; /* Remove default margins */
              padding: 0; /* Remove default padding */
          }

          /* Navbar styling */
          .navbar {
              background-color: #333;
              padding: 1rem;
              display: flex;
              justify-content: center; /* Center navbar items */
              align-items: center;
          }

          .navbar-links {
              list-style: none;
              margin: 0;
              padding: 0;
              display: flex;
              gap: 1.5rem;
              font-size: inherit;
              font-family: 'Kantumury Pro Thin', serif;
          }

          .navbar-links li {
              display: inline;
          }

          .navbar-links a {
              color: white;
              text-decoration: none;
              font-size: 1.2rem;
          }

          .navbar-links a:hover {
              color: #f0f0f0;
              text-decoration: underline;
          }

          .dropdown {
              position: relative;
          }

          .dropbtn {
              color: white;
              font-size: 1.2rem;
              cursor: pointer;
          }

          .dropdown-content {
              display: none;
              position: absolute;
              background-color: #444;
              box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
              min-width: 160px;
              z-index: 1;
          }

          .dropdown-content a {
              color: white;
              padding: 12px 16px;
              text-decoration: none;
              display: block;
          }

          .dropdown-content a:hover {
              background-color: #555;
          }

          /* Show the dropdown content when hovering over .dropdown */
          .dropdown:hover .dropdown-content {
              display: block;
          }

          /* Style for the login link */
          .login-link {
              color: white;
              font-size: 1.2rem;
              text-decoration: none;
              margin-left: auto; /* Push to the right */
          }

          .login-link:hover {
              color: #f0f0f0;
              text-decoration: underline;
          }

          header {
              display: flex;
              justify-content: center; /* Horizontally center the content */
              background-color: #1e1e1e; /* Optional: Add a background color */
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

      <nav class="navbar">
          <a href="#Login" class="login-link">Member Login</a> <!-- Member login link -->
      </nav>

      <header>
          <h1>Genesis Cinemas</h1>
      </header>

      <nav class="navbar">
          <ul class="navbar-links">
              <li class="dropdown">
                  <a href="#Movies" class="dropbtn">Movies</a>
                  <div class="dropdown-content">
                      <a href="#">Featured</a>
                      <a href="#">Upcoming</a>
                      <a href="#">Now Showing</a>
                  </div>
              </li>

              <li class="dropdown">
                  <a href="#" class="dropbtn">Locations</a>
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
}

// Define the custom element
customElements.define('app-header', AppHeader);
