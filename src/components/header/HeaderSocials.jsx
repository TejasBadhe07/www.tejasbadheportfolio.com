import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {BsInstagram} from 'react-icons/bs'

const HeaderSocials = () => {
  return (  
    <div className='header__socials'>
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
  )
}

export default HeaderSocials