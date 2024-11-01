class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

        const response = await fetch('./src/services/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (result.success) {
            document.cookie = `user=${encodeURIComponent(JSON.stringify(result.userData))}; path=/;`;
            alert('Login successful! Welcome back!');
            window.location.href = '#'; // Redirect to home or desired page
        } else {
            alert(result.message);
        }
    }
}

customElements.define('login-form', LoginForm);
