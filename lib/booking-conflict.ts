import { prisma } from "@/lib/prisma";

type ConflictResult = {
  hasConflict: boolean;
  reason?: string;
};

export async function checkBookingConflict(
  bookingId: number
): Promise<ConflictResult> {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return {
      hasConflict: true,
      reason: "Booking not found.",
    };
  }

  const existingBookings = await prisma.booking.findMany({
    where: {
      artistId: booking.artistId,
      status: "CONFIRMED",
      id: {
        not: booking.id,
      },

      // Existing booking starts before the new booking ends
      startTime: {
        lt: booking.endTime,
      },

      // Existing booking ends after the new booking starts
      endTime: {
        gt: booking.startTime,
      },
    },
  });

  if (existingBookings.length > 0) {
    const existingBooking = existingBookings[0];

    const existingStart = existingBooking.startTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }
    );

    const existingEnd = existingBooking.endTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      }
    );

    return {
      hasConflict: true,
      reason: `Artist already has a confirmed booking from ${existingStart} to ${existingEnd}.`,
    };
  }

  return {
    hasConflict: false,
  };
}