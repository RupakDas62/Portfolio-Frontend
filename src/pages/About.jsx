import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Typed from "typed.js";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const typedRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            onEnter: () => {
              if (!typedRef.current._initialized) {
                typedRef.current._initialized = true;
                new Typed(typedRef.current, {
                  strings: [
                    "Frontend Enthusiast.",
                    "Full-Stack Developer.",
                    "Backend Explorer.",
                    "Tech-Driven Learner.",
                  ],
                  typeSpeed: 50,
                  backSpeed: 25,
                  backDelay: 1500,
                  loop: true,
                  showCursor: true,
                });
              }
            },
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0b0b0b] via-[#150f2b] to-[#0d0d1d] text-white"
    >
      <h2 className="text-center text-4xl font-bold text-cyan-400 mb-12">
        About Me
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center space-y-8" ref={imageRef}>
          <img
            src="https://avatars.githubusercontent.com/u/000000?v=4"
            alt="Rupak Avatar"
            className="w-60 h-60 object-cover rounded-full border-4 border-cyan-500 shadow-2xl"
          />

          <div
            ref={cardRef}
            className="w-full bg-[#1a1a2e] p-6 rounded-xl border border-cyan-500 shadow-md"
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-4 text-center">
              Hobbies & Achievements
            </h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
              <li>🏹 Archery (Played till Class 9)</li>
              <li>🥈 2× Silver & 🥉 1× Bronze in State & Inter&#8209;School</li>
              <li>♟️ Chess Enthusiast</li>
              <li>🏏 Cricket Lover</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div ref={textRef} className="space-y-6 text-center md:text-left">
          <span
            ref={typedRef}
            className="block text-xl text-cyan-300 font-mono h-8"
          ></span>

          <p className="text-gray-300 text-lg leading-relaxed">
            I'm <span className="text-cyan-400 font-semibold">Rupak Das</span>, a passionate full-stack web developer pursuing B.Tech in AI & ML at the University of Engineering and Management, Kolkata. I love building solid MERN stack apps that solve real-world problems.
          </p>

          <p className="text-gray-400 text-sm">
            My portfolio includes a real-time pizza delivery app, fire detection systems, mock interview assistant bots, and more. I enjoy backend logic, clean frontend UI, and scalable APIs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
