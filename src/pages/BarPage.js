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
    this.fetchMenuItems();
  }

  async fetchMenuItems() {
    try {
      const foodResponse = await fetch("./src/services/fetch_food.php");
      const drinkResponse = await fetch("./src/services/fetch_drinks.php");
      const wineResponse = await fetch("./src/services/fetch_wine_drop.php");
      const alcoholResponse = await fetch("./src/services/fetch_alcohol.php");

      const foodItems = await foodResponse.json();
      const drinkItems = await drinkResponse.json();
      const wineItems = await wineResponse.json();
      const alcoholItems = await alcoholResponse.json();

      console.log("Fetched Food Items:", foodItems);
      console.log("Fetched Drink Items:", drinkItems);
      console.log("Fetched Wine Items:", wineItems);
      console.log("Fetched Alcohol Items:", alcoholItems);

      this.renderMenuItems(foodItems, "Food");
      this.renderMenuItems(drinkItems, "Drinks");
      this.renderMenuItems(wineItems, "Wine");
      this.renderMenuItems(alcoholItems, "Alcohol");
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
    let row = document.createElement("div");
    row.classList.add("menu-row");
    menuList.appendChild(row);

    menuItems.forEach((item) => {
      // Create a MenuItemCard element for each menu item
      const menuItemCard = document.createElement("menu-item-card");
      menuItemCard.setAttribute("name", item.name);
      menuItemCard.setAttribute("price", item.price);
      menuItemCard.setAttribute(
        "image-url",
        `http://localhost/GenesisCinemas/src/assets/images/${item.image_url}`
      );
      menuItemCard.setAttribute("id", item.id);

      // Conditional handling for description attribute
      if (category !== "Alcohol") {
        menuItemCard.setAttribute("description", item.description);
      }

      row.appendChild(menuItemCard);
    });

    // Add click event to toggle visibility
    categoryHeading.addEventListener("click", () => {
      const isExpanded = row.classList.toggle("expanded");
      row.style.display = isExpanded ? "flex" : "none";
    });
  }
}

customElements.define("bar-page", BarPage);
