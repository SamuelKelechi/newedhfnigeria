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
      date,
      time,
      venue,
    } = body;

    if (!title || !image || !date || !time || !venue) {
      return NextResponse.json(
        { message: "All event fields are required." },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: {
        id,
      },
      data: {
        title,
        image,
        date: new Date(date),
        time,
        venue,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update event." },
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

    await prisma.event.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to delete event." },
      { status: 500 }
    );
  }
}