import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { isAdminAuthenticated } from "@/lib/auth";

const prisma = new PrismaClient();

/* =========================================================
   GET ALL EVENTS
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

    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("GET EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch events." },
      { status: 500 }
    );
  }
}


/* =========================================================
   CREATE EVENT
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
      date,
      time,
      venue,
    } = body;

    if (
      !title ||
      !image ||
      !date ||
      !time ||
      !venue
    ) {
      return NextResponse.json(
        {
          message:
            "Title, image, date, time and venue are required.",
        },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title: title.trim(),
        image: image.trim(),
        date: new Date(date),
        time: time.trim(),
        venue: venue.trim(),
      },
    });

    return NextResponse.json(
      {
        message: "Event created successfully.",
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create event." },
      { status: 500 }
    );
  }
}


/* =========================================================
   UPDATE EVENT
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
      date,
      time,
      venue,
    } = body;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required." },
        { status: 400 }
      );
    }

    if (
      !title ||
      !image ||
      !date ||
      !time ||
      !venue
    ) {
      return NextResponse.json(
        {
          message:
            "Title, image, date, time and venue are required.",
        },
        { status: 400 }
      );
    }

    const event = await prisma.event.update({
      where: {
        id,
      },
      data: {
        title: title.trim(),
        image: image.trim(),
        date: new Date(date),
        time: time.trim(),
        venue: venue.trim(),
      },
    });

    return NextResponse.json({
      message: "Event updated successfully.",
      event,
    });
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to update event." },
      { status: 500 }
    );
  }
}


/* =========================================================
   DELETE EVENT
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
        { message: "Event ID is required." },
        { status: 400 }
      );
    }

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