import React, { useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-[#0a0a0a] to-[#1a102c] text-gray-300 py-10 border-t border-cyan-700 relative z-50"
    >
      <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
        {/* Social Links */}
        <div className="flex justify-center gap-8 text-xl">
          <a
            href="https://www.facebook.com/rupak.das.762337"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/dasr16983/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/Rupak91377451"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaSquareXTwitter />
          </a>
          <a
            href="mailto:dasr16983@gmail.com"
            className="text-amber-400 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="text-sm text-cyan-400 hover:text-white transition hover:underline"
        >
          ↑ Back to Top
        </button>

        {/* Credits */}
        <p className="text-xs text-gray-500 mt-2">
          &copy; {new Date().getFullYear()} Rupak Das. Crafted with ❤️ using React + GSAP.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
