class FaqPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 0;
            margin: 0;
            font-family: 'Kantumruy Pro', sans-serif;
            background-color: #1e1e1e;
            min-height: 100vh;
          }
  
          .page-content {
            padding: 2rem;
            max-width: 800px;
            margin: 0;
            padding-left: 4rem;
          }
  
          h2 {
            font-family: 'Italiana', serif;
            color: #fff;
            font-size: 2.5rem;
            margin: 0 0 2rem;
            text-align: left;
          }
  
          h4 {
            font-family: 'Italiana', serif;
            font-size: 1.2rem;
            margin: 0;
            color: #fff;
          }
  
          .question {
            cursor: pointer;
            padding: 1rem;
            margin: 0.8rem 0;
            background-color: rgba(255, 255, 255, 0.05);
            color: #fff;
            border-radius: 4px;
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }
  
          .question:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
          }
  
          .answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out, padding 0.4s ease;
            margin-top: 0.5rem;
            opacity: 0;
            color: #999;
          }
  
          .answer p {
            margin: 0;
            line-height: 1.6;
            font-size: 1rem;
          }
  
          .question.open {
            background-color: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.3);
          }
  
          .question.open .answer {
            max-height: 200px;
            opacity: 1;
            padding: 1rem 0 0.5rem;
          }
        </style>
  
        <div class="page-content">
          <h2>Frequently Asked Questions</h2>
          <div class="faq">
            <div class="question">
              <h4>1. What are your cinema’s opening hours?</h4>
              <div class="answer">
                <p>Our cinema is open from 10 AM to 11 PM every day.</p>
              </div>
            </div>
            <div class="question">
              <h4>2. Do you offer discounts for students?</h4>
              <div class="answer">
                <p>Yes, we offer a 10% discount for students with valid ID on all tickets.</p>
              </div>
            </div>
            <div class="question">
              <h4>3. Can I purchase tickets online?</h4>
              <div class="answer">
                <p>Absolutely! Tickets can be purchased online through our website or app.</p>
              </div>
            </div>
            <div class="question">
              <h4>4. Are there any age restrictions for movies?</h4>
              <div class="answer">
                <p>Yes, some films have age restrictions. Please check the movie rating before purchasing tickets.</p>
              </div>
            </div>
            <div class="question">
              <h4>5. Is food and drink allowed in the cinema?</h4>
              <div class="answer">
                <p>Yes, you can bring snacks and drinks, but please be considerate of others.</p>
              </div>
            </div>
            <div class="question">
              <h4>6. What should I do if I lose my ticket?</h4>
              <div class="answer">
                <p>Please visit our customer service desk, and we will assist you in retrieving your ticket.</p>
              </div>
            </div>
            <div class="question">
              <h4>7. Are there special screenings for kids?</h4>
              <div class="answer">
                <p>Yes, we host special screenings for kids every Saturday morning.</p>
              </div>
            </div>
            <div class="question">
              <h4>8. Do you have wheelchair accessible seating?</h4>
              <div class="answer">
                <p>Yes, our cinema is fully accessible for guests with disabilities.</p>
              </div>
            </div>
            <div class="question">
              <h4>9. Can I reserve seats in advance?</h4>
              <div class="answer">
                <p>Yes, you can reserve your seats when purchasing tickets online.</p>
              </div>
            </div>
            <div class="question">
              <h4>10. How can I contact customer service?</h4>
              <div class="answer">
                <p>You can reach our customer service via phone, email, or through the contact form on our website.</p>
              </div>
            </div>
          </div>
        </div>
      `;
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll(".question").forEach((question) => {
      question.addEventListener("click", () => {
        // Close any currently open answers with transition
        this.shadowRoot.querySelectorAll(".question").forEach((q) => {
          if (q !== question && q.classList.contains("open")) {
            q.classList.remove("open");
            const answer = q.querySelector(".answer");
            answer.style.opacity = "0";
          }
        });

        // Toggle the clicked question's answer
        const answer = question.querySelector(".answer");
        if (question.classList.contains("open")) {
          question.classList.remove("open");
          answer.style.opacity = "0";
        } else {
          question.classList.add("open");
          answer.style.opacity = "1";
        }
      });
    });
  }
}

customElements.define("faq-page", FaqPage);
