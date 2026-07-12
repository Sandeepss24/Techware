"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animations mapped to scroll progress
  // 0 -> 0.2: Text fades out
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // 0.1 -> 0.4: Phone rises and stops
  const phoneY = useTransform(scrollYProgress, [0.1, 0.4], [500, 0]);

  // 0.3 -> 0.5: Glow fades in behind phone
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // 0.4 -> 0.6: Left card fades in and moves up
  const leftCardOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const leftCardY = useTransform(scrollYProgress, [0.4, 0.6], [100, 0]);

  // 0.5 -> 0.7: Right card fades in and moves up (staggered after left card)
  const rightCardOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const rightCardY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0]);

  // Text reveal animation (on initial load)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[300vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20">

        {/* Background Graphic */}
        <motion.div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: glowOpacity }}
        >
          <Image
            src="/assets/images/hero_gradient.png"
            alt="Background Shape"
            fill
            className="object-cover object-center !right-[-50%] !left-auto"
            priority
          />
        </motion.div>

        {/* Hero Text Content */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-start pt-[130px] md:pt-[18vh] z-40 px-4 text-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[5.5rem] font-sans font-normal text-[#1a1a1a] max-w-4xl tracking-tight leading-[1.05] pointer-events-auto"
          >
            Verification That <br /> <span className="bg-clip-text text-transparent font-medium" style={{ backgroundImage: 'linear-gradient(to left, #FFE592 0%, #FEE289 27.69%, #E7B100 100%)' }}>Starts At The Source.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 md:mt-6 xl:mt-8 text-[15px] md:text-[17px] text-navy/50 max-w-[550px] font-serif pointer-events-auto leading-relaxed"
          >
            Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum <br className="hidden md:block" /> lorem ipsum Lorem ipsum lorem ipsum
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 md:mt-8 xl:mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
          >
            <button
              className="px-8 py-3.5 text-white text-[15px] font-medium rounded-full hover:shadow-[0_8px_20px_rgba(240,139,29,0.3)] transition-all flex items-center gap-3 cursor-pointer"
              style={{ background: 'linear-gradient(136.24deg, #FFFFFF -29.87%, #E78F00 54.36%)' }}
            >
              Book a Demo
              <span className="w-6 h-6 rounded-full border-[1.5px] border-white/90 flex items-center justify-center ml-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </span>
            </button>
            <button className="px-8 py-3.5 bg-white text-[#F08B1D] text-[15px] font-medium rounded-full hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all flex items-center gap-2 cursor-pointer">
              See how it works
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="19" x2="19" y2="5"></line><polyline points="12 5 19 5 19 12"></polyline></svg>
            </button>
          </motion.div>
        </motion.div>

        {/* Phone Mockup Animation Area */}
        <div className="relative w-full max-w-5xl mx-auto h-full flex items-end justify-center pb-10 z-20 pointer-events-none px-4 md:px-8">

          {/* Center Phone Mockup (with nested cards) */}
          <motion.div
            className="relative h-[min(600px,70vh)] md:h-[min(800px,75vh)] lg:h-[min(1000px,85vh)] xl:h-[min(1200px,90vh)] aspect-[350/650] pointer-events-auto z-20"
            style={{ y: phoneY }}
          >
            <Image
              src="/assets/images/iPhone 14 Pro.png"
              alt="Phone Mockup"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />

            {/* Left Feature Card */}
            <motion.div
              className="absolute top-[5%] md:top-[15%] -left-[30%] md:-left-[45%] lg:-left-[55%] bg-gradient-to-r from-white/95 to-white/0 backdrop-blur-sm p-3 md:p-5 pr-8 md:pr-12 rounded-2xl md:rounded-3xl rounded-r-none shadow-[-15px_15px_40px_rgba(0,0,0,0.06)] border-l border-t border-b border-white/60 w-48 md:w-64 flex items-center gap-3 md:gap-5 pointer-events-auto z-30 scale-[0.75] sm:scale-90 md:scale-100 lg:scale-110 xl:scale-125 origin-right"
              style={{ opacity: leftCardOpacity, y: leftCardY }}
            >
              <div className="flex flex-col -space-y-2 md:-space-y-3">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-[2px] md:border-[2.5px] border-white shadow-sm z-40 overflow-hidden relative bg-gray-100">
                  <Image src="/assets/icons/profile1.svg" fill alt="Profile 1" className="object-cover" />
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-[2px] md:border-[2.5px] border-white shadow-sm z-30 overflow-hidden relative bg-gray-100">
                  <Image src="/assets/icons/profile2.svg" fill alt="Profile 2" className="object-cover" />
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-[2px] md:border-[2.5px] border-white shadow-sm z-20 overflow-hidden relative bg-gray-100">
                  <Image src="/assets/icons/profile3.svg" fill alt="Profile 3" className="object-cover" />
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-[2px] md:border-[2.5px] border-white shadow-sm z-10 overflow-hidden relative bg-gray-100">
                  <Image src="/assets/icons/profile4.svg" fill alt="Profile 4" className="object-cover" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1a1a] text-lg md:text-2xl tracking-tight">250+</h3>
                <p className="text-[9px] md:text-[12px] text-navy/50 font-serif mt-0.5 leading-tight">trusted organizations</p>
              </div>
            </motion.div>

            {/* Right Feature Card */}
            <motion.div
              className="absolute top-[35%] md:top-[45%] -right-[30%] md:-right-[45%] lg:-right-[55%] bg-gradient-to-l from-white/95 to-white/0 backdrop-blur-sm p-3 md:p-5 pl-8 md:pl-12 rounded-2xl md:rounded-3xl rounded-l-none shadow-[15px_15px_40px_rgba(0,0,0,0.06)] border-r border-t border-b border-white/60 w-48 md:w-64 flex items-center gap-3 md:gap-4 pointer-events-auto z-30 scale-[0.75] sm:scale-90 md:scale-100 lg:scale-110 xl:scale-125 origin-left"
              style={{ opacity: rightCardOpacity, y: rightCardY }}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-white/70 rounded-lg md:rounded-xl flex-shrink-0 flex items-center justify-center border-[1.5px] md:border-2 border-white shadow-sm backdrop-blur-md">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="#a0aab5" strokeWidth="1.5" className="md:w-[20px] md:h-[20px]"><rect x="3" y="3" width="14" height="14" rx="2" ry="2"></rect><path d="M7 21h14a2 2 0 0 0 2-2V7"></path></svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#1a1a1a] text-lg md:text-2xl tracking-tight">10,000+</h3>
                <p className="text-[9px] md:text-[12px] text-navy/50 font-serif mt-0.5 leading-tight">credentials verified<br />securely</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
