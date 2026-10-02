const branches = [
  {
    name: "Anna Nagar",
    location: "Chennai",
    description:
      "Our main studio offering bridal, reception and special occasion makeup.",
  },
  {
    name: "OMR",
    location: "Chennai",
    description:
      "Conveniently located for clients in and around OMR and nearby areas.",
  },
];

export default function Branches() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Our Locations
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Visit us at a location near you
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose the branch that works best for your special occasion.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="rounded-2xl border border-gray-200 p-8 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    {branch.location}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                    {branch.name}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
                  📍
                </div>
              </div>

              <p className="mt-5 leading-7 text-gray-600">
                {branch.description}
              </p>

              <button className="mt-6 text-sm font-medium underline blue">
                View Location →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}