"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const CARDS = [
  {
    title: "Create verification cases instantly",
    description: "Add the applicant and issuer. Hit send. Lorem notifies everyone and tracks every step.",

    image: "/assets/images/card1.png",
  },
  {
    title: "Track real-time verification status",
    description: "See exactly where each case stands. No chasing emails. No manual follow-ups.",
    color: "bg-white",
    image: "/assets/images/card2.png",
  },
  {
    title: "View applicant approval activity",
    description: "Know the moment an applicant consents. Every action is logged, timestamped, and auditable.",
    color: "bg-white",
    image: "/assets/images/card3.png",
  },
  {
    title: "Access issuer-verified documents",
    description: "Signed at source. Delivered to your dashboard. Ready to reference whenever you need it.",
    color: "bg-white",
    image: "/assets/images/card4.png",
  },
];

import { MotionValue } from "framer-motion";

type CardData = {
  title: string;
  description: string;
  color?: string;
  image: string;
};

const Card = ({ card, index, progress }: { card: CardData, index: number, progress: MotionValue<number> }) => {
  // Calculate scale: cards scale down as you scroll past them
  // The first card scales down the most, the last card scales down the least
  const targetScale = 1 - (CARDS.length - 1 - index) * 0.04;
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);

  return (
    <div 
      className="sticky flex justify-center mb-16 md:mb-24"
      style={{ top: `calc(25vh + ${index * 40}px)` }}
    >
      <motion.div 
        className="w-full max-w-5xl rounded-[32px] p-[1px] shadow-[0_5px_40px_rgba(0,0,0,0.04)]"
        style={{ 
          background: 'linear-gradient(to bottom, #E0E0E0, #F0F0F0)',
          scale,
          transformOrigin: 'top center'
        }}
      >
        <div 
          className="w-full h-[65vh] rounded-[31px] flex flex-col lg:flex-row relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)' }}
        >
          {/* Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start items-center text-center lg:items-start lg:text-left p-8 md:p-16 z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-[2.6rem] leading-[1.15] font-sans font-normal text-[#222] mb-4 md:mb-6 pr-0 lg:pr-4 tracking-tight">
              {card.title}
            </h3>
            {card.description && (
              <p className="text-[15px] md:text-[19px] text-gray-500 font-serif italic leading-relaxed pr-0 lg:pr-8">
                {card.description}
              </p>
            )}
          </div>

          {/* Actual Image Asset (Anchored to bottom right on desktop, center bottom on mobile/tablet) */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-0 bottom-0 w-[90%] md:w-[75%] lg:w-[60%] h-[50%] md:h-[60%] lg:h-[85%] z-0 pointer-events-none">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-contain object-bottom lg:object-right-bottom drop-shadow-[-15px_-15px_40px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function PlatformPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="platform"
      ref={containerRef}
      className="relative bg-transparent pb-32 pt-20"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 w-full backdrop-blur-md pt-10 pb-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-[#f4c842] font-semibold tracking-widest text-[10px] uppercase mb-4 flex items-center justify-start gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#f4c842]"></span> Platform Preview
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] xl:text-5xl font-sans font-medium text-navy max-w-lg leading-tight">
              Verify documents from a single dashboard.
            </h2>
          </div>
          <p className="text-base md:text-lg text-navy/60 max-w-sm">
            One dashboard to request, track, and receive verified credentials, from anywhere in the world.
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        {CARDS.map((card, i) => (
          <Card
            key={i}
            card={card}
            index={i}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
