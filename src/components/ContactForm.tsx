import React, { useState } from "react";

import Button from "./Button";
import styles from "scss/components/ContactForm.module.scss";

interface IContactFormProps {
  heading: string;
  description: string;
}

function ContactForm({ heading, description }: IContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("none");

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
    } else {
      // send the message
    }
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
                onChange={handleNameChange}
                data-testid="contactField"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleEmailChange}
                data-testid="contactField"
                required
              />
            </div>
          </div>
          <div className={styles.singleField}>
            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                onChange={handleMessageChange}
                data-testid="contactField"
                required
              />
            </div>
          </div>
          <Button dataTestId="contactField" buttonText="Send" />
        </div>

        <div id="create-error-msg" style={{ display: error }}>
          Please fill out all the information.
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
