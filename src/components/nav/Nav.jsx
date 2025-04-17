import React, { useState, useEffect } from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {BiMessageSquareDetail} from 'react-icons/bi'
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setActiveNav('#')
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
        onClick={scrollToTop} 
        className={activeNav === '#' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineHome/>
      </motion.a>
      <motion.a 
        href="#about" 
        onClick={() => setActiveNav('about')} 
        className={activeNav === 'about' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AiOutlineUser/>
      </motion.a>
      <motion.a 
        href="#experience" 
        onClick={() => setActiveNav('experience')} 
        className={activeNav === 'experience' ? 'active' : ''}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BiBook/>
      </motion.a>
      <motion.a 
        href="#contact" 
        onClick={() => setActiveNav('contact')} 
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