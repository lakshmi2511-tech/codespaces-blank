"use client";

import { useState } from "react";

type Booking = {
  id: number;
  client: {
    name: string;
    phone: string;
  };
  service: {
    name: string;
  };
  artist: {
    name: string;
  };
  branch: {
    name: string;
  };
  eventDate: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  status: string;
};

type Props = {
  bookings: Booking[];
};

export default function BookingsDashboard({ bookings }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const updateBookingStatus = async (
    bookingId: number,
    status: string
  ) => {
    try {
      setLoadingId(bookingId);
      setMessage("");

      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to update booking.");
        return;
      }

      setMessage(data.message);

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section className="mt-10">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Bookings
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer bookings and schedules.
        </p>
      </div>

      {message && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {message}
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
        {bookings.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            No bookings yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Client</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Service</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Date</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Time</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Artist</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Branch</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <p className="font-medium text-gray-900">
                        {booking.client.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.client.phone}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.service.name}
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.eventDate.toLocaleDateString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.startTime.toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.artist.name}
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.branch.name}
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-gray-900">
                      {booking.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "CONFIRMED"
                              )
                            }
                            disabled={loadingId === booking.id}
                            className="rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            {loadingId === booking.id
                              ? "Checking..."
                              : "Confirm"}
                          </button>

                          <button
                            onClick={() =>
                              updateBookingStatus(
                                booking.id,
                                "REJECTED"
                              )
                            }
                            disabled={loadingId === booking.id}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}