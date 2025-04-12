import React from 'react';
import './footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'


const Footer = () => {
  return (
    <footer>
      <buttton href="#" className='footer__logo'>Tejas</buttton>
      <ul className='permalinks'>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className='footer__socials'>
        <a href="https://m.facebook.com/tejas.badhe.756/e" target='_blank' rel="noopener noreferrer">
            <FaFacebookF />
        </a>
        <a href="https://x.com/TejasBadhe07" target='_blank' rel="noopener noreferrer">
            <IoLogoTwitter />
        </a>
        <a href="https://www.linkedin.com/in/tejasbadhe07/" target="_blank" rel="noopener noreferrer">
             <BsLinkedin/>
         </a>        
         <a href="https://github.com/TejasBadhe07" target="_blank" rel="noopener noreferrer">
             <FaGithub/>
         </a>        
         <a href="https://www.instagram.com/tejasbadhe07" target="_blank" rel="noopener noreferrer">
             <BsInstagram/>
         </a>
    </div>

      <div className='footer__copyright'>
        <small>&copy; Tejas Website. All rights reserved</small>
      </div>
    </footer>
  );
}

export default Footer;
