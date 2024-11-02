class ItemDetailsPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const hash = window.location.hash.split("/"); // Split hash to get name and category
    const itemName = decodeURIComponent(hash[1]); // Get item name from the second segment
    const itemCategory = hash[2] ? decodeURIComponent(hash[2]) : ""; // Get item category from the third segment

    console.log("Item Name:", itemName); // Log item name
    console.log("Item Category:", itemCategory); // Log item category

    // Call the method to fetch item details using the item name and category
    this.fetchItemDetails(itemName, itemCategory);
  }

  async fetchItemDetails(name, category) {
    try {
      // Define a mapping of categories to their respective PHP scripts
      const itemToScriptMapping = {
        wine: "fetch_wine_drop.php",
        food: "fetch_food.php",
        drinks: "fetch_drinks.php",
        alcohol: "fetch_alcohol.php",
      };

      // Check if the category provided is valid
      const scriptName = itemToScriptMapping[category.toLowerCase()];
      if (!scriptName) {
        throw new Error("Unknown category based on item name.");
      }

      const response = await fetch(
        `./src/services/${scriptName}?name=${encodeURIComponent(name)}`
      );

      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const item = await response.json();
      console.log("Parsed Item Data:", item); // Log the item data

      // Find the specific item that matches the name
      item = items.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      );

      if (item && !item.error) {
        // Prepare content based on the category
        this.renderItemDetails(item, category);
      } else {
        this.shadowRoot.innerHTML = `<p>Item not found or error fetching details.</p>`;
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
      this.shadowRoot.innerHTML = `<p>Error fetching item details: ${error.message}</p>`;
    }
  }

  renderItemDetails(item, category) {
    let extraDetail = ""; // Extra detail based on category
    let extraDetail2 = ""; // Additional detail if needed
    let imageUrl = item.image_url;
    let price = item.price;
    let description = item.description || "No description available."; // Ensure description is defined

    // Customize extra detail based on category
    if (category === "wine") {
      extraDetail = `<div><strong>Year:</strong> ${item.vintage}</div>`;
      extraDetail2 = `<div><strong>Region:</strong> ${item.region}</div>`;
    } else if (category !== "alcohol") {
      extraDetail = `<div><strong>Description:</strong> ${item.description}</div>`;
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
  }
}

customElements.define("item-details-page", ItemDetailsPage);
