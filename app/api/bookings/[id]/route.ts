import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkBookingConflict } from "@/lib/booking-conflict";

const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",

];

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const bookingId = Number(id);

    if (Number.isNaN(bookingId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking status.",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 }
      );
    }

    if (status === "CONFIRMED") {
      const conflict = await checkBookingConflict(bookingId);

      if (conflict.hasConflict) {
        return NextResponse.json(
          {
            success: false,
            message: conflict.reason,
          },
          { status: 409 }
        );
      }
      
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Booking ${status.toLowerCase()} successfully.`,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Booking status update failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the booking.",
      },
      { status: 500 }
    );
  }
}