import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isAdminAuthenticated } from "@/lib/auth";

const prisma = new PrismaClient();

/* =========================================================
   GET ALL BLOG POSTS
========================================================= */

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const blogs = await prisma.blog.findMany({
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch blog posts." },
      { status: 500 }
    );
  }
}


/* =========================================================
   CREATE BLOG POST
========================================================= */

export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title,
      image,
      description,
      story,
      date,
    } = body;

    if (
      !title ||
      !image ||
      !description ||
      !story ||
      !date
    ) {
      return NextResponse.json(
        {
          message:
            "Title, image, description, story and date are required.",
        },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title: title.trim(),
        image: image.trim(),
        description: description.trim(),
        story: story.trim(),
        date: new Date(date),
      },
    });

    return NextResponse.json(
      {
        message: "Blog post created successfully.",
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create blog post." },
      { status: 500 }
    );
  }
}


/* =========================================================
   UPDATE BLOG POST
========================================================= */

export async function PUT(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      id,
      title,
      image,
      description,
      story,
      date,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    if (
      !title ||
      !image ||
      !description ||
      !story ||
      !date
    ) {
      return NextResponse.json(
        {
          message:
            "Title, image, description, story and date are required.",
        },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title: title.trim(),
        image: image.trim(),
        description: description.trim(),
        story: story.trim(),
        date: new Date(date),
      },
    });

    return NextResponse.json({
      message: "Blog post updated successfully.",
      blog,
    });
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update blog post." },
      { status: 500 }
    );
  }
}


/* =========================================================
   DELETE BLOG POST
========================================================= */

export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    await prisma.blog.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete blog post." },
      { status: 500 }
    );
  }
}