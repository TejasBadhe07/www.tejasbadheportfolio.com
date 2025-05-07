import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer>
      <motion.a 
        href="#" 
        className='footer__logo'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Tejas
      </motion.a>
      
      <ul className='permalinks'>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/dashboard" className="dashboard-link">Dashboard</Link></li>
      </ul>

      <div className='footer__socials'>
        <motion.a 
          href="https://m.facebook.com/tejas.badhe.756/e" 
          target='_blank' 
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFacebookF />
        </motion.a>
        <motion.a 
          href="https://x.com/TejasBadhe07" 
          target='_blank' 
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoLogoTwitter />
        </motion.a>
        <motion.a 
          href="https://www.linkedin.com/in/tejasbadhe07/" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsLinkedin />
        </motion.a>        
        <motion.a 
          href="https://github.com/TejasBadhe07" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub />
        </motion.a>        
        <motion.a 
          href="https://www.instagram.com/tejasbadhe07" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsInstagram />
        </motion.a>
      </div>

      <div className='footer__copyright'>
        <small>&copy; {new Date().getFullYear()} Tejas Website. All rights reserved</small>
      </div>
    </footer>
  );
}

export default Footer;
