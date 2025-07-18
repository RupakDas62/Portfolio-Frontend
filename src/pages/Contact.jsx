import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import axios from "axios";

import API from "../url";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // State to hold form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State for status messages
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await axios.post(`${API}/contact/send`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setResponseMsg(res.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setResponseMsg(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen px-6 py-20 bg-gradient-to-b from-[#0f0f1f] to-black text-white"
    >
      <h2 className="text-4xl font-bold text-cyan-400 text-center mb-12">
        Contact Me
      </h2>

      <div
        className="max-w-3xl mx-auto bg-[#1a102c] p-8 rounded-2xl shadow-md border border-cyan-800"
        ref={formRef}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-2 bg-[#0f0f1f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 bg-[#0f0f1f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Tell me about your project..."
              className="w-full px-4 py-2 bg-[#0f0f1f] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {responseMsg && (
              <p className="mt-4 text-center text-sm">{responseMsg}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
