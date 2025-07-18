import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    degree: "B.Tech in CSE (AI & ML)",
    institution: "University of Engineering and Management, Kolkata",
    duration: "2022 – 2026",
    result: "CGPA: 8.68 (Up to 6th Sem)",
  },
  {
    degree: "Higher Secondary (Class 12)",
    institution: "New Alipore Multipurpose School",
    duration: "2022",
    result: "Percentage: 83%",
  },
  {
    degree: "Secondary (Class 10)",
    institution: "New Alipore Multipurpose School",
    duration: "2020",
    result: "Percentage: 88%",
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0c0c0c] via-[#1a102c] to-[#0f0f1f] text-white"
    >
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-12">
        Education
      </h2>

      <div className="max-w-4xl mx-auto space-y-8">
        {educationData.map((edu, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="bg-[#1a102c] border border-[#2c2c3a] rounded-lg p-6 shadow-md hover:shadow-cyan-500/20 transition duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-300">
              {edu.degree}
            </h3>
            <p className="text-gray-400">{edu.institution}</p>
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>{edu.duration}</span>
              <span>{edu.result}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
