import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Branches from "@/components/home/Branches";
import Bookings from "@/components/home/Bookings"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Branches />
      <Bookings />
    </main>
  );
}