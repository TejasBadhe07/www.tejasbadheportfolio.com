import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/images/Photo1.jpeg'
import { FaArrowDown } from 'react-icons/fa'
import { motion } from 'framer-motion'
import HeaderSocials from './HeaderSocials'
import { usePortfolio } from '../../context/PortfolioContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
})

const Header = () => {
  const { portfolioData } = usePortfolio();
  const title = portfolioData?.about?.title || 'Software Developer'

  return (
    <header id='home'>
      <div className="container header__container">
        <div className="header__content">
          <motion.p className="header__eyebrow" {...fadeUp(0)}>
            <span className="header__wave" aria-hidden="true">👋</span>
            Hello, I'm
          </motion.p>
          <motion.h1 className="header__title" {...fadeUp(0.1)}>
            <span className="text-gradient">{portfolioData?.about?.name || 'Tejas'}</span>
          </motion.h1>
          <motion.h2 className="header__role" {...fadeUp(0.2)}>
            {title} <span className="header__role-sep">·</span> AI/ML Enthusiast
          </motion.h2>
          <motion.p className="header__description" {...fadeUp(0.3)}>
            {portfolioData?.about?.bio || 'Passionate about creating innovative solutions with modern web technologies'}
          </motion.p>
          <motion.div {...fadeUp(0.4)}>
            <CTA />
          </motion.div>
          <motion.div {...fadeUp(0.5)}>
            <HeaderSocials />
          </motion.div>
        </div>

        <motion.div
          className="me"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="me__glow" aria-hidden="true" />
          <div className="me__image-container">
            <img src={ME} alt="Tejas Badhe" />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="scroll__down"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <span>Scroll</span>
        <FaArrowDown className="scroll__icon" />
      </motion.a>
    </header>
  )
}

export default Header
