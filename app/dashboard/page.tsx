import BookingsDashboard from "@/components/dashboard/BookingsDashboard";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const bookings = await prisma.booking.findMany({
    select: {
      id: true,
      eventDate: true,
      startTime: true,
      endTime: true,
      location: true,
      status: true,
      client: {
        select: {
          name: true,
          phone: true,
        },
      },
      service: {
        select: {
          name: true,
        },
      },
      artist: {
        select: {
          name: true,
        },
      },
      branch: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      eventDate: "asc",
    },
  });

  const pendingCount = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            GlamSync Admin
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your bookings, clients and schedules.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {completedCount}
            </p>
          </div>
        </div>

        <BookingsDashboard bookings={bookings} />
      </div>
    </main>
  );
}