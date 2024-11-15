import "../components/StaticBanner.js";

class CorporatePage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: bloc;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #1e1e1e;
            text-align: left;
          }

          h1, h2 {
            color: #fff;
          }

          h1 {
            font-size: 3rem;
            margin: 0 0 10px;
          }

          h2 {
            font-size: 2rem;
            margin: 0 0 10px;
          }

          p {
            color: #ccc;
            font-size: 1rem;
            line-height: 1.5;
          }

          input, textarea {
            background-color: #333;
            display: block;
            margin: 10px 0;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
            color: #fff;
          }

          button {
            background-color: #1e1e1e;
            color: #fff;
            border: 1px solid #fff;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            float: right;
          }

          button:hover {
            background-color: #333;
          }

          .error {
            color: red;
            font-size: 0.9rem;
          }

          form {
            border: 2px solid transparent;
            padding: 20px;
            margin: 0;
            text-align: left;
            width: 1200px;
            box-sizing: border-box;
          }

          label {
            color: #fff;
            font-size: 1rem;
            margin-bottom: 5px;
            display: block;
          }

          img {
            width: 100%;
            height: auto;
            max-height: 300px;
            object-fit: cover;
            border-radius: 5px;
          }
        </style>
        <static-banner></static-banner>
        <div class="page-content">
          <h1><strong>Get in touch with us</strong></h1>
          <p>Please fill out the form below for any corporate inquiries, and we'll get back to you as soon as possible.</p>
          <div class="form">
            <form id="corporate-form">
              <h2><strong>Personal Details</strong></h2>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required>
              <label for="message">Message:</label>
              <textarea id="message" name="message" placeholder="Your Message" required></textarea>

              <h2><strong>Movie Booking Details</strong></h2>
              <label for="movie-title">Movie Title:</label>
              <input type="text" id="movie-title" name="movie-title" placeholder="Movie Title" required>
              <label for="event-date">Event Date:</label>
              <input type="date" id="event-date" name="event-date" required>
              <label for="event-name">Event Name (Optional):</label>
              <input type="text" id="event-name" name="event-name" placeholder="Event Name (Optional)">
              <label for="number-of-pax">Number of Pax:</label>
              <input type="number" id="number-of-pax" name="number-of-pax" placeholder="Number of Pax" required>
              <label for="preferred-time">Preferred Time:</label>
              <input type="time" id="preferred-time" name="preferred-time" required>
              <button type="submit">Submit</button>
              <button type="button" id="clear-button">Clear</button>
              <div id="error-message" class="error"></div>
            </form>
          </div>
        </div>
      `;

    this.shadowRoot
      .querySelector("#corporate-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.validateForm();
      });

    this.shadowRoot
      .querySelector("#clear-button")
      .addEventListener("click", () => this.clearForm());
  }

  clearForm() {
    this.shadowRoot.querySelector("#corporate-form").reset();
  }

  validateForm() {
    const name = this.shadowRoot.querySelector("#name").value.trim();
    const email = this.shadowRoot.querySelector("#email").value.trim();
    const message = this.shadowRoot.querySelector("#message").value.trim();
    const eventDateInput = this.shadowRoot.querySelector("#event-date").value;
    const eventDate = eventDateInput ? new Date(eventDateInput) : null;
    const numberOfPax = parseInt(
      this.shadowRoot.querySelector("#number-of-pax").value,
      10
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const errorMessages = [];

    if (!name) errorMessages.push("Name is required.");
    if (!email) errorMessages.push("Email is required.");
    if (!message) errorMessages.push("Message is required.");
    if (!eventDateInput) {
      errorMessages.push("Event date is required.");
    } else if (eventDate <= today) {
      errorMessages.push("Event date must be in the future.");
    }
    if (numberOfPax <= 9)
      errorMessages.push("Number of Pax cannot be less than 10.");
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      errorMessages.push("Please enter a valid email address.");

    if (errorMessages.length > 0) {
      this.showPopup(errorMessages.join("\n"));
    } else {
      this.submitForm();
    }
  }

  showPopup(message) {
    const popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.backgroundColor = "white";
    popupContainer.style.padding = "20px";
    popupContainer.style.border = "2px solid #333";
    popupContainer.style.zIndex = "1000";
    popupContainer.style.textAlign = "center";

    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageElement.style.whiteSpace = "pre-line";
    messageElement.style.color = "red";
    messageElement.style.fontSize = "20px";
    messageElement.style.fontWeight = "bold";

    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.style.marginTop = "10px";
    okButton.addEventListener("click", () => {
      popupContainer.remove();
    });

    popupContainer.appendChild(messageElement);
    popupContainer.appendChild(okButton);
    this.shadowRoot.appendChild(popupContainer);
  }

  submitForm() {
    const formData = new FormData(
      this.shadowRoot.querySelector("#corporate-form")
    );
    fetch("./src/services/form_submit.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(
          "There was an error submitting your form. Please try again later."
        );
      });
  }
}

customElements.define("corporate-page", CorporatePage);