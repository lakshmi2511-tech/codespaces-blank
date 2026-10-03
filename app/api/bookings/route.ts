import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        client: true,
        artist: true,
        service: true,
        branch: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      service,
      branch,
      date,
      time,
      location,
      notes,
    } = body;

    if (
      !name ||
      !phone ||
      !service ||
      !branch ||
      !date ||
      !time ||
      !location
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required booking details.",
        },
        { status: 400 }
      );
    }

    const client = await prisma.client.upsert({
      where: {
        phone,
      },
      update: {
        name,
      },
      create: {
        name,
        phone,
      },
    });

    const branchRecord = await prisma.branch.findFirst({
      where: {
        name: branch,
      },
    });

    if (!branchRecord) {
      return NextResponse.json(
        {
          success: false,
          message: `Branch "${branch}" not found.`,
        },
        { status: 400 }
      );
    }

    const serviceRecord = await prisma.service.findFirst({
      where: {
        name: service,
      },
    });

    if (!serviceRecord) {
      return NextResponse.json(
        {
          success: false,
          message: `Service "${service}" not found.`,
        },
        { status: 400 }
      );
    }

    const artist = await prisma.artist.findFirst({
      where: {
        branchId: branchRecord.id,
      },
    });

    if (!artist) {
      return NextResponse.json(
        {
          success: false,
          message: "No artist is available for this branch.",
        },
        { status: 400 }
      );
    }

    const startTime = new Date(`${date}T${time}:00`);

    const endTime = new Date(
      startTime.getTime() + serviceRecord.duration * 60 * 1000
    );

    const booking = await prisma.booking.create({
      data: {
        clientId: client.id,
        artistId: artist.id,
        serviceId: serviceRecord.id,
        branchId: branchRecord.id,
        eventType: service,
        eventDate: startTime,
        startTime,
        endTime,
        location,
        status: "PENDING",
        notes: notes || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received successfully.",
        bookingId: booking.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the booking.",
      },
      { status: 500 }
    );
  }
}