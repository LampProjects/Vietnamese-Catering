// ContactPage.js
import React from "react";
import "../common.css";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="page-wrapper">
      <div className="content-container">
        <main>
          <h2 className="contact-title">Contact Us</h2>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default ContactPage;