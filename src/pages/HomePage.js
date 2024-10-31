import '../components/Banner.js';

class HomePage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 0;
            color: #333;
            background-color: #f5f5f5;
          }

        </style>
  
        <div class="page-content">
          <movie-banner></movie-banner>
        </div>
      `;
    }
  }
  
  customElements.define('home-page', HomePage);
  