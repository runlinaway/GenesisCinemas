class StaticBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("id", "wrapper");
    this.shadowRoot.appendChild(this.wrapper);
    this.bannerContainer = document.createElement("div");
    this.bannerContainer.setAttribute("id", "banner-container");
    this.wrapper.appendChild(this.bannerContainer);
  }

  connectedCallback() {
    this.createBanner();
  }

  createBanner() {
    const staticImages = [
      {
        name: "Placeholder Banner",
        bannerUrl: "Cinema.jpg",
        overlayText: "Welcome to Our Cinema",
      },
    ];

    staticImages.forEach((image) => {
      const bannerItem = document.createElement("div");
      bannerItem.className = "banner-item";

      const link = document.createElement("a");
      link.href = "#";

      const bannerImage = document.createElement("img");
      bannerImage.src = `./src/assets/images/${image.bannerUrl}`;
      bannerImage.className = "banner-image";
      link.appendChild(bannerImage);

      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.innerText = image.overlayText;

      bannerItem.appendChild(overlay);
      bannerItem.appendChild(link);
      this.bannerContainer.appendChild(bannerItem);
    });

    const style = document.createElement("style");
    style.textContent = `
      #wrapper {
        position: relative;
      }

      #banner-container {
        display: flex;
      }

      .banner-item {
        position: relative;
        margin-right: 10px;
      }

      .banner-image {
        width: 100%;
      }

      .overlay {
        position: absolute;
        top: 10%;
        left: 10%;
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 1.5rem;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("static-banner", StaticBanner);
