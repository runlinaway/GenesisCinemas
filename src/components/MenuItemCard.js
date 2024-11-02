class MenuItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render(); // Initial render call
  }

  async fetchItems(category) {
    try {
      const response = await fetch(`../services/fetch_${category}.php`); // Adjust this to point to your PHP files

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${category} items: ${error.message}`);
      return []; // Return an empty array or handle the error as needed
    }
  }

  async render() {
    // Create main container
    const container = document.createElement("div");

    // Define the categories to fetch from
    const categories = ["food", "drinks", "alcohol", "wine"];

    // Loop through each category to fetch and display items
    for (const category of categories) {
      const items = await this.fetchItems(category);
      const sectionDiv = document.createElement("div");
      sectionDiv.setAttribute("class", "section");

      const title = document.createElement("h2");
      title.textContent = this.capitalizeFirstLetter(category);
      sectionDiv.appendChild(title);

      const itemContainer = document.createElement("div");
      itemContainer.setAttribute("class", "item-container");

      // Check if items are available and loop through to create cards
      if (items.length > 0) {
        // Randomize items and show only 4
        const randomizedItems = this.getRandomItems(items, 4);

        randomizedItems.forEach((item) => {
          const card = document.createElement("menu-item-card");

          // Set common attributes
          card.setAttribute("name", item.name);
          card.setAttribute("description", item.description); // Common description
          card.setAttribute("price", item.price); // Common price
          card.setAttribute("image-url", item.image_url);

          // Set category-specific attributes
          if (category === "wine") {
            card.setAttribute("vintage", item.vintage || "N/A"); // Include vintage for wines
            card.setAttribute("region", item.region || "N/A"); // Include region for wines
          } else if (category === "alcohol") {
            card.setAttribute("description", item.type || "N/A"); // Assuming alcohol has a type instead of description
          }

          itemContainer.appendChild(card);
        });
      } else {
        // Handle case where no items are found
        const noItemsMessage = document.createElement("p");
        noItemsMessage.textContent = `No items found in ${this.capitalizeFirstLetter(
          category
        )}.`;
        itemContainer.appendChild(noItemsMessage);
      }

      const moreItemsLink = document.createElement("a");
      moreItemsLink.textContent = "More Items";
      moreItemsLink.setAttribute("class", "more-items");
      moreItemsLink.href = `#${category}Items`; // Adjust to your routing system
      sectionDiv.appendChild(itemContainer);
      sectionDiv.appendChild(moreItemsLink);
      container.appendChild(sectionDiv);
    }

    this.shadowRoot.appendChild(container);
    this.stylePage(); // Call styling function
  }

  getRandomItems(items, count) {
    // Shuffle items and return a subset of the specified count
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  stylePage() {
    const style = document.createElement("style");
    style.textContent = `
            .section {
                margin: 20px;
            }

            .item-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .more-items {
                display: block;
                text-align: center;
                margin-top: 10px;
                color: blue;
                cursor: pointer;
                text-decoration: underline;
            }
        `;
    this.shadowRoot.append(style);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ");
  }
}

// Ensure the custom element is only defined once
if (!customElements.get("menu-page")) {
  customElements.define("menu-page", MenuItemCard);
}

export { MenuItemCard };
