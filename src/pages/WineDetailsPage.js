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
              color: white;
              font-family: 'Kantumury Pro Thin', serif;
            }
            .image-container {
              width: 100%;
              overflow: hidden;
            }
            .wine-image {
              width: 100%;
              object-fit: cover;
            }
            .synopsis_container {
              padding: 20px;
            }
            .synopsis_container h1 {
              font-family: 'Italiana', serif;
              font-size: 3rem;
              text-decoration: underline;
              text-decoration-color: white;
              text-decoration-thickness: 2px;
              border-radius: 10px;
            }
            .synopsis_container p {
              font-size: 1.5rem;
            }
            .info_box {
              border: 2px solid white;
              border-radius: 10px;
              padding: 20px;
              margin-top: 20px;
              background: #1e1e1e;
              width: 100%;
            }
            .info_box div {
              margin-bottom: 10px;
              font-size: 1.5rem;
            }
          </style>
          <div class="container">
            <div class="image-container">
              <img class="wine-image" src="./src/assets/images/${wine_selection.image_url}" alt="${wine_selection.name}">
            </div>
            <div class="synopsis_container">
              <h1>${wine_selection.name}</h1>
              <p>${wine_selection.description}</p>
            </div>
            <div class="info_box">
              <div><strong>Type:</strong> ${wine_selection.type}</div>
              <div><strong>Price:</strong> $${wine_selection.price}</div>
              <div><strong>Year:</strong> ${wine_selection.year}</div>
            
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
