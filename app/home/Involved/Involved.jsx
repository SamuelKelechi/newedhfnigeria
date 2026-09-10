"use client";

import styles from "./Involved.module.css";

export default function Involved() {
  return (
    <section className={styles.involvedContainer}>
      <div className={styles.involvedContainerWrapper}>

        {/* ================= LEFT ================= */}
        <div className={styles.involvedLeft}>

          <div className={styles.involvedHeading}>
            GET INVOLVED
          </div>

          <div className={styles.headingWrapper}>
            <h2 className={styles.involvedSubHeading}>
              Be the Hands That Uplift Others-Become a Part of Our Impact
              Team, Volunteer!
            </h2>

            <span className={styles.headingDecoration}>
              ✧
            </span>
          </div>

          <form className={styles.involvedForm}>

            {/* First Name */}
            <div className={styles.fullField}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                aria-label="First name"
              />
            </div>

            {/* Email + Phone */}
            <div className={styles.formRow}>

              <div className={styles.formField}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  aria-label="Email address"
                />
              </div>

              <div className={styles.formField}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  aria-label="Phone number"
                />
              </div>

            </div>

            {/* Message */}
            <div className={styles.messageField}>
              <textarea
                name="message"
                placeholder="Leave a message"
                aria-label="Leave a message"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.involvedSubmit}
            >
              Submit
            </button>

          </form>
        </div>


        {/* ================= RIGHT ================= */}
        <div className={styles.involvedRight}>

          <div className={styles.imageGlow}></div>

          <img
            src="/involved.png"
            alt="Get involved with EDHF"
            className={styles.involvedImg}
          />

        </div>

      </div>
    </section>
  );
}