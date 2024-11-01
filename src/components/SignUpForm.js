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
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                input {
                    padding: 8px;
                    font-size: 1em;
                }
                button {
                    padding: 10px;
                    font-size: 1em;
                    cursor: pointer;
                }
            </style>
            <form id="signup-form">
                <label>
                    Name:
                    <input type="text" id="name" required value="John Doe"/>
                </label>
                <label>
                    Email:
                    <input type="email" id="email" required value="john.doe@example.com"/>
                </label>
                <label>
                    Password:
                    <input type="password" id="password" required value="abcd1234"/>
                </label>
                <button type="button" id="signup-button">Sign Up</button>
                <button type="button" id="member-button">I'm Already a Member</button>
            </form>
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
}

customElements.define('signup-form', SignupForm);

