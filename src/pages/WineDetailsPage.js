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
