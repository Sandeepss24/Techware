import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhoItsFor from "@/components/sections/WhoItsFor";
import PlatformPreview from "@/components/sections/PlatformPreview";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        {/* Second section background added below the iPhone section */}
        <div className="absolute left-4 right-4 md:left-10 md:right-10 z-40 -mt-[20vh] md:-mt-[35vh] pointer-events-none">
          <Image 
            src="/assets/images/second-section_bg2.png" 
            alt="Transition Background" 
            width={1920} 
            height={1080} 
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <WhoItsFor />
        <PlatformPreview />
      </main>
      <Footer />
    </>
  );
}
