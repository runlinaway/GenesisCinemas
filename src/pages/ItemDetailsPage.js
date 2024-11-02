class ItemDetailsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const itemName = decodeURIComponent(this.getAttribute("item-name"));
    const itemCategory = decodeURIComponent(this.getAttribute("item-category"));
    this.fetchItemDetails(itemName, itemCategory);
  }

  async fetchItemDetails(name, category) {
    try {
      // Determine the correct PHP script based on the category
      let scriptName;

      // Map categories to their respective PHP scripts
      switch (category) {
        case "wine":
          scriptName = "fetch_wine_drop.php"; // Use fetch_wine_drop.php for the wine category
          break;
        case "alcohol":
          scriptName = "fetch_alcohol.php"; // Use fetch_alcohol.php for the alcohol category
          break;
        case "drinks":
          scriptName = "fetch_drinks.php"; // Use fetch_drinks.php for the drinks category
          break;
        case "food":
          scriptName = "fetch_food.php"; // Use fetch_food.php for the food category
          break;
        default:
          throw new Error("Unknown category"); // Handle unknown categories gracefully
      }

      const response = await fetch(
        `./src/services/${scriptName}?name=${encodeURIComponent(name)}`
      );
      const item = await response.json();

      console.log("Parsed Item Data:", item); // Log the item data
      if (item && !item.error) {
        // Prepare content based on the category
        let imageUrl = item.image_url;
        let price = item.price;
        let extraDetail = ""; // Extra detail, such as vintage for wine or other info for food
        let extraDetail2 = ""; // Extra detail, such as vintage for wine or other info for food

        // Customize extra detail based on category
        if (category === "wine") {
          extraDetail = `<div><strong>Year:</strong> ${item.vintage}</div>`;
          extraDetail2 = `<div><strong>Region:</strong> ${item.region}</div>`;
        } else if (category !== "alcohol") {
          // Changed the condition to "not equal to alcohol"
          // Example: Add generic details for items that are not alcohol
          extraDetail = `<div><strong>Description:</strong> ${
            item.description || "N/A"
          } </div>`;
        }

        this.shadowRoot.innerHTML = `
        <style>
          .container {
              display: flex;
              flex-direction: column;
              width: 100%;
          }

          .content-wrapper {
              display: flex;
              align-items: flex-start;
              margin-top: 20px;
          }

          .image-container {
              width: 30%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
          }

          .item-image {
              width: 100%;
              max-width: 200px;
              height: auto;
          }

          .text-container {
              width: 70%;
              padding-left: 20px;
          }

          .description-container {
              color: white;
              font-family: 'Kantumury Pro Thin', serif;
              margin-bottom: 20px;
          }
          
          .description-container h1 {
              font-family: 'Italiana', serif;
              font-size: 3rem;
              font-weight: normal;
              margin-bottom: 10px;
              text-decoration: underline;
              text-decoration-color: white;
              text-decoration-thickness: 2px;
              border-radius: 10px;
          }
          
          .description-container p {
              font-family: 'Kantumury Pro Thin', serif;
              font-size: 1.5rem;
              margin: 0;
          }

          .info-box {
              border: 2px solid white;
              border-radius: 10px;
              padding: 20px;
              background: #1e1e1e;
              color: white;
              font-family: 'Kantumury Pro Thin', serif;
              width: 300px;
          }

          .info-box div {
              margin-bottom: 10px;
              font-size: 1.5rem;
          }
      </style>

              <div class="container">
                  <div class="content-wrapper">
                      <div class="image-container">
                          <img class="item-image" src="./src/assets/images/${imageUrl}" alt="${item.name}">
                      </div>
                      <div class="text-container">
                          <div class="description-container">
                              <h1>${item.name}</h1>
                              <p>${description}</p>
                          </div>
                          <div class="info-box">
                              <div><strong>Price:</strong> $${price}</div>
                              ${extraDetail}
                          </div>
                      </div>
                  </div>
              </div>
            `;
      } else {
        this.shadowRoot.innerHTML = `<p>Item not found or error fetching details.</p>`;
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
      this.shadowRoot.innerHTML = `<p>Error fetching item details.</p>`;
    }
  }
}

customElements.define("item-details-page", ItemDetailsPage);
