"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
  },
  {
    id: 2,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
  },
  {
    id: 3,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
  },
  {
    id: 4,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
  },
  {
    id: 5,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
  },
  {
    id: 6,
    name: "Grace Okafor",
    image: "/testimonial1.png",
    text: "Thanks to EDHF Nigeria, I was able to complete my education through their scholarship support. Their help came at a time when I had almost given up. I’m now pursuing my dreams with confidence.",
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