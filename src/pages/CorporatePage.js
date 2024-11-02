class CorporatePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
          <h2>Corporate Inquiry</h2>
          <p>Please fill out the form below for any corporate inquiries, and we'll get back to you as soon as possible.</p>
          <form id="corporate-form">
            <input type="text" id="name" name="name" placeholder="Your Name" required>
            <input type="email" id="email" name="email" placeholder="Your Email" required>
            <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      `;
  }
}

customElements.define("corporate-page", CorporatePage);
