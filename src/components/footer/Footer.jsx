import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import { BsLinkedin, BsInstagram, BsArrowUpCircle } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Here you would typically handle the newsletter subscription
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer>
      <div className="wave-container">
        <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="var(--color-bg-variant)" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

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

      <div className="newsletter-section">
        <h3>Stay Updated</h3>
        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subscribe
          </motion.button>
        </form>
        {subscribed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="success-message"
          >
            Thanks for subscribing!
          </motion.p>
        )}
      </div>

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

      <motion.button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <BsArrowUpCircle />
      </motion.button>
    </footer>
  );
}

export default Footer;
