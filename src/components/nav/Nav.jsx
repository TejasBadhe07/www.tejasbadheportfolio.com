import React, { useState, useEffect } from 'react'
import './nav.css'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { BiBook, BiMessageSquareDetail, BiCodeAlt } from 'react-icons/bi'
import { FaBlog } from 'react-icons/fa'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'
import { FiSun, FiMoon } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { id: 'home', label: 'Home', icon: <AiOutlineHome /> },
  { id: 'about', label: 'About', icon: <AiOutlineUser /> },
  { id: 'experience', label: 'Experience', icon: <BiBook /> },
  { id: 'skills', label: 'Skills', icon: <BiCodeAlt /> },
  { id: 'portfolio', label: 'Projects', icon: <HiOutlineSquares2X2 /> },
  { id: 'blog', label: 'Blog', icon: <FaBlog /> },
  { id: 'contact', label: 'Contact', icon: <BiMessageSquareDetail /> }
]

const Nav = () => {
  const [activeNav, setActiveNav] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Highlight the section currently in view
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      const marker = window.innerHeight * 0.35
      let current = 'home'
      links.forEach(({ id }) => {
        if (id === 'home') return
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= marker) current = id
      })
      setActiveNav(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      className={`nav ${isScrolled ? 'scrolled' : ''}`}
      aria-label='Sections'
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {links.map(({ id, label, icon }) => (
        <motion.a
          key={id}
          href={`#${id}`}
          aria-label={label}
          data-label={label}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(id)
            setActiveNav(id)
          }}
          className={activeNav === id ? 'active' : ''}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon}
        </motion.a>
      ))}
      <span className='nav__divider' aria-hidden='true' />
      <motion.button
        type='button'
        className='nav__theme'
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        data-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9, rotate: 20 }}
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </motion.button>
    </motion.nav>
  )
}

export default Nav
