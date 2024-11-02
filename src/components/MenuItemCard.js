class MenuItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["name", "description", "price", "imageUrl"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const name = this.getAttribute("name");
    const description = this.getAttribute("description");
    const price = this.getAttribute("price");
    const imageUrl = this.getAttribute("image");

    this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                    text-align: center;
                    border-radius: 5px;
                }
                img {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                }
            </style>
            <div class="card">
    <img src="${imageUrl}" alt="${name}">
    <h3>${name}</h3>
    <p>${description}</p>
    <p>${price}</p>
</div>
        `;
  }
}

customElements.define("menu-item-card", MenuItemCard);
