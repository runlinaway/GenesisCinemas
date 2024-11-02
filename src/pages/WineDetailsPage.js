class WineDetailsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const wineName = decodeURIComponent(this.getAttribute("wine-name"));
    console.log("Wine Name from attribute:", wineName); // Log the wine name
    this.fetchWineDetails(wineName);
  }

  async fetchWineDetails(name) {
    try {
      const response = await fetch(
        `./src/services/fetch_wine.php?name=${encodeURIComponent(name)}`
      );
      const wine = await response.json();

      console.log("Parsed Wine Data:", wine); // Log full wine data

      if (wine && !wine.error) {
        // Log the image URL to verify it's correct
        console.log("Wine Image URL:", wine.image_url);

        this.shadowRoot.innerHTML = `
        <style>
                        .container {
                            display: flex;
                            flex-direction: column; /* Stack elements vertically */
                            position: relative; /* Needed for absolute positioning of children */
                            width: 100%; /* Use full width for proper positioning */
                            position: relative; /* Needed for absolute positioning of children */
                        }

                        .movie-trailer {
                            width: 100%; /* Allow the trailer to take full width */
                            overflow: hidden; /* Hide overflow to maintain the aspect ratio */
                        }

                        .synopsis_container {
                            width: 422px; /* Set the width of the synopsis container */
                            color: white; /* Set text color to white */
                            font-family: 'Kantumury Pro Thin', serif;
                            margin-top: 10px; /* Space between trailer and synopsis */
                            padding-left: 40px; /* Add padding from the left edge */
                        }
                        
                        .synopsis_container h1 {
                            font-family: 'Italiana', serif;
                            font-size: 3rem; /* Italiana size 3rem */
                            font-weight: normal;
                            margin-bottom: 10px; /* Space below the heading */
                            text-decoration: underline; /* Underline the title */
                            text-decoration-color: white; /* Underline color */
                            text-decoration-thickness: 2px; /* Thickness of the underline */
                            border-radius: 10px; /* Rounded underline */
                        }
                        
                        .synopsis_container p {
                            font-family: 'Kantumury Pro Thin', serif;
                            font-size: 1.5rem; /* Synopsis text size */
                            margin: 0; /* Remove default margins */
                        }

                        .info_box {
                            margin-left: 40px; /* Add padding from the left edge */
                            border: 2px solid white; /* White border */
                            border-radius: 10px; /* Rounded corners */
                            padding: 20px; /* Padding inside the box */
                            margin-top: 40px; /* Space between synopsis and info box */
                            background:#1e1e1e; 
                            width: 378px; /* Match width with synopsis container */
                            color: white; /* Text color */
                            font-family: 'Kantumury Pro Thin', serif;

                        }

                        .info_box div {
                            margin-bottom: 10px; /* Space between each info item */
                            font-size: 1.5rem; /* Set font size for info items */
                        }

                        .info_box div span {
                             /* Bold label for each info item */
                        }
                    </style>
                <div class="container">
                    <div class="image-container">
                        <img class="wine-image" src="./src/assets/images/${wine.image_url}" alt="${wine.name}">
                    </div>
                    <div class="synopsis_container">
                        <h1>${wine.name}</h1>
                        <p>${wine.description}</p>
                    </div>
                    <div class="info_box">
                        <div><strong>Type:</strong> ${wine.type}</div>
                        <div><strong>Price:</strong> $${wine.price}</div>
                        <div><strong>Year:</strong> ${wine.year}</div>
                    </div>
                </div>
            `;
      } else {
        this.shadowRoot.innerHTML = `<p>Wine not found or error fetching details.</p>`;
      }
    } catch (error) {
      console.error("Error fetching wine details:", error);
      this.shadowRoot.innerHTML = `<p>Error fetching wine details.</p>`;
    }
  }
}

customElements.define("wine-details-page", WineDetailsPage);
