import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      title,
      image,
      description,
      story,
      date,
    } = body;

    if (!title || !image || !description || !story || !date) {
      return NextResponse.json(
        { message: "All blog fields are required." },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.update({
      where: {
        id,
      },
      data: {
        title,
        image,
        description,
        story,
        date: new Date(date),
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update blog post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

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