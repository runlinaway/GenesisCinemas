class WineCard extends HTMLElement {
  constructor(wineName, imageUrl, description, price) {
    super();
    this.attachShadow({ mode: "open" });
    this.wineName = wineName;
    // Constants for the wine details
    const wineImgSrc = imageUrl;
    const wineImgAlt = `${wineName} image`;
    const wineNameText = wineName;
    const wineDescText = description;
    const winePriceText = `$${price}`;
    const imgPath = "./src/assets/images/";
    // Create elements
    this.card = document.createElement("div");
    this.card.setAttribute("class", "card");

    this.image = document.createElement("img");
    this.image.setAttribute("class", "image");
    this.image.setAttribute("src", imgPath + wineImgSrc); // Set the source from the constant
    this.image.setAttribute("alt", wineImgAlt); // Set the alt text from the constant

    this.infoOverlay = document.createElement("div");
    this.infoOverlay.setAttribute("class", "info-overlay");
    this.infoOverlay.innerHTML = `
            <div class="name">${wineNameText}</div>
            <div class="description">${wineDescText}</div>
            <div class="price">${winePriceText}</div>
        `;

    // Append elements to card
    this.card.appendChild(this.image);
    this.card.appendChild(this.infoOverlay);

    this.card.addEventListener("click", () => {
      window.location.hash = `#ItemDetails/${encodeURIComponent(
        this.wineName
      )}/wine`;
    });

    this.shadowRoot.append(this.card);

    this.styleCard(); // Call styleCard without parameters
  }

  styleCard() {
    const style = document.createElement("style");
    style.textContent = `
            .card {
                position: relative;
                display: inline-block;
                width: 200px;
                height: 300px;
                cursor: pointer;
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
                transition: transform 0.2s;
            }

            .card:hover {
                transform: scale(1.05);
            }

            .image {
                width: 100%;
                height: 100%;
                object-fit: cover; /* Ensures the image fills the container while preserving aspect ratio */
                border-radius: 8px; /* Maintain rounded edges for the image */
            }

            .name, .description, .price {
                padding: 10px;
                text-align: center;
            }
            
            .info-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                opacity: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center; /* Center the text within each div */
                transition: opacity 0.3s;
                border-radius: 8px; /* Maintain rounded edges for the overlay */
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 1.5rem;
            }

            .description {
                font-size: 1rem;
                padding: 5px;
            }

            .price {
                font-size: 1rem;
            }

            .card:hover .info-overlay {
                opacity: 1;
            }
        `;
    this.shadowRoot.append(style);
  }
}

// Ensure the custom element is only defined once
if (!customElements.get("wine-card")) {
  customElements.define("wine-card", WineCard);
}

export { WineCard };
