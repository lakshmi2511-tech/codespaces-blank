const portfolioItems = [
  {
    title: "Bridal Look",
    category: "Bridal",
  },
  {
    title: "Reception Look",
    category: "Reception",
  },
  {
    title: "Engagement Look",
    category: "Engagement",
  },
  {
    title: "Party Look",
    category: "Party",
  },
  {
    title: "Traditional Look",
    category: "Traditional",
  },
  {
    title: "Contemporary Look",
    category: "Modern",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Our Work
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
            Looks created for unforgettable moments
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore some of the makeup styles created for weddings,
            celebrations and special occasions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-stone-200 transition group-hover:bg-stone-300">
                <span className="text-sm font-medium text-gray-500">
                  {item.title}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {item.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}