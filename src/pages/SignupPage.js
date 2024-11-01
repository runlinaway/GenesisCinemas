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
            <style>
                .container {
                    background-color: #1e1e1e; /* Set the background color */
                    color: white; /* Set the text color for better readability */
                    margin: 0; /* Reset margin */
                    padding: 1rem; /* Optional: Set padding for the container */
                    height: 100vh; /* Optional: Full height for the background */
                    display: flex; /* Optional: Center content */
                    flex-direction: column; /* Optional: Vertical alignment */
                }

                h2 {
                    font-family: 'Italiana', serif; /* Ensure you have the font imported */
                    font-size: 2.5rem;
                    padding: 1rem; /* Adjust padding as needed */
                    margin: 0;
                }
            </style>
            <div class="container">
                <h2>Log In / Sign Up</h2>
                <signup-form></signup-form>
            </div>
        `;
    }

    async logout() {
        try {
            const response = await fetch('./src/services/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const result = await response.json();
            if (result.success) {
                // If logout was successful, clear the user cookie
                document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
                this.render(); // Re-render the page to show the sign-up form
            } else {
                console.error('Logout failed:', result.message); // Handle logout failure
            }
        } catch (error) {
            console.error('Error during logout:', error); // Handle any network errors
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Return null if the cookie does not exist
    }
}

customElements.define('signup-page', SignupPage);
