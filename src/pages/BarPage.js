import "../components/WineBanner.js"; // Importing Wine Selection Banner Component
import "../components/MenuItemCard.js"; // Importing Menu Item Card Component

class BarPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          /* Basic page styling */
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f5f5f5;
          }

          h2 {
            color: #333;
            font-size: 2rem;
            margin: 0 0 10px;
            cursor: pointer; /* Make headings clickable */
          }

          p {
            color: #555;
            font-size: 1rem;
            line-height: 1.5;
          }

          .menu-row {
            display: none; /* Hide menu items by default */
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .menu-row.expanded {
            display: flex; /* Show menu items when expanded */
          }

          .menu-item {
            flex: 1 1 calc(25% - 20px); /* 4 items in a row with margin */
            margin: 10px;
            max-width: 200px; /* Set max width to prevent overflow */
          }
        </style>

        <div class="page-content">
          <wine-banner></wine-banner>
          <div class="menu-list"></div>
        </div>
      `;
  }

  connectedCallback() {
    this.fetchMenuItems();
  }

  async fetchMenuItems() {
    try {
      // Fetching menu items from different categories
      const foodResponse = await fetch("./src/services/fetch_food.php");
      const drinkResponse = await fetch("./src/services/fetch_drinks.php");
      const wineResponse = await fetch("./src/services/fetch_wine.php");
      const alcoholResponse = await fetch("./src/services/fetch_alcohol.php");

      const foodItems = await foodResponse.json();
      const drinkItems = await drinkResponse.json();
      const wineItems = await wineResponse.json();
      const alcoholItems = await alcoholResponse.json();

      // Render menu items for each category
      this.renderMenuItems(foodItems, "Food");
      this.renderMenuItems(drinkItems, "Drinks");
      this.renderMenuItems(alcoholItems, "Alcohol");
      this.renderMenuItems(wineItems, "Wine");
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  }

  renderMenuItems(menuItems, category) {
    const menuList = this.shadowRoot.querySelector(".menu-list");

    // Create a heading for each category
    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = category;
    menuList.appendChild(categoryHeading);

    // Create a container for menu items
    const row = document.createElement("div");
    row.classList.add("menu-row");
    menuList.appendChild(row);

    // Shuffle items and show only the first 4 items for each category
    const shuffledItems = this.shuffleArray(menuItems);
    const itemsToShow = shuffledItems.slice(0, 4);

    itemsToShow.forEach((item) => {
      const menuItemCard = document.createElement("menu-item-card");
      menuItemCard.classList.add("menu-item");
      menuItemCard.setAttribute("name", item.name);
      menuItemCard.setAttribute("description", item.description);
      menuItemCard.setAttribute("price", item.price);
      menuItemCard.setAttribute("image-url", item.image_url);

      // Set additional attributes if applicable
      if (category === "Wine") {
        menuItemCard.setAttribute("vintage", item.vintage || "N/A");
        menuItemCard.setAttribute("region", item.region || "N/A");
      } else if (category === "Alcohol") {
        menuItemCard.setAttribute("description", item.type || "N/A");
      }

      row.appendChild(menuItemCard);
    });

    // Add click event to toggle visibility
    categoryHeading.addEventListener("click", () => {
      row.classList.toggle("expanded");
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }
}

customElements.define("bar-page", BarPage);
