"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./blog.css";

/* =========================================================
   BLOG TYPE
========================================================= */

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

type BlogResponse = {
  featuredPost: BlogPost | null;
  secondaryPosts: BlogPost[];
  recentPosts: BlogPost[];

  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecentPosts: number;
    postsPerPage: number;
  };
};

export default function Blog() {
  /* =====================================================
     STATE
  ===================================================== */

  const [featuredPost, setFeaturedPost] =
    useState<BlogPost | null>(null);

  const [secondaryPosts, setSecondaryPosts] =
    useState<BlogPost[]>([]);

  const [recentPosts, setRecentPosts] =
    useState<BlogPost[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedPost, setSelectedPost] =
    useState<BlogPost | null>(null);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalRecentPosts, setTotalRecentPosts] =
    useState(0);

  const POSTS_PER_PAGE = 20;

  /* =====================================================
     FETCH BLOGS
  ===================================================== */

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        setError("");

        const response = await fetch(
          `/api/blog?page=${currentPage}&limit=${POSTS_PER_PAGE}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch blog posts."
          );
        }

        const data: BlogResponse =
          await response.json();

        setFeaturedPost(
          data.featuredPost || null
        );

        setSecondaryPosts(
          Array.isArray(
            data.secondaryPosts
          )
            ? data.secondaryPosts
            : []
        );

        setRecentPosts(
          Array.isArray(
            data.recentPosts
          )
            ? data.recentPosts
            : []
        );

        setTotalPages(
          data.pagination?.totalPages || 1
        );

        setTotalRecentPosts(
          data.pagination
            ?.totalRecentPosts || 0
        );
      } catch (error) {
        console.error(
          "BLOG FETCH ERROR:",
          error
        );

        setError(
          "Unable to load blog posts at the moment."
        );

        setFeaturedPost(null);
        setSecondaryPosts([]);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  /* =====================================================
     CLOSE MODAL WITH ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    if (selectedPost) {
      document.addEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "hidden";
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date: string) => {
    if (!date) return "";

    try {
      return new Date(
        date
      ).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  /* =====================================================
     OPEN MODAL
  ===================================================== */

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closePost = () => {
    setSelectedPost(null);
  };

  /* =====================================================
     RENDER FULL STORY
  ===================================================== */

  const renderStory = (story: string) => {
    if (!story) {
      return (
        <p>
          No story is available for this
          blog post.
        </p>
      );
    }

    const paragraphs = story
      .split(/\n\s*\n/)
      .map((paragraph) =>
        paragraph.trim()
      )
      .filter(Boolean);

    if (paragraphs.length === 1) {
      return (
        <p className="storyParagraph">
          {story}
        </p>
      );
    }

    return paragraphs.map(
      (paragraph, index) => (
        <p
          key={`${selectedPost?.id}-story-${index}`}
          className="storyParagraph"
        >
          {paragraph}
        </p>
      )
    );
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const goToPage = (page: number) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     PAGINATION NUMBERS
  ===================================================== */

  const getPageNumbers = () => {
    const pages: (number | string)[] =
      [];

    if (totalPages <= 7) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    if (currentPage <= 4) {
      pages.push(
        1,
        2,
        3,
        4,
        5,
        "...",
        totalPages
      );

      return pages;
    }

    if (
      currentPage >=
      totalPages - 3
    ) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );

      return pages;
    }

    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );

    return pages;
  };

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <main className="blogPage">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="blogHero">
        <div className="blogHeroInner">
          <div className="blogHeroText">
            <p className="blogEyebrow">
              Catch up on our events
            </p>

            <h1>
              Building{" "}
              <span>Hope</span>, Story
              <br />
              by Story
            </h1>
          </div>

          <div className="blogHeroGraphic">
            <div className="heroOrbit heroOrbitOne"></div>
            <div className="heroOrbit heroOrbitTwo"></div>
            <div className="heroOrbit heroOrbitThree"></div>

            <div className="heroNewsIcon">
              <span className="newsFold"></span>

              <div className="newsText">
                NEWS
              </div>

              <div className="newsLines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="heroDot heroDotBlue">
              <span>📢</span>
            </div>

            <div className="heroDot heroDotPurple">
              <span>▣</span>
            </div>

            <div className="heroDot heroDotOrange">
              <span>◉</span>
            </div>

            <div className="heroPill">
              <span>🤝</span>

              <strong>
                NGO impact stories
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <section className="blogLoading">
          <div className="blogLoader"></div>

          <p>
            Loading our stories...
          </p>
        </section>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {!loading && error && (
        <section className="blogError">
          <p>{error}</p>
        </section>
      )}

      {/* =====================================================
          BLOG CONTENT
      ===================================================== */}

      {!loading &&
        !error &&
        (featuredPost ||
          secondaryPosts.length > 0 ||
          recentPosts.length > 0) && (
          <>
            <section className="blogContent">
              {/* =================================================
                  FEATURED POST
              ================================================= */}

              {featuredPost && (
                <article className="featuredPost">
                  <div className="featuredImage">
                    <Image
                      src={
                        featuredPost.image
                      }
                      alt={
                        featuredPost.title
                      }
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                    />
                  </div>

                  <div className="featuredContent">
                    <h2>
                      {
                        featuredPost.title
                      }
                    </h2>

                    <p className="postDate">
                      {formatDate(
                        featuredPost.date
                      )}
                    </p>

                    <p className="featuredExcerpt">
                      {
                        featuredPost.description
                      }
                    </p>

                    <button
                      type="button"
                      className="readMore"
                      onClick={() =>
                        openPost(
                          featuredPost
                        )
                      }
                    >
                      Read more
                    </button>
                  </div>
                </article>
              )}

              {/* =================================================
                  SECONDARY POSTS
              ================================================= */}

              {secondaryPosts.length >
                0 && (
                <div className="secondaryPosts">
                  {secondaryPosts.map(
                    (post) => (
                      <article
                        className="secondaryCard"
                        key={post.id}
                      >
                        <div className="secondaryImage">
                          <Image
                            src={
                              post.image
                            }
                            alt={
                              post.title
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        <div className="secondaryContent">
                          <h2>
                            {
                              post.title
                            }
                          </h2>

                          <p className="postDate">
                            {formatDate(
                              post.date
                            )}
                          </p>

                          <p className="secondaryExcerpt">
                            {
                              post.description
                            }
                          </p>

                          <button
                            type="button"
                            className="readMore"
                            onClick={() =>
                              openPost(
                                post
                              )
                            }
                          >
                            Read more
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </div>
              )}
            </section>

            {/* =====================================================
                RECENT UPDATES
            ===================================================== */}

            {recentPosts.length >
              0 && (
              <section className="recentSection">
                <h2 className="recentHeading">
                  Most Recent Update
                </h2>

                <div className="recentGrid">
                  {recentPosts.map(
                    (post) => (
                      <article
                        className="recentCard"
                        key={post.id}
                      >
                        <div className="recentImage">
                          <Image
                            src={
                              post.image
                            }
                            alt={
                              post.title
                            }
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                          />
                        </div>

                        <div className="recentContent">
                          <h3>
                            {
                              post.title
                            }
                          </h3>

                          <p className="recentDate">
                            {formatDate(
                              post.date
                            )}
                          </p>

                          <p className="recentExcerpt">
                            {
                              post.description
                            }
                          </p>

                          <button
                            type="button"
                            className="readMore"
                            onClick={() =>
                              openPost(
                                post
                              )
                            }
                          >
                            Read more
                          </button>
                        </div>
                      </article>
                    )
                  )}
                </div>
              </section>
            )}

            {/* =====================================================
                RECENT PAGINATION
            ===================================================== */}

            {totalPages > 1 && (
              <section className="blogPaginationSection">
                <div className="blogPaginationInfo">
                  Showing recent
                  stories{" "}
                  <strong>
                    {Math.min(
                      (currentPage - 1) *
                        POSTS_PER_PAGE +
                        1,
                      totalRecentPosts
                    )}
                  </strong>{" "}
                  –{" "}
                  <strong>
                    {Math.min(
                      currentPage *
                        POSTS_PER_PAGE,
                      totalRecentPosts
                    )}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {
                      totalRecentPosts
                    }
                  </strong>
                </div>

                <div
                  className="blogPagination"
                  aria-label="Recent blog pagination"
                >
                  {/* PREVIOUS */}

                  <button
                    type="button"
                    className="paginationArrow"
                    disabled={
                      currentPage ===
                      1
                    }
                    onClick={() =>
                      goToPage(
                        currentPage - 1
                      )
                    }
                    aria-label="Previous page"
                  >
                    ‹
                  </button>

                  {/* PAGE NUMBERS */}

                  {getPageNumbers().map(
                    (page, index) => {
                      if (
                        page ===
                        "..."
                      ) {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="paginationEllipsis"
                          >
                            …
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          type="button"
                          className={`paginationNumber ${
                            currentPage ===
                            page
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            goToPage(
                              page as number
                            )
                          }
                        >
                          {page}
                        </button>
                      );
                    }
                  )}

                  {/* NEXT */}

                  <button
                    type="button"
                    className="paginationArrow"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      goToPage(
                        currentPage + 1
                      )
                    }
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
              </section>
            )}
          </>
        )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!loading &&
        !error &&
        !featuredPost &&
        secondaryPosts.length === 0 &&
        recentPosts.length === 0 && (
          <section className="blogEmpty">
            <h2>
              No blog posts yet.
            </h2>

            <p>
              Check back soon for our latest
              stories and updates.
            </p>
          </section>
        )}

      {/* =====================================================
          BLOG MODAL / OVERLAY
      ===================================================== */}

      {selectedPost && (
        <div
          className="blogModalOverlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closePost();
            }
          }}
        >
          <div className="blogModal">
            {/* CLOSE */}

            <button
              type="button"
              className="blogModalClose"
              onClick={closePost}
              aria-label="Close blog post"
            >
              ×
            </button>

            {/* IMAGE */}

            {selectedPost.image && (
              <div className="blogModalImage">
                <Image
                  src={
                    selectedPost.image
                  }
                  alt={
                    selectedPost.title
                  }
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            )}

            {/* CONTENT */}

            <div className="blogModalContent">
              <p className="blogModalDate">
                {formatDate(
                  selectedPost.date
                )}
              </p>

              <h2>
                {selectedPost.title}
              </h2>

              <div className="blogModalDivider"></div>

              <div className="blogModalArticle">
                {renderStory(
                  selectedPost.story
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}