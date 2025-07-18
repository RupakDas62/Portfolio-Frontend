import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";

import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectIsAdmin } from "../redux/selectors/authSelector";

import API from "../url";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [certifications, setCertifications] = useState([]);
  const [activePDF, setActivePDF] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    year: "",
    image: null,
    pdf: null,
  });

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  // Fetch certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get(`${API}/certifications`);
        setCertifications(res.data);
      } catch (err) {
        console.error("Failed to fetch certifications:", err);
      }
    };
    fetchCertifications();
  }, []);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            delay: i * 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [certifications]);

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit certification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.platform || !formData.year || !formData.image || !formData.pdf) {
      alert("All fields are required!");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("platform", formData.platform);
    form.append("year", formData.year);
    form.append("image", formData.image);
    form.append("pdf", formData.pdf);

    try {
      const res = await axios.post("http://localhost:5000/api/certifications/add", form);
      setCertifications((prev) => [...prev, res.data]); // append new cert
      setShowModal(false);
      setFormData({ title: "", platform: "", year: "", image: null, pdf: null });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-b from-black to-[#0f0f1f] text-white"
    >
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-8">
        Certifications
      </h2>

      {/* Add Button */}
      
      {/* Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <div
            key={cert._id || index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="bg-[#1a102c] p-4 rounded-xl border border-[#2c2c3a] hover:shadow-cyan-500/20 transition duration-300 shadow-md cursor-pointer"
            onClick={() => setActivePDF(cert.pdf)}
          >
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{cert.platform}</span>
              <span>{cert.year}</span>
            </div>
          </div>
        ))}
        

      </div>
      {isAuthenticated && <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-lg transition"
        >
          + Add Certification
        </button>
      </div>}
      {/* Modal PDF Viewer */}
      {activePDF && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActivePDF(null)}
        >
          <div
            className="bg-black rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={activePDF}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              title="Certificate Viewer"
            />
          </div>
        </div>
      )}

      {/* Add Certification Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex justify-center items-center p-4">
          <div className="bg-[#1f1f2f] w-full max-w-lg p-6 rounded-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-white text-xl hover:text-red-400"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Add Certification</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="text"
                name="platform"
                placeholder="Platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <div>
                <label className="text-sm text-gray-300">Image (JPG/PNG)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-1 bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">PDF Certificate</label>
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="w-full p-1 bg-gray-800 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
