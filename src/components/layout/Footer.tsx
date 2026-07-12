"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const ref = useRef(null);

  // Trigger a bit early so video loads right before it scrolls into view
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });
  const prefersReducedMotion = useReducedMotion();
  const shouldPlayVideo = isInView && !prefersReducedMotion;

  return (
    <footer
      id="footer"
      ref={ref}
      className="relative min-h-[50vh] mx-4 bg-black text-white overflow-hidden rounded-t-[40px] pt-24 pb-12 px-8 md:px-16 mt-20"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-black">
        {shouldPlayVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none"
          >
            {/* Using the provided footer video asset */}
            <source src="/assets/video/footer_video.mp4" type="video/mp4" />
          </video>
        ) : (
          /* Static fallback for reduced motion or before loading */
          <div className="w-full h-full bg-gradient-to-t from-navy/40 to-black absolute inset-0" />
        )}

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/90 pointer-events-none" />
      </div>

      {/* Footer Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">

        {/* Product Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-sans font-medium mb-2">Product</h4>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Overview</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Solutions</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Process</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Platform Preview</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Request Demo</a>
        </div>

        {/* Company & Resources Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-sans font-medium mb-2">Company & Resources</h4>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">FAQs</a>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white font-sans font-medium mb-2">Contact</h4>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <MapPin size={16} className="text-white/40" />
            <span>USA</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <Phone size={16} className="text-white/40" />
            <span>+971 51 547 3625</span>
          </div>
        </div>

        {/* Connect Column & Copyright */}
        <div className="flex flex-col justify-between h-full min-h-[200px]">
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-sans font-medium mb-2">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white/80">
                <Mail size={14} />
              </a>
            </div>
          </div>

          <div className="mt-auto pt-10 text-white/30 text-xs font-sans">
            &copy; 2026 Lorem.app. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
