import '../components/LoginForm.js'; // Ensure to import your LoginForm component

class SignupForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    background-color: #1e1e1e; /* Background color for the form */
                    display: flex; /* Flexbox for centering */
                    flex-direction: column; /* Vertical alignment */
                    align-items: center; /* Center horizontally */
                    height: 100vh; /* Full height for background */
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px; /* Space between form elements */
                    width: 300px; /* Set a fixed width for the form */
                    align-items: center; /* Center the labels and inputs */
                }
                label {
                    color: white; /* Label color */
                    font-family: 'Kantumury Pro Thin', serif;
                    font-size: 1.5rem; /* Label font size */
                    text-align: center; /* Center align text */
                    width: 100%; /* Allow label to take full width for centering */
                }
                input {
                    padding: 8px;
                    font-size: 1em;
                    background-color: #474747; /* Input background color */
                    border: none; /* Remove default border */
                    color: white; /* Input text color */
                    border-radius: 8px; /* Rounded corners for inputs */
                    width: 100%; /* Make input fields full width */
                    font-family: 'Kantumury Pro Thin', serif;
                }
                button {
                    width: 431px; /* Button width */
                    height: 39px; /* Button height */
                    font-size: 1em; /* Button font size */
                    font-family: 'Kantumury Pro Thin', serif;
                    cursor: pointer;
                    border: 2px solid white; /* Border color for the buttons */
                    border-radius: 8px; /* Rounded corners for buttons */
                    transition: background-color 0.2s; /* Transition effect for hover */
                }
                #signup-button {
                    background-color: #1e1e1e; /* Background color for Sign Up button */
                    color: white; /* Text color */
                }
                #signup-button:hover {
                    background-color: white; /* Hover background color */
                    color: #1e1e1e; /* Text color on hover */
                }
                #member-button {
                    background-color: white; /* Background color for I'm Already a Member button */
                    color: #1e1e1e; /* Text color */
                }
                #member-button:hover {
                    background-color: #1e1e1e; /* Hover background color */
                    color: white; /* Text color on hover */
                }
            </style>

            <div class="container">
                <form id="signup-form">
                    <label>
                        Name
                        <input type="text" id="name" required />
                    </label>
                    <label>
                        Email
                        <input type="email" id="email" required />
                    </label>
                    <label>
                        Password
                        <input type="password" id="password" />
                    </label>
                    <button type="button" id="signup-button">Sign Up</button>
                    <button type="button" id="member-button">I'm Already a Member</button>
                </form>
            </div>
        `;
    

        this.shadowRoot.getElementById('signup-button').addEventListener('click', () => this.handleSignUp());
        this.shadowRoot.getElementById('member-button').addEventListener('click', () => this.redirectToLogin());
    }

    redirectToLogin() {
        // Replace the signup form with the login form
        const loginForm = document.createElement('login-form');
        this.shadowRoot.innerHTML = ''; // Clear current content
        this.shadowRoot.appendChild(loginForm); // Append the login form
    }

    async handleSignUp() {
        const name = this.shadowRoot.getElementById('name').value.trim();
        const email = this.shadowRoot.getElementById('email').value.trim();
        const password = this.shadowRoot.getElementById('password').value.trim();

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const passwordPattern = /^[a-zA-Z0-9]+$/;

        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordPattern.test(password)) {
            alert('Password must be alphanumeric.');
            return;
        }

        const response = await fetch('./src/services/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const result = await response.json();

        if (result.success) {
            document.cookie = `user=${encodeURIComponent(JSON.stringify(result.userData))}; path=/;`;
            alert('Sign up successful! You are now logged in.');
            window.location.href = '#'; // Redirect to home or desired page
        } else {
            alert(result.message);
        }
    }

    async logout() {
        try {
            const response = await fetch('logout.php', {
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

customElements.define('signup-form', SignupForm);

