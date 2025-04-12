import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import { motion } from 'framer-motion'

const TopSocials = () => {
  return (
    <div className='top__socials'>
      <motion.a 
        href="https://www.linkedin.com/in/tejasbadhe07/" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BsLinkedin/>
      </motion.a>
      <motion.a 
        href="https://github.com/TejasBadhe07" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithub/>
      </motion.a>
    </div>
  )
}

export default TopSocials 