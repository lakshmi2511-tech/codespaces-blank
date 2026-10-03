export default function Hero() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
          Beauty • Bookings • Simplicity
        </p>

        <h2 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Beauty meets smart scheduling.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Manage clients, bookings, artists and schedules effortlessly with
          GlamSync.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#booking"
            className="rounded-lg bg-black px-6 py-3 text-white"
          >
            Book an Appointment
          </a>

          <a
            href="#services"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-900"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}
