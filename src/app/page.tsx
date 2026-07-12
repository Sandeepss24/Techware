import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhoItsFor from "@/components/sections/WhoItsFor";
import PlatformPreview from "@/components/sections/PlatformPreview";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhoItsFor />
        <PlatformPreview />
      </main>
      <Footer />
    </>
  );
}
