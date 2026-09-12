"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Blog.module.css";

type BlogPost = {
  id: string;
  title: string;
  image: string;
  description: string;
  story: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
  ==========================================================
  LOAD LATEST BLOG POSTS
  ==========================================================
  */

  useEffect(() => {
    async function loadBlogs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/blog", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load blog posts.");
        }

        const data = await response.json();

        /*
          The API returns:
          {
            featuredPost,
            secondaryPosts,
            recentPosts,
            pagination
          }

          Combine the available posts and sort them
          by the newest publication date.
        */

        const allPosts: BlogPost[] = [
          ...(data.featuredPost ? [data.featuredPost] : []),
          ...(Array.isArray(data.secondaryPosts)
            ? data.secondaryPosts
            : []),
          ...(Array.isArray(data.recentPosts)
            ? data.recentPosts
            : []),
        ];

        const uniquePosts = Array.from(
          new Map(
            allPosts.map((post) => [post.id, post])
          ).values()
        );

        const sortedPosts = uniquePosts
          .filter((post) => post && post.id)
          .sort(
            (a, b) =>
              new Date(b.date).getTime() -
              new Date(a.date).getTime()
          )
          .slice(0, 3);

        setPosts(sortedPosts);
      } catch (error) {
        console.error(
          "Failed to load blog posts:",
          error
        );

        setError(
          "Unable to load our latest stories at the moment."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  /*
  ==========================================================
  FORMAT DATE
  ==========================================================
  */

  function formatBlogDate(date: string) {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  /*
  ==========================================================
  LOADING STATE
  ==========================================================
  */

  if (loading) {
    return (
      <section className={styles.blogSection}>
        <div className={styles.blogWrapper}>

          <div className={styles.blogHeader}>
            <h3 className={styles.blogTag}>
              LATEST BLOG
            </h3>

            <h2 className={styles.blogTitle}>
              Stories That Inspire Change
            </h2>
          </div>

          <div className={styles.blogLoading}>
            <p>Loading latest stories...</p>
          </div>

        </div>
      </section>
    );
  }

  /*
  ==========================================================
  ERROR STATE
  ==========================================================
  */

  if (error) {
    return (
      <section className={styles.blogSection}>
        <div className={styles.blogWrapper}>

          <div className={styles.blogHeader}>
            <h3 className={styles.blogTag}>
              LATEST BLOG
            </h3>

            <h2 className={styles.blogTitle}>
              Stories That Inspire Change
            </h2>
          </div>

          <div className={styles.blogLoading}>
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
    <section className={styles.blogSection}>

      <div className={styles.blogWrapper}>

        {/* ================= HEADER ================= */}

        <div className={styles.blogHeader}>

          <div>
            <h3 className={styles.blogTag}>
              LATEST BLOG
            </h3>

            <h2 className={styles.blogTitle}>
              Stories That Inspire Change
            </h2>
          </div>

          <Link
            href="/blog"
            className={styles.viewAllTop}
          >
            View All Stories
            <span>→</span>
          </Link>

        </div>


        {/* ================= BLOG POSTS ================= */}

        {posts.length === 0 ? (

          <div className={styles.blogLoading}>
            <p>
              No blog stories are available at the moment.
            </p>
          </div>

        ) : (

          <div className={styles.blogGrid}>

            {posts.map((post, index) => (

              <article
                className={styles.blogCard}
                key={post.id}
                style={{
                  animationDelay:
                    `${index * 0.1}s`,
                }}
              >

                {/* ================= IMAGE ================= */}

                <Link
                  href="/blog"
                  className={styles.blogImageWrapper}
                  aria-label={`Read ${post.title}`}
                >

                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className={styles.blogImage}
                  />

                  <div className={styles.blogImageOverlay}>
                    <span>
                      Read Story
                    </span>
                  </div>

                </Link>


                {/* ================= CONTENT ================= */}

                <div className={styles.blogCardContent}>

                  {/* DATE */}

                  <div className={styles.blogDate}>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
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
                      {formatBlogDate(post.date)}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h3 className={styles.blogCardTitle}>
                    {post.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p className={styles.blogDescription}>
                    {post.description}
                  </p>


                  {/* READ MORE */}

                  <Link
                    href="/blog"
                    className={styles.readMore}
                  >
                    Read Story
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}


        {/* ================= BOTTOM CTA ================= */}

        {posts.length > 0 && (

          <div className={styles.blogBottom}>

            <Link
              href="/blog"
              className={styles.viewAllButton}
            >
              View All Stories
              <span>→</span>
            </Link>

          </div>

        )}

      </div>

    </section>
  );
}