export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">GlamSync</h1>

        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="rounded-lg bg-black px-5 py-2 text-sm text-white">
          Book Now
        </button>
      </div>
    </header>
  );
}