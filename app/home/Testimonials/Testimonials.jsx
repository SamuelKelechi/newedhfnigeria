"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Comfort Odubanjo",
    image: "/comfort.jpeg",
    text: "Comfort Odubanjo is one of the young people empowered through the foundation’s skill acquisition support program. We sponsored her professional makeup training, and today she is doing excellently well as a makeup artist. Beyond makeup, Comfort is also a talented videographer and photographer, using her creative skills to build a better future for herself. Her story reflects how empowerment and opportunity can transform lives and create independence for young people.",
  },
  {
    id: 2,
    name: "Aminat Isiaka",
    image: "/aminat.jpeg",
    text: "Aminat Isiaka, a young Northern Nigerian girl, was in a very critical health condition when we met her. She appeared severely malnourished, weak, and lacked access to proper medical care. The foundation stepped in immediately by taking her to the hospital for proper diagnosis and treatment. Today, Aminat is healthy, stronger, and looking much better. Her recovery is a testimony to the importance of timely healthcare support and community compassion.",
  },
  {
    id: 3,
    name: "Mr. Emeka",
    image: "/emeka.jpeg",
    text: "Mr. Emeka is a businessman who deals in phones and phone accessories. After his shop was attacked by robbers and all his goods were stolen, he was left devastated and unable to continue his business. In search of help, he came to the foundation, and we supported him in getting back on his feet. Today, Mr. Emeka is back in business and rebuilding his livelihood with hope and confidence once again.",
  },
  {
    id: 4,
    name: "Mr. Adekoyah",
    image: "/testimonial1.png",
    text: "Mr. Adekoyah suffered a terrible accident that severely damaged one of his legs. Due to financial difficulties, he was left untreated for a long time and lived in constant pain without proper medical attention. The foundation intervened by covering his medical bills, ensuring he received the surgery and treatment he needed, including the amputation of the damaged leg to save his life. We also enrolled him in our elderly care support services, where nurses regularly check on his wellbeing. Today, Mr. Adekoyah has fully recovered and returned to his daily work as a bus driver. His story is one of resilience, care, and restored hope. We cannot possibly list every life we have touched because there are so many stories of transformation and support within our communities. Through healthcare assistance, empowerment programs, education support, business recovery, and humanitarian services, the Elisha Development and Humanitarian Foundation continues to fulfill its mission of making lives and communities better.",
  },
];

const ITEMS_PER_PAGE = 3;

export default function Testimonials() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(
    testimonials.length / ITEMS_PER_PAGE
  );

  const start = (page - 1) * ITEMS_PER_PAGE;

  const visibleTestimonials = testimonials.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (
    <section className={styles.testimonialSection}>
      <div className={styles.testimonialWrapper}>

        {/* ================= LEFT CONTENT ================= */}

        <div className={styles.testimonialIntro}>

          <span className={styles.sectionTag}>
            TESTIMONIALS
          </span>

          <h2 className={styles.sectionTitle}>
            The Voices of Change: Personal
            Stories from Those Who Have
            Experienced the EDHF Nigeria
            Difference.
          </h2>

          <p className={styles.sectionDescription}>
            Discover the inspiring journeys of individuals and families who
            have experienced the life-changing impact of EDHF Nigeria's
            initiatives. Their testimonies reflect the transformative power
            of compassion, community support, and a shared commitment to
            building a better future for all.
          </p>

          {/* Decorative element */}
          <div className={styles.decorativeQuote}>
            <span>❧</span>
          </div>

          {/* ================= PAGINATION ================= */}

          <div className={styles.pagination}>

            <button
              className={styles.paginationArrow}
              onClick={() =>
                setPage((current) =>
                  Math.max(1, current - 1)
                )
              }
              disabled={page === 1}
              aria-label="Previous testimonials"
            >
              ←
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }).map(
                (_, index) => (
                  <button
                    key={index}
                    className={`${styles.pageNumber} ${
                      page === index + 1
                        ? styles.pageNumberActive
                        : ""
                    }`}
                    onClick={() =>
                      setPage(index + 1)
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </button>
                )
              )}
            </div>

            <button
              className={styles.paginationArrow}
              onClick={() =>
                setPage((current) =>
                  Math.min(totalPages, current + 1)
                )
              }
              disabled={page === totalPages}
              aria-label="Next testimonials"
            >
              →
            </button>

          </div>
        </div>


        {/* ================= RIGHT CONTENT ================= */}

        <div className={styles.testimonialList}>

          {visibleTestimonials.map(
            (testimonial, index) => (

              <article
                key={testimonial.id}
                className={`${styles.testimonialCard} ${
                  index === 1
                    ? styles.testimonialCardActive
                    : ""
                }`}
              >

                {/* Avatar */}

                <div className={styles.testimonialAvatar}>

                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    sizes="112px"
                    className={styles.avatarImage}
                  />

                </div>


                {/* Content */}

                <div className={styles.testimonialContent}>

                  <h3 className={styles.testimonialName}>
                    {testimonial.name}
                  </h3>

                  <p className={styles.testimonialText}>
                    {testimonial.text}
                  </p>

                </div>


                {/* Quote */}

                <div className={styles.quoteIcon}>
                  ”
                </div>

              </article>

            )
          )}

        </div>

      </div>
    </section>
  );
}