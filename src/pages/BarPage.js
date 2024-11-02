import "../components/WineBanner.js";
import "../components/MenuItemCard.js"; // Ensure you have imported the MenuItemCard component
import { MenuItemCard } from "../components/MenuItemCard.js";

class BarPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 0;
                    color: #333;
                    background-color: #1e1e1e;
                }

                .page-content {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding: 0;
                }
                    
                .menu-list {
                    display: flex;
                    flex-direction: column;
                    align-items: center; /* Center the rows within the menu list */
                    width: 100%;
                }
                .page-content h1 {
                    align-self: center; /* Centers only the h1 element */
                    font-family: 'Italiana', serif;
                    font-size: 3rem;
                    font-weight: normal;
                    margin-bottom: 10px;
                    color:white;
                    text-decoration: underline;
                    text-decoration-color: white;
                    text-decoration-thickness: 2px;
                    border-radius: 10px;
                }
                h2 {
                    cursor: pointer; /* Make category headings clickable */
                    color: #fff;
                    background-color: #333;
                    padding: 10px;
                    width: 100%;
                    text-align: center;
                    margin: 0;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }

                h2:hover {
                    background-color: #444;
                }

                .menu-row {
                    display: none; /* Hide menu items by default */
                    flex-wrap: wrap;
                    gap: 16px;
                }

                .menu-row.expanded {
                    display: flex; /* Show menu items when expanded */
                }
            </style>
  
            <div class="page-content">
                <wine-banner></wine-banner>
                <h1>Menu Items</h1>
                <div class="menu-list"></div>
            </div>
        `;
  }

  connectedCallback() {
    this.fetchFoodItems();
    this.fetchDrinkItems();
    this.fetchWineItems();
    this.fetchAlcoholItems();
  }

  async fetchFoodItems() {
    try {
      const response = await fetch("./src/services/fetch_food.php");
      const foodItems = await response.json();
      console.log("Fetched Food Items:", foodItems);
      this.renderMenuItems(foodItems, "Food");
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  }

  async fetchDrinkItems() {
    try {
      const response = await fetch("./src/services/fetch_drinks.php");
      const drinkItems = await response.json();
      console.log("Fetched Drink Items:", drinkItems);
      this.renderMenuItems(drinkItems, "Drinks");
    } catch (error) {
      console.error("Error fetching drink items:", error);
    }
  }

  async fetchWineItems() {
    try {
      const response = await fetch("./src/services/fetch_wine_drop.php");
      const wineItems = await response.json();
      console.log("Fetched Wine Items:", wineItems);
      this.renderMenuItems(wineItems, "Wine");
    } catch (error) {
      console.error("Error fetching wine items:", error);
    }
  }

  async fetchAlcoholItems() {
    try {
      const response = await fetch("./src/services/fetch_alcohol.php");
      const alcoholItems = await response.json();
      console.log("Fetched Alcohol Items:", alcoholItems);
      this.renderMenuItems(alcoholItems, "Alcohol");
    } catch (error) {
      console.error("Error fetching alcohol items:", error);
    }
  }

  renderMenuItems(menuItems, category) {
    const menuList = this.shadowRoot.querySelector(".menu-list");
    menuList.innerHTML = ""; // Clear previous content

    let row;
    menuItems.forEach((item, index) => {
      // Create a new row every 5 items
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("menu-row");
        menuList.appendChild(row);
      }

      // Create a MenuItemCard element for each item
      const menuItemCard = document.createElement("menu-item-card");

      // Set attributes individually after element creation
      menuItemCard.name = item.name;
      menuItemCard.price = item.price;
      menuItemCard.imageUrl = `http://localhost/GenesisCinemas/src/assets/images/${item.image_url}`;
      menuItemCard.id = item.id;

      // Conditional handling for description attribute
      if (category !== "Alcohol") {
        menuItemCard.description = item.description;
      }

      row.appendChild(menuItemCard);
    });

    // Add click event to toggle visibility
    const categoryHeading = document.createElement("h2");
    categoryHeading.textContent = category;
    menuList.appendChild(categoryHeading);
    categoryHeading.addEventListener("click", () => {
      row.classList.toggle("expanded");
      row.style.display = row.classList.contains("expanded") ? "flex" : "none";
    });
  }
}

customElements.define("bar-page", BarPage);
