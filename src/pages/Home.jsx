import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Typed from "typed.js";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Home = () => {
  const textRef = useRef();
  const imageRef = useRef();
  const typedRef = useRef();

  useEffect(() => {
    // GSAP entrance animation
    // console.log(isAuth)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.4, ease: "power3.out", delay: 0.3 }
      );
    });

    // Typed.js initialization
    const typed = new Typed(typedRef.current, {
      strings: [
        "Full Stack Developer 💻",
        "MERN Stack Enthusiast ⚛️",
        "GSAP Animation Lover ✨",
        "AI + ML Explorer 🤖",
        "UI/UX Perfectionist 🎯",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => {
      typed.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-20 bg-gradient-to-br from-[#0a0a0a] via-[#130f1d] to-[#0d0d18] text-white overflow-hidden">
      {/* Glow blob */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500 opacity-20 blur-[200px] rounded-full -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Text Section */}
      <div ref={textRef} className="flex-1 text-center md:text-left space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Hey, I’m Rupak Das
        </h1>

        <h2 className="text-xl md:text-2xl text-cyan-300 font-medium min-h-[40px]">
          <span ref={typedRef} />
        </h2>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto md:mx-0">
          Full-stack web developer blending clean UI/UX with dynamic logic. I build scalable MERN apps, integrate payment systems, and craft immersive animations using GSAP and React.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-5 pt-4">
          <a
            href="https://www.linkedin.com/in/rupak-das-ab4479254/"
            target="_blank"
            className="text-cyan-400 hover:text-white text-2xl transition hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/RupakDas62"
            target="_blank"
            className="text-cyan-400 hover:text-white text-2xl transition hover:scale-110"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Image Section */}
      <div ref={imageRef} className="flex-1 flex justify-center">
        <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-4 border-cyan-500 shadow-[0_0_50px_15px_rgba(0,255,255,0.1)]">
          <img
            src="/images/rupak-modified.png"
            alt="rupak"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
