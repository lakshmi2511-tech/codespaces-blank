import { NextResponse } from "next/server";

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

    console.log("Booking received:", {
      name,
      phone,
      service,
      branch,
      date,
      time,
      location,
      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking request received successfully.",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the booking.",
      },
      { status: 500 }
    );
  }
}