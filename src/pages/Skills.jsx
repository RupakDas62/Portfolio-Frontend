import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Skill categories with optional size for icons that need it
const skillSections = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: "/icons/java.svg" },
      { name: "JavaScript", icon: "/icons/js.svg" },
      { name: "C", icon: "/icons/C.svg" },
      { name: "Python", icon: "/icons/python.svg" },
    ],
  },
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML5", icon: "/icons/html.svg" },
      { name: "CSS3", icon: "/icons/css.svg" },
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Redux", icon: "/icons/redux.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", icon: "/icons/nodejs.svg" },
      { name: "Express.js", icon: "/icons/expressjs.png" },
      { name: "JWT", icon: "/icons/jwt.png", size: "w-20 h-8 object-contain" },
      { name: "Nodemailer", icon: "/icons/nodemailer.png", size: "w-20 h-8 object-contain" },
      { name: "Razorpay", icon: "/icons/razorpay.svg", size: "w-20 h-8 object-contain" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MongoDB", icon: "/icons/mongodb.svg", size: "w-48 h-12 scale-200 object-contain" },
    ],
  },
  {
    title: "Dev Tools",
    skills: [
      { name: "Git", icon: "/icons/github.svg" },
      { name: "Postman", icon: "/icons/postman.svg", size: "w-20 h-10 scale-200 object-contain" },
      { name: "npm", icon: "/icons/npm.svg" },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  let globalIndex = 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: i * 0.05,
            duration: 0.8,
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
      id="skills"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-br from-[#0b0b0b] via-[#1a0f2f] to-[#0f0f1f] text-white"
    >
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-12">
        Technical Skills
      </h2>

      <div className="max-w-6xl mx-auto space-y-16">
        {skillSections.map((section, secIdx) => (
          <div key={secIdx}>
            <h3 className="text-2xl font-semibold text-cyan-300 mb-6 border-l-4 border-cyan-500 pl-4">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {section.skills.map((skill, i) => {
                const index = globalIndex++;
                return (
                  <div
                    key={i}
                    ref={(el) => (cardRefs.current[index] = el)}
                    className="group bg-[#1a102c] p-5 rounded-xl border border-[#2c2c3a] hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-cyan-500/30 text-center"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className={`mx-auto mb-3 transition-transform duration-300 group-hover:scale-110 ${
                        skill.size || "w-12 h-12"
                      }`}
                    />
                    <p className="text-gray-300 text-sm">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
