"use client";

import Link from "next/link";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.heroSection1}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            We make <span className={styles.heroTitleHighlight}>lives</span>
            <br />
            <span className={styles.heroTitleHighlight}>and communities</span>
            <br />
            better.
          </h1>
          <p className={styles.heroDescription}>
            At the core of our values, is the utmost goal of making individual
            lives, whether old or young, and communities of people, better than
            we meet it.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/donate">
              <button className={styles.heroDonateBtn}>Donate</button>
            </Link>
            <Link href="/about">
              <button className={styles.heroReadMoreBtn}>
                Read More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        <div className={styles.heroImages}>
          <div className={styles.heroImagesLeft}>
            <img src="./Frame2.png" className={styles.Icon1}/>
            <img src="./LeftImg.png" />
            <img src="./Frame1.png" className={styles.Icon2}/>
          </div>
          <div className={styles.heroImagesRight}>
            <img src="./Profile.png" className={styles.profileIcon}/>
            <img src="./RightImg.png" />
            <img src="./HelpingHand.png" className={styles.helpingHand}/>
          </div>
        </div>
      </div>

      {/* Values bar */}
      <marquee style={{width:"90%"}}>
      <div className={styles.heroValuesBar}>
          <span className={styles.heroValue}>Compassion</span>
          <span className={styles.heroValueSeparator}>✳</span>
          <span className={styles.heroValue}>Dignity</span>
          <span className={styles.heroValueSeparator}>✳</span>
          <span className={styles.heroValue}>Empowerment</span>
          <span className={styles.heroValueSeparator}>✳</span>
          <span className={styles.heroValue}>Integrity</span>
          <span className={styles.heroValueSeparator}>✳</span>
          <span className={styles.heroValue}>Community Transformation</span>
      </div>
      </marquee>
      
    </section>
  );
}
