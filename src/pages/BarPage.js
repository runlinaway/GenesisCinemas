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
                .item-list {
                  display: flex;
                  flex-direction: column;
                  align-items: center; /* Center the rows within the menu list */
                  width: 100%;
                }
                .item-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
  
            <div class="page-content">
                <wine-banner></wine-banner>
                <h1>Food List</h1>
                <div class="item-list"></div>
                <h1>Drinks List</h1>
                <div class="item-list"></div>
                <h1>Wine List</h1>
                <div class="item-list"></div>
                <h1>Alcohol List</h1>
                <div class="item-list"></div>
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
    const foodList = this.shadowRoot.querySelector(".item-list");
    foodList.innterHTML = "";

    let row;
    foodItems.forEach((food, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("item-row");
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
    const drinkList = this.shadowRoot.querySelector(".item-list");
    drinkList.innterHTML = "";

    let row;
    drinkItems.forEach((drink, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("item-row");
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
    const wineList = this.shadowRoot.querySelector(".item-list");
    wineList.innterHTML = "";

    let row;
    wineItems.forEach((wine, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("item-row");
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
    const alcoholList = this.shadowRoot.querySelector(".item-list");
    alcoholList.innterHTML = "";

    let row;
    alcoholItems.forEach((alcohol, index) => {
      if (index % 5 === 0) {
        row = document.createElement("div");
        row.classList.add("item-row");
        alcoholList.appendChild(row);
      }

      const alcoholCard = new AlcoholCard(
        alcohol.name,
        alcohol.image_url,
        alcohol.description,
        alcohol.price
      );

      row.appendChild(alcoholCard);
    });
  }

  //   categoryHeading.addEventListener("click", () => {
  //     row.classList.toggle("expanded");
  //     row.style.display = row.classList.contains("expanded") ? "flex" : "none";
  //   });
}

customElements.define("bar-page", BarPage);
