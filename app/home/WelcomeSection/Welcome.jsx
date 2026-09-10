"use client";

import Link from "next/link";
import style from "./Welcome.module.css";

export default function Welcome() {
  return (
    <section className={style.welcomeContainer}>
      <div className={style.welcomeContainerWrapper}>
        <div className={style.welcomeContainerLeft}>
            <img src="./welcome.png" />
        </div>
        <div className={style.welcomeContainerRight}>
            <h3 className={style.welcomeContainerHeader}>WELCOME TO EDHF</h3>
            <h2 className={style.welcomeContainerSubheader}>Rebuilding Lives with Dignity</h2>
            <p className={style.welcomeParagraph}>We believe everyone should be able to live with dignity, without dependence. We are a Non-Governmental Organization, based in Lagos Nigeria. We strive to protect and feed the poor, advocate and enlighten communities, empower young people, serve as the voice to the voiceless, we give grants and scholarship, we serve as an outstretched arm of God, we bring succor and hope to the need.</p>
            <Link href="/about">
              <button className={style.welcomeReadMoreBtn}>
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
    </section>
  );
}
