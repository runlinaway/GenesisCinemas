class MenuItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
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
    // Creating main container
    const container = document.createElement("div");

    const sections = ["food", "drinks", "alcohol", "wine_selection"];

    for (const section of sections) {
      const items = await this.fetchItems(section);
      const sectionDiv = document.createElement("div");
      sectionDiv.setAttribute("class", "section");

      const title = document.createElement("h2");
      title.textContent = this.capitalizeFirstLetter(section);
      sectionDiv.appendChild(title);

      const itemContainer = document.createElement("div");
      itemContainer.setAttribute("class", "item-container");

      // Loop through items and create MenuItemCard for each
      items.slice(0, 4).forEach((item) => {
        const card = document.createElement("menu-item-card");

        // Set common attributes
        card.setAttribute("name", item.name);
        card.setAttribute("description", item.description); // Common description
        card.setAttribute("price", item.price); // Common price
        card.setAttribute("image-url", item.image_url);

        // Set category-specific attributes
        if (section === "wine_selection") {
          card.setAttribute("vintage", item.vintage); // Include vintage for wines
          card.setAttribute("region", item.region); // Include region for wines
        } else if (section === "alcohol") {
          card.setAttribute("description", item.type); // Assuming alcohol has a type instead of description
        }

        itemContainer.appendChild(card);
      });

      const moreItemsLink = document.createElement("a");
      moreItemsLink.textContent = "More Items";
      moreItemsLink.setAttribute("class", "more-items");
      moreItemsLink.href = `#${section}Items`; // Adjust to your routing system
      sectionDiv.appendChild(itemContainer);
      sectionDiv.appendChild(moreItemsLink);
      container.appendChild(sectionDiv);
    }

    this.shadowRoot.appendChild(container);
    this.stylePage(); // Call styling function
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