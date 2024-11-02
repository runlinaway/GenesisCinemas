class MenuItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const container = document.createElement("div");

    const img = document.createElement("img");
    img.src = this.getAttribute("image-url");
    img.alt = this.getAttribute("name");
    img.style.width = "100%"; // Adjust as needed

    const name = document.createElement("h3");
    name.textContent = this.getAttribute("name");

    const price = document.createElement("p");
    price.textContent = `$${this.getAttribute("price")}`;

    container.appendChild(img);
    container.appendChild(name);
    container.appendChild(price);

    this.shadowRoot.appendChild(container);
  }
}

customElements.define("menu-item-card", MenuItemCard);
