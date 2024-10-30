class HomePage extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          /* Basic page styling */
          :host {
            display: block;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f5f5f5;
          }
  
          h2 {
            color: #333;
            font-size: 2rem;
            margin: 0 0 10px;
          }
  
          p {
            color: #555;
            font-size: 1rem;
            line-height: 1.5;
          }
  
          /* Optional button styles */
          .cta-button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #1e1e1e;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
          }
  
          .cta-button:hover {
            background-color: #333;
          }
        </style>
  
        <div class="page-content">
          <h2>Page Title</h2>
          <p>This is a stand-in template for a page. Add your content here.</p>
          <a href="#" class="cta-button">Learn More</a>
        </div>
      `;
    }
  }
  
  customElements.define('home-page', HomePage);
  