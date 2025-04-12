import React, { useEffect, useState } from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/images/Photo1.jpeg'
import HeaderSocials from './HeaderSocials'
import { FaArrowDown } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header>
      <div className="container header__container">
        <motion.div 
          className="header__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <h5 className="header__subtitle">Hello I'm</h5>
          <h1 className="header__title">
            <span className="highlight">Tejas</span>
            <span className="wave">👋</span>
          </h1>
          <h5 className="header__subtitle text-light">Software Developer</h5>
          <p className="header__description">
            Passionate about creating innovative solutions with modern web technologies
          </p>
          <HeaderSocials />
          <CTA />
        </motion.div>

        <motion.div 
          className="me"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="me__image-container">
            <img src={ME} alt="me" />
            <div className="me__overlay">
              <div className="me__overlay-content">
                <span>Software Developer</span>
                <span>AI/ML Enthusiast</span>
              </div>
            </div>
          </div>
          <div className="me__background"></div>
        </motion.div>

        <motion.a 
          href="#contact" 
          className="scroll__down"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Scroll Down</span>
          <FaArrowDown className="scroll__icon" />
        </motion.a>
      </div>
    </header>
  )
}

export default Header