import React, { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { logout, loginSuccess } from '../redux/slices/authSlice';
import axios from 'axios';
import { FiMenu, FiX } from 'react-icons/fi'; // React Icons

import API from '../url';

const Navbar = () => {
  const navRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const admin = useSelector((state) => state.auth.admin);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API}/auth/verify`, {
          withCredentials: true,
        });
        if (res.data.success && res.data.admin) {
          dispatch(
            loginSuccess({
              admin: res.data.admin,
              token: res.data.token || null,
            })
          );
        }
      } catch (err) {
        console.log('Not authenticated:', err.response?.data || err.message);
        dispatch(logout());
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const links = navRef.current?.querySelectorAll('.nav-link');

    gsap.fromTo(
      links,
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      }
    );
  }, [isAuthenticated]);

  const links = [
    'home',
    'about',
    'education',
    'skills',
    'projects',
    'certifications',
    'contact',
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${API}/auth/logout`, {}, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[999] text-white border-b border-gray-800 shadow-md"
      style={{
        background: 'linear-gradient(135deg, #050505, #1a102c, #0f0f1f)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center font-sans"
      >
        <h1 className="text-xl font-bold text-cyan-400">Rupak.dev</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {links.map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth={true}
              spy={true}
              offset={-70}
              duration={500}
              activeClass="text-cyan-400 font-semibold"
              className="nav-link cursor-pointer text-gray-300 hover:text-white transition-colors duration-300"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </ScrollLink>
          ))}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="bg-cyan-600 px-2 py-[2px] rounded-full text-xs text-white shadow-md">
                Admin
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition duration-300 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/admin-login"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition duration-300 shadow-sm"
            >
              Admin/Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <FiX className="text-white text-2xl" />
            ) : (
              <FiMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {links.map((section) => (
              <ScrollLink
                key={section}
                to={section}
                smooth={true}
                spy={true}
                offset={-70}
                duration={500}
                activeClass="text-cyan-400 font-semibold"
                className="nav-link cursor-pointer text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            ))}

            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <span className="bg-cyan-600 w-fit px-2 py-[2px] rounded-full text-xs text-white shadow-md">
                  Admin
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin-login"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition duration-300 shadow-sm"
              >
                Admin/Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
