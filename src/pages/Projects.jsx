import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectIsAdmin } from "../redux/selectors/authSelector";

import axios from "axios";
import API from "../url";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
    sampleVideo: "",
  });

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects`);
      console.log(res.data);
      setProjects(res.data);
      setLoading(false);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setLoading(false);
    }
  };

  fetchProjects();
  }, []);

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            delay: i * 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const techArray = formData.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      tech: techArray,
      github: formData.github,
      demo: formData.demo || "#",
      sampleVideo: formData.sampleVideo || "",
    };

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Failed to add project: " + (error.error || res.statusText));
        return;
      }

      const newProject = await res.json();
      setProjects((prev) => [...prev, newProject]);
      setFormData({
        title: "",
        description: "",
        tech: "",
        github: "",
        demo: "",
        sampleVideo: "",
      });
      setShowModal(false);
    } catch (err) {
      alert("Error adding project: " + err.message);
    }
  };

  // Close modal on backdrop click
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#0f0f1f] to-black text-white"
    >
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-12">
        Projects
      </h2>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2">
        {loading ? (
          <p className="text-center text-gray-400 col-span-full">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-center text-gray-400 col-span-full">
            No projects found.
          </p>
        ) : (
          projects.map((project, i) => (
            <div
              key={project._id || i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group bg-[#1a102c] p-6 rounded-xl border border-[#2c2c3a] shadow-md hover:shadow-cyan-500/30 transition duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-900/30 text-cyan-300 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-sm flex-wrap">
                {project.demo !== "#" && project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.sampleVideo && (
                  <a
                    href={project.sampleVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Demo Video
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Project Button */}
      {isAuthenticated && <div className="max-w-6xl mx-auto mt-10 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold transition"
        >
          Add New Project
        </button>
      </div>}

      {/* Modal */}
      {showModal && (
        <div
          onClick={onBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
        >
          <div className="bg-[#1a102c] rounded-xl p-6 max-w-lg w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-cyan-400 hover:text-cyan-600 font-bold text-xl"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl mb-4 text-cyan-300 font-semibold">
              Add New Project
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title *"
                required
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />
              <input
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="GitHub URL *"
                required
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />
              <input
                name="demo"
                value={formData.demo}
                onChange={handleChange}
                placeholder="Demo URL"
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />
              <input
                name="sampleVideo"
                value={formData.sampleVideo}
                onChange={handleChange}
                placeholder="Sample Video URL"
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />
              <input
                name="tech"
                value={formData.tech}
                onChange={handleChange}
                placeholder="Tech Stack (comma separated) *"
                required
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description *"
                required
                rows={4}
                className="w-full p-2 rounded bg-[#0f0f1f] text-white border border-cyan-700"
              />

              <button
                type="submit"
                className="mt-4 w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded font-semibold"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
