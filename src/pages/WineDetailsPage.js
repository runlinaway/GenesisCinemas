class WineDetailsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const wineName = decodeURIComponent(this.getAttribute("wine-name"));
    this.fetchWineDetails(wineName);
  }

  async fetchWineDetails(name) {
    try {
      const response = await fetch(
        `./src/services/fetch_wine_selection.php?name=${encodeURIComponent(
          name
        )}`
      );
      const wine = await response.json();

      if (wine && !wine.error) {
        this.shadowRoot.innerHTML = `
                    <style>
                        .container {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                        }

                        .wine-image {
                            width: 100%;
                            object-fit: cover;
                            max-height: 600px;
                            overflow: hidden;
                        }

                        .details-container {
                            width: 422px;
                            color: white;
                            font-family: 'Kantumury Pro Thin', serif;
                            margin-top: 10px;
                            padding-left: 40px;
                        }
                        
                        .details-container h1 {
                            font-family: 'Italiana', serif;
                            font-size: 3rem;
                            margin-bottom: 10px;
                            text-decoration: underline;
                            text-decoration-color: white;
                            text-decoration-thickness: 2px;
                            border-radius: 10px;
                        }
                        
                        .details-container p {
                            font-family: 'Kantumury Pro Thin', serif;
                            font-size: 1.5rem;
                            margin: 0;
                        }

                        .info-box {
                            margin-left: 40px;
                            border: 2px solid white;
                            border-radius: 10px;
                            padding: 20px;
                            margin-top: 40px;
                            background: #1e1e1e;
                            width: 378px;
                            color: white;
                            font-family: 'Kantumury Pro Thin', serif;
                        }

                        .info-box div {
                            margin-bottom: 10px;
                            font-size: 1.5rem;
                        }
                    </style>

                    <div class="container">
                        <img class="wine-image" src="./src/assets/images/${wine.image_url}" alt="${wine.name}">

                        <div class="details-container">
                            <h1>${wine.name}</h1>
                            <p>${wine.description}</p>
                        </div>

                        <div class="info-box">
                            <div><span>Type:</span> ${wine.type}</div>
                            <div><span>Vintage:</span> ${wine.vintage}</div>
                            <div><span>Rating:</span> ${wine.rating}/5</div>
                            <div><span>Price:</span> $${wine.price}</div>
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
