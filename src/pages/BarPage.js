import "../components/WineBanner.js";
import "../components/MenuItemCard.js"; // Ensure you have imported the MenuItemCard component
import "../components/FoodCard.js";
import "../components/DrinksCard.js";
import { MenuItemCard } from "../components/MenuItemCard.js";
import { FoodCard } from "../components/FoodCard.js";
import { DrinksCard } from "../components/DrinksCard.js";

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
                    
                .food-list {
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
                .food-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
            </style>
  
            <div class="page-content">
                <wine-banner></wine-banner>
                <h1>Food List</h1>
                <div class="food-list"></div>
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
      this.renderFoodItems(foodItems);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  }

  renderFoodItems(foodItems) {
    const foodList = this.shadowRoot.querySelector(".food-list");
    foodList.innterHTML = "";

    let row;
    foodItems.forEach((food, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("food-row");
        foodList.appendChild(row);
      }

      const foodCard = new FoodCard(
        food.name,
        food.image_url,
        food.description,
        food.price
      );

      row.appendChild(foodCard);
    });
  }

  async fetchDrinkItems() {
    try {
      const response = await fetch("./src/services/fetch_drinks.php");
      const drinkItems = await response.json();
      console.log("Fetched Drink Items:", drinkItems);
      this.renderDrinkItems(drinkItems);
    } catch (error) {
      console.error("Error fetching drink items:", error);
    }
  }

  renderDrinkItems(drinkItems) {
    const drinkList = this.shadowRoot.querySelector(".drink-list");
    drinkList.innterHTML = "";

    let row;
    drinkItems.forEach((drink, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("food-row");
        drinkList.appendChild(row);
      }

      const drinkCard = new DrinksCard(
        drink.name,
        drink.image_url,
        drink.description,
        drink.price
      );

      row.appendChild(drinkCard);
    });
  }

  // async fetchWineItems() {
  //   try {
  //     const response = await fetch("./src/services/fetch_wine_drop.php");
  //     const wineItems = await response.json();
  //     console.log("Fetched Wine Items:", wineItems);
  //     this.renderWineItems(wineItems);
  //   } catch (error) {
  //     console.error("Error fetching wine items:", error);
  //   }
  // }

  // async fetchAlcoholItems() {
  //   try {
  //     const response = await fetch("./src/services/fetch_alcohol.php");
  //     const alcoholItems = await response.json();
  //     console.log("Fetched Alcohol Items:", alcoholItems);
  //     this.renderAlcoholItems(alcoholItems);
  //   } catch (error) {
  //     console.error("Error fetching alcohol items:", error);
  //   }
  // }

  // renderWineItems(wineItems) {
  //   const menuList = this.shadowRoot.querySelector(".menu-list");

  //   // Create a heading for the category
  //   const categoryHeading = document.createElement("h2");
  //   categoryHeading.textContent = "Wine";
  //   menuList.appendChild(categoryHeading);

  //   // Create a container for menu items
  //   const row = document.createElement("div");
  //   row.classList.add("menu-row");
  //   menuList.appendChild(row);

  //   wineItems.forEach((item) => {
  //     const menuItemCard = document.createElement("menu-item-card");
  //     menuItemCard.setAttribute("name", item.name);
  //     menuItemCard.setAttribute("price", item.price);
  //     menuItemCard.setAttribute(
  //       "image-url",
  //       `http://localhost/GenesisCinemas/src/assets/images/${item.image_url}`
  //     );
  //     menuItemCard.setAttribute("description", item.description);
  //     row.appendChild(menuItemCard);
  //   });

  //   categoryHeading.addEventListener("click", () => {
  //     row.classList.toggle("expanded");
  //     row.style.display = row.classList.contains("expanded") ? "flex" : "none";
  //   });
  // }

  // renderAlcoholItems(alcoholItems) {
  //   const menuList = this.shadowRoot.querySelector(".menu-list");

  //   // Create a heading for the category
  //   const categoryHeading = document.createElement("h2");
  //   categoryHeading.textContent = "Alcohol";
  //   menuList.appendChild(categoryHeading);

  //   // Create a container for menu items
  //   const row = document.createElement("div");
  //   row.classList.add("menu-row");
  //   menuList.appendChild(row);

  //   alcoholItems.forEach((item) => {
  //     const menuItemCard = document.createElement("menu-item-card");
  //     menuItemCard.setAttribute("name", item.name);
  //     menuItemCard.setAttribute("price", item.price);
  //     menuItemCard.setAttribute(
  //       "image-url",
  //       `http://localhost/GenesisCinemas/src/assets/images/${item.image_url}`
  //     );
  //     row.appendChild(menuItemCard);
  //   });

  //   categoryHeading.addEventListener("click", () => {
  //     row.classList.toggle("expanded");
  //     row.style.display = row.classList.contains("expanded") ? "flex" : "none";
  //   });
}

customElements.define("bar-page", BarPage);
