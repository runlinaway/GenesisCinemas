class ItemCard extends HTMLElement {
  constructor(itemName, imageUrl, description, price, category) {
    super();
    this.attachShadow({ mode: "open" });
    this.itemName = itemName;
    this.category = category;

    // Constants for the item details
    const imgPath = "./src/assets/images/";
    const itemImgSrc = imageUrl;
    const itemImgAlt = `${itemName} image`;
    const itemNameText = itemName;
    const itemDescText = description || ''; // Make description optional
    const itemPriceText = `$${price}`;

    // Create elements
    this.card = document.createElement("div");
    this.card.setAttribute("class", "card");

    this.image = document.createElement("img");
    this.image.setAttribute("class", "image");
    this.image.setAttribute("src", imgPath + itemImgSrc);
    this.image.setAttribute("alt", itemImgAlt);

    this.infoOverlay = document.createElement("div");
    this.infoOverlay.setAttribute("class", "info-overlay");
    this.infoOverlay.innerHTML = `
      <div class="name">${itemNameText}</div>
      ${description ? `<div class="description">${itemDescText}</div>` : ''}
      <div class="price">${itemPriceText}</div>
    `;

    // Append elements to card
    this.card.appendChild(this.image);
    this.card.appendChild(this.infoOverlay);

    this.shadowRoot.append(this.card);

    // Add click event listener
    this.card.addEventListener("click", () => {
      window.location.hash = `#ItemDetails/${encodeURIComponent(
        this.itemName
      )}/${this.category}`;
    });

    this.styleCard();
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
        object-fit: cover;
        border-radius: 8px;
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
        text-align: center;
        transition: opacity 0.3s;
        border-radius: 8px;
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

if (!customElements.get("item-card")) {
  customElements.define("item-card", ItemCard);
}

export { ItemCard }; 