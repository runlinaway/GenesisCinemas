class StaticBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .static-banner {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .banner-title {
          font-family: 'Italiana', serif;
          font-size: 50px;
          font-weight: normal;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 10px 10px 10px;
        }

        .banner-text {
          font-family: 'Kantumury Pro Thin', serif;
          font-size: 20px;
          max-width: 400px;
          min-height: 160px;
          padding: 0 10px;
        }

        .banner-content {
          padding-left:20px;
        }
      </style>

      <div class="static-banner">
        <img class="banner-image" src="./src/assets/images/contact_banner.jpg" alt="Contact Us">
        <div class="banner-overlay">
          <div class="banner-content">
          <h1 class="banner-title">Contact Us</h1>
          <p class="banner-text">Genesis Theatres are available for private hire for your personal and corporate events. We have had extensive experience hosting private screenings, town hall sessions, product launches and more. If you are looking for a unique and creative space to host your event, get in touch with us now: hire@genesistheatres.sg</p>
        
          </div>
      </div>
    `;
  }
}

customElements.define("static-banner", StaticBanner);
