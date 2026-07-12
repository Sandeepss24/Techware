"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, MotionValue } from "framer-motion";
import { Users, Scale, Briefcase, GraduationCap } from 'lucide-react';
import React from "react";

const BADGES = [
  { text: "Compliance & Mobility Teams", icon: Users, top: "45%", left: "2.5%", delay: 0 },
  { text: "Financial\nInstitutions", icon: Scale, top: "50%", left: "82.5%", delay: 0.2 },
  { text: "Immigration\nLaw Firms", icon: Scale, top: "2.5%", left: "50%", delay: 0.4 },
  { text: "HR & Recruitment Firms", icon: Briefcase, top: "97.5%", left: "25%", delay: 0.6 },
  { text: "Universities\n& Training\nInstitutes", icon: GraduationCap, top: "97.5%", left: "75%", delay: 0.8 },
];

const BadgeItem = ({ badge, counterRotation }: { badge: { text: string, icon: React.ElementType, top: string, left: string, delay: number }, counterRotation: MotionValue<number> }) => {
  return (
    <div
      className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style={{ top: badge.top, left: badge.left }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ opacity: { duration: 0.6, delay: badge.delay }, scale: { duration: 0.6, delay: badge.delay } }}
      >
        <motion.div style={{ rotate: counterRotation }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
            className="bg-white/95 backdrop-blur-md px-3 py-2 md:px-5 md:py-3 rounded-[20px] md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-white flex items-center gap-2 md:gap-3.5 hover:scale-105 transition-transform cursor-pointer w-max"
          >
            <div className="text-[#d9a826] flex-shrink-0">
              <badge.icon strokeWidth={1.5} className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <div className="text-[#444] font-medium text-[10px] md:text-[14.5px] leading-[1.15] md:leading-[1.2] text-left whitespace-pre-line">
              {badge.text}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function WhoItsFor() {
  const ref = useRef(null);
  const [isTextActive, setIsTextActive] = useState(false);
  useInView(ref, { once: true, margin: "-100px" });

  // Track scroll on the badges container specifically
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Calculate rotations:
  // 0.0 -> 0.4: Entry rotation as the section scrolls into view (top of viewport)
  // 0.4 -> 1.0: Pinned sticky scrolling rotation
  const scrollRotation = useTransform(scrollYProgress, [0, 0.4, 1], [-90, 0, 360]);
  const counterRotation = useTransform(scrollRotation, r => -r);

  return (
    <section
      id="solution"
      className="relative flex flex-col items-center justify-start pt-16 lg:pt-32 pb-10 lg:pb-20 relative overflow-hidden -mt-[250px] lg:-mt-[350px] z-50"
    >
      {/* Background Graphic Image (contains the wavy top border) */}
      <div className="absolute top-[0rem] left-4 right-4 md:left-10 md:right-10 bottom-0 pointer-events-none z-0">
        <Image
          src="/assets/images/who_it_is_for_gradient.png"
          alt="Section Background"
          fill
          className="object-fill object-top"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      {/* Intro Text Section */}
      <div
        className="max-w-7xl w-full mx-auto px-8 md:px-12 text-left mb-20 lg:mb-40 mt-[150px] lg:mt-[300px] cursor-pointer relative z-10"
        onClick={() => setIsTextActive(!isTextActive)}
      >
        <h2 className={`text-4xl lg:text-5xl xl:text-[3.7rem] font-sans font-light tracking-tight leading-[1.1] mb-4 transition-colors duration-1000 ease-in-out ${isTextActive ? 'text-[#222]' : 'text-[#c4c4c4]'}`}>
          PDFs get forged. Emails get lost. Manual checks create liability.
        </h2>
        <p className={`text-4xl lg:text-5xl xl:text-[3.7rem] font-sans font-light tracking-tight leading-[1.1] max-w-[100%] transition-colors duration-1000 ease-in-out delay-150 ${isTextActive ? 'text-[#222]' : 'text-[#c4c4c4]'}`}>
          Lorem replaces static documents with cryptographically signed credentials issued directly from the source, with a full audit trail.
        </p>
      </div>

      <div id="who-its-for" className="text-center mb-10 lg:mb-24 z-10 relative px-4 md:px-8">
        <h3 className="text-[#f4c842] font-semibold tracking-widest text-[10px] uppercase mb-4 flex items-center justify-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#f4c842]"></span> Who It&apos;s For
        </h3>
        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[3.2rem] font-sans font-medium text-[#222] mb-4 max-w-2xl mx-auto leading-[1.1] tracking-tight">
          Built for workflows where <br className="hidden md:block" /> trust is non-negotiable.
        </h2>
        <p className="text-[13px] text-gray-500 font-serif">
          Wherever credentials matter, Lorem handles the verification
        </p>
      </div>

      {/* Orbiting Badges Area - Pinned scroll wrapper */}
      <div ref={ref} className="relative w-full h-[80vh] lg:h-[140vh] z-10">
        <div className="sticky top-[15vh] lg:top-0 w-full h-[50vh] lg:h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-8">

          <div className="relative w-full max-w-[calc(100vw-9rem)] sm:max-w-[calc(100vw-12rem)] md:max-w-[min(42rem,80vh,calc(100vw-16rem))] aspect-square flex items-center justify-center pointer-events-none z-10">

            {/* Outer Ring */}
            <div className="absolute w-[95%] h-[95%] rounded-[4rem] md:rounded-[6rem] border-[3px] border-white/80 z-10" />

            {/* Middle Ring */}
            <div className="absolute w-[65%] h-[65%] rounded-[3rem] md:rounded-[4.5rem] border-[3px] border-white/80 z-10" />

            {/* Inner Glow Box */}
            <div className="absolute w-[40%] h-[40%] rounded-[2rem] md:rounded-[3.5rem] border-[3px] border-white shadow-[0_0_80px_rgba(244,200,66,0.15)] overflow-hidden flex items-center justify-center z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fde69d_0%,_rgba(255,255,255,0.7)_70%,_rgba(255,255,255,0.9)_100%)] opacity-90" />
            </div>

            {/* Central Logo */}
            <div className="relative z-20 w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-[1.3rem] shadow-md border-2 border-white flex items-center justify-center pointer-events-auto">
              <div className="relative w-8 h-8 md:w-10 md:h-10 opacity-90">
                <Image src="/assets/icons/logo.png" alt="Brand Logo" fill className="object-contain" />
              </div>
            </div>

            <motion.div
              style={{ rotate: scrollRotation }}
              className="absolute inset-0 flex items-center justify-center z-30"
            >
              {/* Static Floating Badges (they counter-rotate to stay upright) */}
              {BADGES.map((badge) => (
                <BadgeItem key={badge.text} badge={badge} counterRotation={counterRotation} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
