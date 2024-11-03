import "../components/StaticBanner.js";

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
          
          <h3>Movie Booking Details</h3>
          <input type="text" id="movie-title" name="movie-title" placeholder="Movie Title" required>
          <input type="date" id="event-date" name="event-date" required>
          <input type="text" id="event-name" name="event-name" placeholder="Event Name (Optional)">
          <input type="number" id="number-of-pax" name="number-of-pax" placeholder="Number of Pax" required>
          <input type="time" id="preferred-time" name="preferred-time" placeholder="Preferred Time" required>
          
          <button type="submit">Submit</button>
        </form>
        <a href="#" class="cta-button">Learn More</a>
        </div>

      `;
  }

  // connectedCallback() {
  //   this.shadowRoot.querySelector('#corporate-form').addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     this.sendEmail();
  //   })

  // sendEmail() {
  //   const name = this.shadowRoot.querySelector("#name").value;
  //   const email = this.shadowRoot.querySelector("#email").value;
  //   const message = this.shadowRoot.querySelector("#message").value;

  //   // Additional fields
  //   const movieTitle = this.shadowRoot.querySelector("#movie-title").value;
  //   const eventDate = this.shadowRoot.querySelector("#event-date").value;
  //   const eventName =
  //     this.shadowRoot.querySelector("#event-name").value || "N/A";
  //   const numberOfPax = this.shadowRoot.querySelector("#number-of-pax").value;
  //   const preferredTime =
  //     this.shadowRoot.querySelector("#preferred-time").value;

  //   // Construct the email content
  //   const emailContent = `
  //   Name: ${name}
  //   Email: ${email}
  //   Message: ${message}

  //   Movie Booking Details:
  //   Movie Title: ${movieTitle}
  //   Event Date: ${eventDate}
  //   Event Name: ${eventName}
  //   Number of Pax: ${numberOfPax}
  //   Preferred Time: ${preferredTime}
  // `;

  //   // Email sending logic
  //   fetch("your_email_sending_endpoint", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       subject: "Corporate Inquiry",
  //       body: emailContent,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       alert("Your message has been sent successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert(
  //         "There was an error sending your message. Please try again later."
  //       );
  //     });
  // }
}

customElements.define("corporate-page", CorporatePage);
