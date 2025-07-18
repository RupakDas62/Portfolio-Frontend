import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Education from './pages/Education'
import AdminLogin from './pages/Auth/AdminLogin'

const App = () => {
  return (
    <Router>
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </>
        } />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
