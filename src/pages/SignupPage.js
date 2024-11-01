import '../components/SignUpForm.js';

class SignupPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
          <h2>Log In / Sign Up</h2>

            <signup-form></signup-form>
        `;
    }
}

customElements.define('signup-page', SignupPage);

