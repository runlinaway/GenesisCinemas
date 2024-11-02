class WineBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }); // Create a Shadow DOM
    this.wrapper = document.createElement("div");
    this.wrapper.setAttribute("id", "wrapper");
    this.shadowRoot.appendChild(this.wrapper);
    this.wines = [];
    this.currentIndex = 0;
    this.bannerContainer = document.createElement("div"); // Create the banner container
    this.bannerContainer.setAttribute("id", "banner-container");
    this.wrapper.appendChild(this.bannerContainer); // Append to Shadow DOM
    this.intervalId = null; // To store the interval ID
  }

  // Function to fetch wine data from the server
  async fetchWineData() {
    try {
      const response = await fetch("./src/services/fetch_featured_wine.php"); // Adjusted endpoint for wine data
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      this.wines = await response.json();
      this.createBanner();
    } catch (error) {
      console.error("Error fetching wine data:", error);
    }
  }

  // Function to create and display the banner
  createBanner() {
    this.bannerContainer.style.width = `${this.wines.length * 100}%`; // Set container width based on the number of items

    this.wines.forEach((wine) => {
      // Create the main banner item container
      const bannerItem = document.createElement("div");
      bannerItem.className = "banner-item";

      // Create an anchor element for navigation (if applicable)
      const link = document.createElement("a");
      link.href = `#WineDetails/${encodeURIComponent(wine.name)}`; // Use the wine name for the link
      link.style.textDecoration = "none"; // Remove underline for link text

      const bannerImage = document.createElement("img");
      bannerImage.src = `./src/assets/images/${wine.image_url}`; // Adjusted for wine image
      bannerImage.className = "banner-image"; // Add a class for styling
      link.appendChild(bannerImage); // Append image to link

      // Create wine info box
      const wineInfo = document.createElement("div");
      wineInfo.className = "wine-info";
      wineInfo.innerHTML = `
                <strong class="wine-title">${wine.name}</strong>
                <p class="wine-description">${wine.description}</p>
            `;
      link.appendChild(wineInfo); // Append wine info to link

      // Add mouse enter and leave event listeners to pause/resume auto-scroll
      wineInfo.addEventListener("mouseenter", () =>
        clearInterval(this.intervalId)
      ); // Pause auto-scroll
      wineInfo.addEventListener("mouseleave", () => this.startAutoScroll()); // Resume auto-scroll

      bannerItem.appendChild(link); // Append link (with image and info) to bannerItem
      this.bannerContainer.appendChild(bannerItem); // Append bannerItem to bannerContainer
    });

    this.createNavigationButtons(); // Create navigation buttons
    this.startAutoScroll(); // Start auto-scrolling
  }

  // Function to create navigation buttons
  createNavigationButtons() {
    const leftButton = document.createElement("button");
    leftButton.className = "nav-button left";

    const leftIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    leftIcon.setAttribute("width", "24");
    leftIcon.setAttribute("height", "24");
    leftIcon.setAttribute("viewBox", "0 0 24 24");
    leftIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const polyline = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("points", "15.5 5 8.5 12 15.5 19");
    polyline.setAttribute("stroke", "currentColor");
    polyline.setAttribute("stroke-linecap", "round");
    polyline.setAttribute("stroke-linejoin", "round");
    polyline.setAttribute("stroke-width", "2");

    leftIcon.appendChild(polyline);
    leftButton.appendChild(leftIcon);
    leftButton.addEventListener("click", () => this.scrollLeft());

    const rightButton = document.createElement("button");
    rightButton.className = "nav-button right";

    const rightIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    rightIcon.setAttribute("width", "24");
    rightIcon.setAttribute("height", "24");
    rightIcon.setAttribute("viewBox", "0 0 24 24");
    rightIcon.setAttribute("aria-label", "Right Navigation");

    const rightPolyline = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    rightPolyline.setAttribute("fill", "none");
    rightPolyline.setAttribute("points", "8.5 5 15.5 12 8.5 19");
    rightPolyline.setAttribute("stroke", "currentColor");
    rightPolyline.setAttribute("stroke-linecap", "round");
    rightPolyline.setAttribute("stroke-linejoin", "round");
    rightPolyline.setAttribute("stroke-width", "2");

    rightIcon.appendChild(rightPolyline);
    rightButton.appendChild(rightIcon);
    rightButton.addEventListener("click", () => this.scrollRight());

    this.wrapper.appendChild(leftButton);
    this.wrapper.appendChild(rightButton);
  }

  // Function to start auto-scrolling through the banner items
  startAutoScroll() {
    this.intervalId = setInterval(() => {
      this.scrollRight();
    }, 5000); // Change every 5 seconds
  }

  // Function to scroll to the right
  scrollRight() {
    this.currentIndex = (this.currentIndex + 1) % this.wines.length; // Cycle through wines
    this.updateBannerPosition();
    this.resetAutoScroll();
  }

  // Function to scroll to the left
  scrollLeft() {
    this.currentIndex =
      (this.currentIndex - 1 + this.wines.length) % this.wines.length; // Cycle backwards
    this.updateBannerPosition();
    this.resetAutoScroll();
  }

  // Function to update the banner position
  updateBannerPosition() {
    const bannerItemWidth = 100 / this.wines.length; // Calculate width percentage of each banner item
    const offset = this.currentIndex * -bannerItemWidth; // Calculate the offset for scrolling
    this.bannerContainer.style.transform = `translateX(${offset}%)`; // Move banner to the left
  }

  // Function to reset the auto-scroll timer
  resetAutoScroll() {
    clearInterval(this.intervalId); // Clear existing interval
    this.startAutoScroll(); // Restart auto-scroll
  }

  // Called when the element is connected to the DOM
  connectedCallback() {
    this.fetchWineData(); // Fetch wine data when the element is added to the DOM
    this.attachStyles(); // Attach styles for the component
  }

  // Function to attach styles for the component
  attachStyles() {
    const style = document.createElement("style");
    style.textContent = `
            #wrapper {
                display: block;
                height: 600px;
                position: relative;
                overflow: hidden;
            }

            #banner-container {
                position: relative;
                display: flex;
                height: 600px;
                width: 100%;
                overflow: hidden;
                transition: transform 0.5s ease;
                margin: 0;
                padding: 0;
            }

            .banner-item {
                position: relative;
                flex: 1 0 auto;
                width: 100vw;
                height: 100%;
                overflow: hidden;
                margin: 0;
                padding: 0;
            }

            .banner-image {
                width: 100vw;
                height: 100%;
                object-fit: cover;
                object-position: top;
            }

            .wine-info {
                position: absolute;
                bottom: 0px;
                right: 300px;
                min-width: 355px;
                max-width: calc(100% - 20px);
                min-height: 300px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                transition: transform 0.3s ease;
                transform: translateY(72%);
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }

            .wine-title {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 50px;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 10px;
                padding-right: 10px;
                padding-bottom: 10px;
            }

            .wine-description {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 20px;
                white-space: normal;
                margin-top: 5px;
                flex-grow: 1;
                max-width: 400px;
                min-height: 160px;
                padding-left: 10px;
                padding-right: 10px;
            }

            .nav-button {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(255, 255, 255, 0.7);
                border: none;
                cursor: pointer;
                padding: 10px;
                z-index: 1;
                border-radius: 50%;
            }

            .nav-button.left {
                left: 10px;
            }

            .nav-button.right {
                right: 10px;
            }

            .nav-button svg {
                fill: currentColor;
                width: 24px;
                height: 24px;
            }
        `;
    this.shadowRoot.appendChild(style); // Append styles to Shadow DOM
  }
}

// Define the custom element
customElements.define("wine-banner", WineBanner);
