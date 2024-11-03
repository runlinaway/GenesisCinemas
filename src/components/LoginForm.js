class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isCheckoutPage = window.location.hash.startsWith('#checkout');
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
                    font-family: 'Kantumruy Pro', sans-serif; /* Button font */
                    cursor: pointer;
                    border: 2px solid white; /* Border color for the buttons */
                    border-radius: 8px; /* Rounded corners for buttons */
                    transition: background-color 0.2s; /* Transition effect for hover */
                }
                #login-button {
                    background-color: #1e1e1e; /* Background color for Log In button */
                    color: white; /* Text color */
                }
                #login-button:hover {
                    background-color: white; /* Hover background color */
                    color: #1e1e1e; /* Text color on hover */
                }
            </style>
            <div class="container">
                <form id="login-form">
                    <label>
                        Email:
                        <input type="email" id="email" required />
                    </label>
                    <label>
                        Password:
                        <input type="password" id="password" required />
                    </label>
                    <button type="button" id="login-button">Log In</button>
                </form>
            </div>
        `;

        this.shadowRoot.getElementById('login-button').addEventListener('click', () => this.handleLogin());
    }

    async handleLogin() {
        const email = this.shadowRoot.getElementById('email').value.trim();
        const password = this.shadowRoot.getElementById('password').value.trim();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('./src/services/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Server returned non-JSON response. Please check server logs.');
            }

            const result = await response.json();

            if (result.success) {
                document.cookie = `user=${encodeURIComponent(JSON.stringify(result.userData))}; path=/;`;
                
                if (this.isCheckoutPage) {
                    window.location.reload();
                } else {
                    alert('Login successful! Welcome back!');
                    window.location.href = '#';
                }
            } else {
                alert(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    }
}

customElements.define('login-form', LoginForm);
