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
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
            display: none; /* Hide menu items by default */
          }
  
          .menu-row.expanded {
            display: flex; /* Show menu items when expanded */
          }

          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #1e1e1e;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
          }
  
          .cta-button:hover {
            background-color: #333;
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
      // Adjusting the fetch calls to get food, drinks, and wine separately
      const foodResponse = await fetch("./src/services/fetch_food.php");
      const drinkResponse = await fetch("./src/services/fetch_drinks.php");
      const wineResponse = await fetch("./src/services/fetch_wine.php");
      const alcoholResponse = await fetch("./src/services/fetch_alcohol.php");

      const foodItems = await foodResponse.json();
      const drinkItems = await drinkResponse.json();
      const wineItems = await wineResponse.json();
      const alcoholItems = await alcoholResponse.json();

      console.log("Fetched Food Items:", foodItems);
      console.log("Fetched Drink Items:", drinkItems);
      console.log("Fetched Wine Items:", wineItems);
      console.log("Fetched Alcohol Items:", alcoholItems);

      // Render all items in the menu
      this.renderMenuItems(foodItems, "Food");
      this.renderMenuItems(drinkItems, "Drinks");
      this.renderMenuItems(alcoholItems, "Alcohol");
      this.renderMenuItems(wineItems, "Wine Selection");
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

    // Show only the first 4 items for each category initially
    const itemsToShow = menuItems.slice(0, 4);

    itemsToShow.forEach((item) => {
      const menuItemCard = document.createElement("menu-item-card");
      menuItemCard.setAttribute("name", item.name);
      menuItemCard.setAttribute("description", item.description);
      menuItemCard.setAttribute("price", item.price);
      menuItemCard.setAttribute("image-url", item.image_url);

      // Set additional attributes if applicable
      if (category === "Wine Selection") {
        menuItemCard.setAttribute("vintage", item.vintage);
        menuItemCard.setAttribute("region", item.region);
      } else if (category === "Alcohol") {
        menuItemCard.setAttribute("description", item.type);
      }

      row.appendChild(menuItemCard);
    });

    // Add click event to toggle visibility
    categoryHeading.addEventListener("click", () => {
      row.classList.toggle("expanded");
    });
  }
}

customElements.define("bar-page", BarPage);
