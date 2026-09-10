"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Backend/newsletter API will be connected later
    console.log("Newsletter email:", email);

    setEmail("");
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.newsletterWrapper}>

        <div className={styles.newsletterContent}>
          <span className={styles.newsletterTag}>
            NEWSLETTER
          </span>

          <h2 className={styles.newsletterTitle}>
            Get the Latest Updates on How We're Changing
            <br className={styles.desktopBreak} />
            Lives—Right in Your Inbox
          </h2>

          <form
            className={styles.newsletterForm}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />

            <button type="submit">
              Submit
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}