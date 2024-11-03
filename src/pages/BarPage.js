import "../components/WineBanner.js";
import "../components/FoodCard.js";
import "../components/DrinksCard.js";
import "../components/AlcoholCard.js";
import "../components/WineCard.js";
import { FoodCard } from "../components/FoodCard.js";
import { DrinksCard } from "../components/DrinksCard.js";
import { AlcoholCard } from "../components/AlcoholCard.js";
import { WineCard } from "../components/WineCard.js";

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
        .page-content h1 {
          align-self: center;
          font-family: 'Italiana', serif;
          font-size: 3rem;
          font-weight: normal;
          margin-bottom: 10px;
          color: white;
          cursor: pointer;
          position: relative;
          text-decoration: none;
        }

        .page-content h1::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: white;
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }

        .page-content h1:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .item-list {
          display: none; /* Initially hide all lists */
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .item-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
      </style>
      <div class="page-content">
        <wine-banner></wine-banner>
        <h1 class="toggle-header" data-target=".food-list">Food List</h1>
        <div class="food-list item-list"></div>
        <h1 class="toggle-header" data-target=".drink-list">Drinks List</h1>
        <div class="drink-list item-list"></div>
        <h1 class="toggle-header" data-target=".wine-list">Wine List</h1>
        <div class="wine-list item-list"></div>
        <h1 class="toggle-header" data-target=".alcohol-list">Alcohol List</h1>
        <div class="alcohol-list item-list"></div>
      </div>
    `;
  }

  connectedCallback() {
    // Add event listeners to toggle the visibility of each section
    const headers = this.shadowRoot.querySelectorAll(".toggle-header");
    headers.forEach((header) => {
      header.addEventListener("click", () => {
        const targetSelector = header.getAttribute("data-target");
        const targetElement = this.shadowRoot.querySelector(targetSelector);

        // Check if the element is hidden or visible
        if (window.getComputedStyle(targetElement).display === "none") {
          targetElement.style.display = "flex"; // Show the section
        } else {
          targetElement.style.display = "none"; // Hide the section
        }
      });
    });

    // Fetch items for each category
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
    foodList.innerHTML = "";

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
    drinkList.innerHTML = "";

    let row;
    drinkItems.forEach((drink, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("drink-row");
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

  async fetchWineItems() {
    try {
      const response = await fetch("./src/services/fetch_wine_drop.php");
      const wineItems = await response.json();
      console.log("Fetched Wine Items:", wineItems);
      this.renderWineItems(wineItems);
    } catch (error) {
      console.error("Error fetching wine items:", error);
    }
  }

  renderWineItems(wineItems) {
    const wineList = this.shadowRoot.querySelector(".wine-list");
    wineList.innerHTML = "";

    let row;
    wineItems.forEach((wine, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("wine-row");
        wineList.appendChild(row);
      }

      const wineCard = new WineCard(
        wine.name,
        wine.image_url,
        wine.description,
        wine.price
      );

      row.appendChild(wineCard);
    });
  }

  async fetchAlcoholItems() {
    try {
      const response = await fetch("./src/services/fetch_alcohol.php");
      const alcoholItems = await response.json();
      console.log("Fetched Alcohol Items:", alcoholItems);
      this.renderAlcoholItems(alcoholItems);
    } catch (error) {
      console.error("Error fetching alcohol items:", error);
    }
  }

  renderAlcoholItems(alcoholItems) {
    const alcoholList = this.shadowRoot.querySelector(".alcohol-list");
    alcoholList.innerHTML = "";

    let row;
    alcoholItems.forEach((alcohol, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("alcohol-row");
        alcoholList.appendChild(row);
      }

      const alcoholCard = new AlcoholCard(
        alcohol.name,
        alcohol.image_url,
        alcohol.price
      );

      row.appendChild(alcoholCard);
    });
  }
}

customElements.define("bar-page", BarPage);
