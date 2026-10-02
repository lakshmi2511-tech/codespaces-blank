const services = [
  {
    title: "Bridal Makeup",
    description:
      "Complete bridal makeup designed to complement your special day.",
  },
  {
    title: "Reception Makeup",
    description:
      "Elegant makeup looks tailored for your reception celebration.",
  },
  {
    title: "Engagement Makeup",
    description:
      "A polished and beautiful look for your engagement ceremony.",
  },
  {
    title: "Party Makeup",
    description:
      "Glamorous looks for parties, celebrations and special occasions.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Our Services
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Makeup for every special moment
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose from a range of professional makeup services designed for
            your most memorable occasions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-gray-200 p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
                ✨
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {service.description}
              </p>

              <button className="mt-6 text-sm font-medium underline">
                Learn more →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}