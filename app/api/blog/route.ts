import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* =========================================================
   GET PUBLIC BLOG POSTS

   STRUCTURE:
   - Featured Post: 1
   - Secondary Posts: 2
   - Recent Posts: 20 per page
========================================================= */

export async function GET(
  request: NextRequest
) {
  try {
    /* =====================================================
       GET PAGE
    ===================================================== */

    const { searchParams } =
      new URL(request.url);

    const pageParam =
      searchParams.get("page");

    const page = Math.max(
      Number(pageParam) || 1,
      1
    );

    /* =====================================================
       POSTS PER RECENT PAGE
    ===================================================== */

    const recentPostsPerPage = 20;

    /* =====================================================
       GET TOTAL BLOG POSTS
    ===================================================== */

    const totalPosts =
      await prisma.blog.count();

    /* =====================================================
       GET FEATURED + SECONDARY POSTS
       
       These 3 posts NEVER participate
       in pagination.
    ===================================================== */

    const topPosts =
      await prisma.blog.findMany({
        orderBy: {
          date: "desc",
        },

        take: 3,
      });

    /* =====================================================
       SPLIT TOP POSTS
    ===================================================== */

    const featuredPost =
      topPosts[0] || null;

    const secondaryPosts =
      topPosts.slice(1, 3);

    /* =====================================================
       TOTAL RECENT POSTS
       
       Remove the 3 featured/secondary posts
       from the total count.
    ===================================================== */

    const totalRecentPosts =
      Math.max(
        totalPosts - 3,
        0
      );

    /* =====================================================
       TOTAL RECENT PAGES
    ===================================================== */

    const totalRecentPages =
      Math.ceil(
        totalRecentPosts /
          recentPostsPerPage
      );

    /* =====================================================
       PROTECT AGAINST INVALID PAGE
    ===================================================== */

    const safePage =
      totalRecentPages > 0
        ? Math.min(
            page,
            totalRecentPages
          )
        : 1;

    /* =====================================================
       CALCULATE SKIP
       
       +3 means pagination starts AFTER
       the first 3 posts.
    ===================================================== */

    const skip =
      3 +
      (safePage - 1) *
        recentPostsPerPage;

    /* =====================================================
       GET RECENT POSTS
    ===================================================== */

    const recentPosts =
      await prisma.blog.findMany({
        orderBy: {
          date: "desc",
        },

        skip,

        take: recentPostsPerPage,
      });

    /* =====================================================
       RETURN RESPONSE
    ===================================================== */

    return NextResponse.json({
      featuredPost,

      secondaryPosts,

      recentPosts,

      pagination: {
        currentPage: safePage,

        totalPages:
          totalRecentPages,

        totalRecentPosts,

        postsPerPage:
          recentPostsPerPage,
      },
    });
  } catch (error) {
    console.error(
      "PUBLIC BLOG GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch blog posts.",
      },
      {
        status: 500,
      }
    );
  }
}