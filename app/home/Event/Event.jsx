"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Event.module.css";

const EVENTS_PER_PAGE = 3;

export default function Event() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  ==========================================================
  LOAD EVENTS
  ==========================================================
  */

useEffect(() => {
  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/event", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load events.");
      }

      const data = await response.json();

      // Latest event date first
      const sortedEvents = [...data].sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );

      setEvents(sortedEvents);

      // Always return to first page after loading
      setPage(1);

    } catch (error) {
      console.error("Failed to load events:", error);

      setError(
        "Unable to load events at the moment."
      );
    } finally {
      setLoading(false);
    }
  }

  loadEvents();
}, []);

  /*
  ==========================================================
  PAGINATION
  ==========================================================
  */

  const totalPages = Math.ceil(
    events.length / EVENTS_PER_PAGE
  );

  const startIndex =
    (page - 1) * EVENTS_PER_PAGE;

  const visibleEvents = events.slice(
    startIndex,
    startIndex + EVENTS_PER_PAGE
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  /*
  ==========================================================
  LOADING
  ==========================================================
  */

  if (loading) {
    return (
      <section className={styles.eventSection}>
        <div className={styles.eventWrapper}>

          <div className={styles.eventHeader}>
            <h3 className={styles.eventTag}>
              UP COMING EVENT
            </h3>

            <h2 className={styles.eventTitle}>
              Coming Together to Uplift Lives
            </h2>
          </div>

          <div className={styles.eventsList}>
            <p>Loading events...</p>
          </div>

        </div>
      </section>
    );
  }

  /*
  ==========================================================
  ERROR
  ==========================================================
  */

  if (error) {
    return (
      <section className={styles.eventSection}>
        <div className={styles.eventWrapper}>

          <div className={styles.eventHeader}>
            <h3 className={styles.eventTag}>
              UP COMING EVENT
            </h3>

            <h2 className={styles.eventTitle}>
              Coming Together to Uplift Lives
            </h2>
          </div>

          <div className={styles.eventsList}>
            <p>{error}</p>
          </div>

        </div>
      </section>
    );
  }

  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (
    <section className={styles.eventSection}>

      <div className={styles.eventWrapper}>

        {/* ================= HEADER ================= */}

        <div className={styles.eventHeader}>

          <h3 className={styles.eventTag}>
            UP COMING EVENT
          </h3>

          <h2 className={styles.eventTitle}>
            Coming Together to Uplift Lives
          </h2>

        </div>


        {/* ================= EVENTS ================= */}

        {events.length === 0 ? (

          <div className={styles.eventsList}>
            <p>No events available at the moment.</p>
          </div>

        ) : (

          <div className={styles.eventsList}>

            {visibleEvents.map((event) => (

              <div
                className={styles.eventItem}
                key={event.id}
              >

                {/* EVENT IMAGE */}

                <div className={styles.eventImageWrapper}>

                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className={styles.eventImage}
                  />

                </div>


                {/* EVENT INFORMATION */}

                <div className={styles.eventCard}>

                  <div className={styles.eventCardTop}>

                    <div className={styles.eventMetaGroup}>

                      {/* DATE */}

                      <div className={styles.eventMeta}>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >

                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="17"
                            rx="2"
                          />

                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                          />

                          <line
                            x1="8"
                            y1="2"
                            x2="8"
                            y2="6"
                          />

                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                          />

                        </svg>

                        <span>
                          {formatEventDate(event.date)}
                        </span>

                      </div>


                      {/* TIME */}

                      <div className={styles.eventMeta}>

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >

                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />

                          <polyline
                            points="12 7 12 12 15 14"
                          />

                        </svg>

                        <span>
                          {formatEventTime(event.time)}
                        </span>

                      </div>

                    </div>


                    {/* PRICE */}

                    <span className={styles.eventPrice}>
                      Free
                    </span>

                  </div>


                  {/* TITLE + LOCATION */}

                  <div className={styles.eventCardContent}>

                    <h3 className={styles.eventName}>
                      {event.title}
                    </h3>

                    <div className={styles.eventLocation}>

                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >

                        <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8Zm0 11.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4 3.2 3.2 0 0 1 0 6.4Z" />

                      </svg>

                      <span>
                        {event.venue}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (

          <div className={styles.pagination}>

            {/* PREVIOUS */}

            <button
              type="button"
              className={styles.paginationArrow}
              onClick={previousPage}
              disabled={page === 1}
              aria-label="Previous page"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <line
                  x1="19"
                  y1="12"
                  x2="5"
                  y2="12"
                />

                <polyline
                  points="12 19 5 12 12 5"
                />

              </svg>

            </button>


            {/* PAGE NUMBERS */}

            <div className={styles.pageNumbers}>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((number) => (

                <button
                  type="button"
                  key={number}
                  className={`${styles.pageNumber} ${
                    page === number
                      ? styles.pageNumberActive
                      : ""
                  }`}
                  onClick={() => setPage(number)}
                  aria-label={`Go to page ${number}`}
                >
                  {String(number).padStart(2, "0")}
                </button>

              ))}

            </div>


            {/* NEXT */}

            <button
              type="button"
              className={styles.paginationArrow}
              onClick={nextPage}
              disabled={page === totalPages}
              aria-label="Next page"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >

                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                />

                <polyline
                  points="12 5 19 12 12 19"
                />

              </svg>

            </button>

          </div>

        )}

      </div>

    </section>
  );
}


/*
============================================================
DATE FORMAT
============================================================
*/

function formatEventDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}


/*
============================================================
TIME FORMAT
============================================================
*/

function formatEventTime(time) {
  if (!time) {
    return "";
  }

  const [hours, minutes] = time.split(":");

  if (hours === undefined || minutes === undefined) {
    return time;
  }

  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
  );

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}