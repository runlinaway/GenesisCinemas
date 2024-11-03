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

      const items = await response.json();
      console.log("Parsed Item Data:", items); // Log the item data

      // Find the specific item that matches the name
      const item = items.find(
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
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .content-wrapper {
                    display: flex;
                    gap: 3rem;
                    align-items: flex-start;
                }

                .image-container {
                    flex: 0 0 40%;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }

                .item-image {
                    width: 100%;
                    height: auto;
                    display: block;
                    transition: transform 0.3s ease;
                }

                .item-image:hover {
                    transform: scale(1.05);
                }

                .text-container {
                    flex: 1;
                }

                .description-container {
                    color: white;
                    margin-bottom: 2rem;
                }
                
                .description-container h1 {
                    font-family: 'Italiana', serif;
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: normal;
                    margin-bottom: 1rem;
                    position: relative;
                    display: inline-block;
                }
                
                .description-container h1::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: white;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s ease;
                }

                .description-container h1:hover::after {
                    transform: scaleX(1);
                }
                
                .description-container p {
                    font-family: 'Kantumury Pro Thin', serif;
                    font-size: 1.25rem;
                    line-height: 1.6;
                    opacity: 0.9;
                }

                .info-box {
                    border: 2px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 2rem;
                    background: rgba(30, 30, 30, 0.8);
                    backdrop-filter: blur(10px);
                    color: white;
                    font-family: 'Kantumury Pro Thin', serif;
                    width: 100%;
                    max-width: 400px;
                }

                .info-box div {
                    margin-bottom: 1rem;
                    font-size: 1.25rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .info-box div:last-child {
                    margin-bottom: 0;
                }

                @media (max-width: 768px) {
                    .content-wrapper {
                        flex-direction: column;
                    }

                    .image-container {
                        flex: 0 0 100%;
                    }

                    .text-container {
                        width: 100%;
                    }

                    .info-box {
                        max-width: 100%;
                    }
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
                        </div>
                        <div class="info-box">
                            <div><strong>Price:</strong> $${price}</div>
                            ${extraDetail}
                            ${extraDetail2}
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

customElements.define("item-details-page", ItemDetailsPage);
