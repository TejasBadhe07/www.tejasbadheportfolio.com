import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/images/Tejas.jpeg'
import HeaderSocials from './HeaderSocials'

const Header = () => {
  return (
    <header>
      <div className="container header__container">
      <section id="home">
        <h5>Hello I'm</h5>
        <h1>Tejasss</h1>
        <h5 className ="text-light"> Fullstack Developer</h5>
        <CTA />
        <HeaderSocials/>
        
        
        <div className='me'>
          <img src={ME} alt="me" />            {/* IMAGE OF FIRST PAGE */} 
        </div>
        </section>

        <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header