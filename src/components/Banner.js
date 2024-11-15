// banner.js

class Banner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.wrapper = document.createElement("div");
        this.wrapper.setAttribute("id", "wrapper");
        this.shadowRoot.appendChild(this.wrapper);
        this.items = [];
        this.currentIndex = 0;
        this.bannerContainer = document.createElement("div");
        this.bannerContainer.setAttribute("id", "banner-container");
        this.wrapper.appendChild(this.bannerContainer);
        this.intervalId = null;
        this.type = this.getAttribute('type') || 'movie'; // Default to movie if not specified
    }

    async connectedCallback() {
        await this.fetchData();
        this.attachStyles();
    }

    async fetchData() {
        try {
            const endpoint = this.type === 'wine' 
                ? "./src/services/fetch_featured_wine.php"
                : "./src/services/fetch_featured.php";

            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            this.items = await response.json();
            this.createBanner();
        } catch (error) {
            console.error(`Error fetching ${this.type} data:`, error);
        }
    }

    createBanner() {
        this.bannerContainer.style.width = `${this.items.length * 100}%`;

        this.items.forEach((item) => {
            const bannerItem = document.createElement("div");
            bannerItem.className = "banner-item";

            const link = document.createElement("a");
            link.href = `#${this.type === 'wine' ? 'WineDetails' : 'MovieDetails'}/${encodeURIComponent(item.title || item.name)}`;
            link.style.textDecoration = "none";

            const bannerImage = document.createElement("img");
            bannerImage.src = `./src/assets/images/${item.banner_url || item.image_url}`;
            bannerImage.className = "banner-image";
            link.appendChild(bannerImage);

            const infoBox = document.createElement("div");
            infoBox.className = "info-box";
            infoBox.innerHTML = `
                <strong class="title">${item.title || item.name}</strong>
                <p class="description">${item.synopsis || item.description}</p>
            `;
            link.appendChild(infoBox);

            infoBox.addEventListener("mouseenter", () => {
                infoBox.style.transform = "translateY(0)";
                clearInterval(this.intervalId);
            });
            
            infoBox.addEventListener("mouseleave", () => {
                infoBox.style.transform = "translateY(72%)";
                this.startAutoScroll();
            });

            bannerItem.appendChild(link);
            this.bannerContainer.appendChild(bannerItem);
        });

        this.createNavigationButtons();
        this.startAutoScroll();
    }

    createNavigationButtons() {
        const leftButton = document.createElement("button");
        leftButton.className = "nav-button left";
        
        const leftIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        leftIcon.setAttribute("width", "24");
        leftIcon.setAttribute("height", "24");
        leftIcon.setAttribute("viewBox", "0 0 24 24");
        
        const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
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
        
        const rightIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        rightIcon.setAttribute("width", "24");
        rightIcon.setAttribute("height", "24");
        rightIcon.setAttribute("viewBox", "0 0 24 24");
        
        const rightPolyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
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

    startAutoScroll() {
        this.intervalId = setInterval(() => this.scrollRight(), 5000);
    }

    scrollRight() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.updateBannerPosition();
        this.resetAutoScroll();
    }

    scrollLeft() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.updateBannerPosition();
        this.resetAutoScroll();
    }

    updateBannerPosition() {
        const itemWidth = 100 / this.items.length;
        const offset = this.currentIndex * -itemWidth;
        this.bannerContainer.style.transform = `translateX(${offset}%)`;
    }

    resetAutoScroll() {
        clearInterval(this.intervalId);
        this.startAutoScroll();
    }

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

            .info-box {
                position: absolute;
                bottom: 0px;
                right: 300px;
                min-width: 355px;
                max-width: calc(100% - 20px);
                min-height: 300px;
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                transition: transform 0.3s ease;
                transform: translateY(72%);
            }

            .title {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 50px;
                font-weight: normal;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 10px;
            }

            .description {
                font-family: 'Kantumury Pro Thin', serif;
                font-size: 20px;
                white-space: normal;
                margin-top: 5px;
                flex-grow: 1;
                max-width: 400px;
                min-height: 160px;
                padding: 10px;
            }

            .nav-button {
                position: absolute; /* Position buttons absolutely */
                top: 0; /* Start at the top */
                bottom: 0; /* Stretch to the bottom */
                width: 50px; /* Fixed width for buttons */
                background-color: rgba(0, 0, 0, 0.5);
                color: #b3b3b3;
                border: none;
                cursor: pointer;
                z-index: 1;
                transition: color 0.2s ease, background-color 0.2s ease;
            }

            .nav-button:hover {
                color: white;
                background-color: rgba(0, 0, 0, 0.8);
            }

            .nav-button.left {
                left: 0;
            }

            .nav-button.right {
                right: 0;
            }
        `;
        this.shadowRoot.appendChild(style);
    }
}

customElements.define("content-banner", Banner);

