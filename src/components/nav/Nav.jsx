import React, { useState, useEffect } from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {FaBlog} from 'react-icons/fa'
import { motion } from 'framer-motion'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    if (sectionId === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else {
      const element = document.querySelector(sectionId)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    }
  }

  return (
    <motion.nav 
      className={`nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.a 
        href="#home" 
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#home')
          setActiveNav('#')
        }}
        className={activeNav === '#' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineHome/>
      </motion.a>
      <motion.a 
        href="#about" 
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#about')
          setActiveNav('about')
        }}
        className={activeNav === 'about' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineUser/>
      </motion.a>
      <motion.a 
        href="#experience" 
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#experience')
          setActiveNav('experience')
        }}
        className={activeNav === 'experience' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BiBook/>
      </motion.a>
      <motion.a 
        href="#blog" 
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#blog')
          setActiveNav('blog')
        }}
        className={activeNav === 'blog' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBlog/>
      </motion.a>
      <motion.a 
        href="#contact" 
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('#contact')
          setActiveNav('contact')
        }}
        className={activeNav === 'contact' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BiMessageSquareDetail/>
      </motion.a>
    </motion.nav>
  )
}

export default Nav