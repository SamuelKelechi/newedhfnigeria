"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Donate.module.css";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref?: string;
        metadata?: {
          custom_fields?: Array<{
            display_name: string;
            variable_name: string;
            value: string;
          }>;
        };
        onClose?: () => void;
        callback?: (response: {
          reference: string;
        }) => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

const PAYSTACK_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const numericAmount = Number(amount);

  const isDonationReady =
    numericAmount > 0 &&
    name.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "";

  /*
   * =========================================================
   * LOAD PAYSTACK CHECKOUT
   * =========================================================
   */

  const loadPaystack = (): Promise<
  NonNullable<Window["PaystackPop"]>
> => {
    return new Promise((resolve, reject) => {
      // Paystack already loaded
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src="https://js.paystack.co/v2/inline.js"]'
      );

      if (existingScript) {
          existingScript.addEventListener("load", () => {
            if (window.PaystackPop) {
              resolve(window.PaystackPop);
            } else {
              reject(new Error("Paystack failed to initialize."));
            }
          });

          existingScript.addEventListener("error", () => {
            reject(new Error("Unable to load Paystack."));
          });

          return;
      }

      const script = document.createElement("script");

      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;

      script.onload = () => {
        if (window.PaystackPop) {
          resolve(window.PaystackPop);
        } else {
          reject(new Error("Paystack failed to initialize."));
        }
      };

      script.onerror = () => {
        reject(new Error("Unable to load Paystack."));
      };

      document.body.appendChild(script);
    });
  };


  const handleDonation = async () => {
    if (!isDonationReady) {
      return;
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      alert("Paystack public key is missing.");
      return;
    }

    try {
      setIsLoading(true);

      const PaystackPop = await loadPaystack();

      const reference =
        `EDHF-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`;

      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,

        email: email.trim(),

        amount: Math.round(numericAmount * 100),

        currency: "NGN",

        ref: reference,

        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: name.trim(),
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: phone.trim(),
            },
          ],
        },

        callback: function (response) {
          console.log("Payment successful:", response);

          alert(
            "Thank you for supporting Elisha Development and Humanitarian Foundation. Your donation was received successfully."
          );

          setAmount("");
          setName("");
          setEmail("");
          setPhone("");
          setIsLoading(false);
        },

        onClose: function () {
          console.log("Paystack payment window closed.");

          setIsLoading(false);
        },
      });

      handler.openIframe();
    } catch (error) {
      console.error("Paystack Error:", error);

      alert(
        "We could not open the payment window. Please check your internet connection and try again."
      );

      setIsLoading(false);
    }
  };

  return (
    <main className={styles.donatePage}>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className={styles.donateHero}>
        <Image
          src="/Support.jpg"
          alt="Supporting children and families through EDHF"
          fill
          priority
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            MAKE A DIFFERENCE
          </span>

          <h1>
            Change the Life of Those
            <br />
            Who Have No Hope
          </h1>

          <p>
            Help us reach more children and families in need.
            <br />
            Your generosity can become someone's hope.
          </p>
        </div>
      </section>

      {/* =====================================================
          DONATION CARD
      ===================================================== */}

      <section className={styles.donationSection}>
        <div className={styles.donationCard}>
          {/* LEFT INTRO */}

          <div className={styles.donationIntro}>
            <span className={styles.sectionEyebrow}>
              SUPPORT OUR MISSION
            </span>

            <h2>Donate Now</h2>

            <p>
              Every contribution helps us provide support,
              care, opportunities and hope to children,
              families and communities in need.
            </p>

            <div className={styles.paymentBadge}>
              <span>SECURE PAYMENT</span>

              <strong>Paystack</strong>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.cardIcon}>
                💳
              </div>

              <div>
                <strong>Secure & Convenient</strong>

                <p>
                  You can make your donation securely
                  using your debit or credit card.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}

          <div className={styles.donationForm}>
            <div className={styles.formHeader}>
              <h3>Make Your Donation</h3>

              <p>
                Please provide your details below.
              </p>
            </div>

            {/* AMOUNT */}

            <div className={styles.formField}>
              <label htmlFor="donation-amount">
                Donation Amount
              </label>

              <div className={styles.amountInput}>
                <span>₦</span>

                <input
                  id="donation-amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) =>
                    setAmount(event.target.value)
                  }
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>

            {/* NAME */}

            <div className={styles.formField}>
              <label htmlFor="donor-name">
                Name
              </label>

              <input
                id="donor-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
                required
              />
            </div>

            {/* EMAIL */}

            <div className={styles.formField}>
              <label htmlFor="donor-email">
                Email Address
              </label>

              <input
                id="donor-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Enter your email"
                required
              />
            </div>

            {/* PHONE */}

            <div className={styles.formField}>
              <label htmlFor="donor-phone">
                Phone Number
              </label>

              <input
                id="donor-phone"
                type="tel"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* PAYSTACK BUTTON */}

            <button
              type="button"
              className={styles.payButton}
              onClick={handleDonation}
              disabled={!isDonationReady || isLoading}
            >
              {isLoading
                ? "Opening Secure Payment..."
                : "Donate Now"}
            </button>

            <p className={styles.secureNote}>
              Your donation is processed securely through
              Paystack.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          BANK TRANSFER
      ===================================================== */}

      <section className={styles.bankSection}>
        <div className={styles.bankHeader}>
          <span className={styles.sectionEyebrow}>
            OTHER WAYS TO GIVE
          </span>

          <h2>
            Support Us Through Bank Transfer
          </h2>

          <p>
            You can also make a direct donation to any
            of our official accounts below.
          </p>
        </div>

        <div className={styles.bankGrid}>
          {/* ECOBANK */}

          <div className={styles.bankCard}>
            <div className={styles.bankTop}>
              <div className={styles.bankLogoWrap}>
                <Image
                  src="/Eco.jpg"
                  alt="EcoBank"
                  width={90}
                  height={90}
                  className={styles.bankLogo}
                />
              </div>

              <span className={styles.bankLabel}>
                BANK TRANSFER
              </span>
            </div>

            <h3>
              Elisha Development and Humanitarian Foundation
            </h3>

            <div className={styles.bankName}>
              ECO BANK
            </div>

            <div className={styles.accountNumber}>
              3150003919
            </div>
          </div>

          {/* GTBANK */}

          <div className={styles.bankCard}>
            <div className={styles.bankTop}>
              <div className={styles.bankLogoWrap}>
                <Image
                  src="/gtbank.jpeg"
                  alt="GTBank"
                  width={90}
                  height={90}
                  className={styles.bankLogo}
                />
              </div>

              <span className={styles.bankLabel}>
                BANK TRANSFER
              </span>
            </div>

            <h3>
              Elisha Development and Humanitarian Foundation
            </h3>

            <div className={styles.bankName}>
              GT BANK
            </div>

            <div className={styles.accountNumber}>
              0564984454
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CLOSING MESSAGE
      ===================================================== */}

      <section className={styles.donationClosing}>
        <div className={styles.closingIcon}>
          ♥
        </div>

        <h2>
          Together, We Can Make a Difference
        </h2>

        <p>
          Your generosity gives hope, creates opportunities
          and helps build stronger communities.
        </p>
      </section>
    </main>
  );
}