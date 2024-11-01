import '../components/SignUpForm.js';

class SignupPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const userCookie = this.getCookie('user');

        if (userCookie) {
            // Decode the cookie data
            let userData;
            try {
                userData = JSON.parse(decodeURIComponent(userCookie));
            } catch (e) {
                console.error('Error parsing user cookie:', e);
                userData = null; // Set userData to null if there's a parsing error
            }

            // Render different HTML if the user cookie exists and is valid
            if (userData && userData.name) {
                this.shadowRoot.innerHTML = `
                    <h2>Welcome Back, ${userData.name}!</h2>
                    <p>You are already logged in. <a href="#account">Go to your account</a>.</p>
                    <button id="logout-button">Logout</button>
                `;
                this.shadowRoot
                    .getElementById('logout-button')
                    .addEventListener('click', () => this.logout());
            } else {
                this.renderSignupForm(); // Render the sign-up form if userData is not valid
            }
        } else {
            this.renderSignupForm(); // Render the sign-up form if there is no user cookie
        }
    }

    renderSignupForm() {
        // Render the sign-up form if there is no user cookie
        this.shadowRoot.innerHTML = `
            <h2>Log In / Sign Up</h2>
            <signup-form></signup-form>
        `;
    }

    logout() {
        // Delete the user cookie
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        this.render(); // Re-render the page to show the sign-up form
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Return null if the cookie does not exist
    }
}

customElements.define('signup-page', SignupPage);
