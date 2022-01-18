import React, { useState } from "react";

import Button from "./Button";
import styles from "scss/components/ContactForm.module.scss";

interface IContactFormProps {
  heading?: string;
  description?: string;
}

function ContactForm({ heading, description }: IContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("none");
  const [success, setSuccess] = useState("none");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // validate form
    if (name === "" || email === "" || message === "") {
      setError("block");
      setSuccess("none");
      return;
    }

    if (!email.includes("@")) {
      setError("block");
      setSuccess("none");
      return;
    }

    // send the message
    setError("none");
    setName("");
    setEmail("");
    setMessage("");
    setSuccess("block");
  };

  return (
    <div className="wrap">
      <h3>{heading}</h3>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.contact_form}>
          <div className={styles.doubleFields}>
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                data-testid="contactField"
                aria-label="name"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                data-testid="contactField"
                aria-label="email"
                required
              />
            </div>
          </div>
          <div className={styles.singleField}>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={handleMessageChange}
                data-testid="contactField"
                aria-label="message"
                required
              />
            </div>
          </div>
          <Button
            dataTestId="contactSubmit"
            buttonText="Send"
            handleClick={handleSubmit}
          />
        </div>

        <div id="create-error-msg" style={{ display: error, color: "red" }}>
          {!email.includes("@")
            ? `Please enter a valid email.`
            : `Please fill out all the information.`}
        </div>
        <div
          id="successfully-sent-msg"
          style={{ display: success, color: "green" }}
        >
          Message sent successfully. Thank you!
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
