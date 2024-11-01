class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create a footer element
        const footer = document.createElement('footer');
        footer.setAttribute('class', 'footer');

        // Add some content
        footer.innerHTML = `
            <p>&copy; 2024 Runlin Liu //// Wong Jia Jun All rights reserved.</p>
        `;

        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            .footer {
                font-family: 'Kantumury Pro Thin', serif;
                background-color: #1e1e1e;
                color: white;
                text-align: center;
                padding: 1rem;
                position: relative;
                bottom: 0;
                width: 100%;
            }
        `;

        // Append styles and footer to shadow DOM
        this.shadowRoot.append(style, footer);
    }
}

// Define the new element
customElements.define('app-footer', Footer);
