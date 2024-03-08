import React from 'react'
import './about.css'
import ME from '../../assets/images/Photo1_.jpeg'
import {FaAward} from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'



// eslint-disable-next-line
{/*  ################################  About Components   ############################################### */}
const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>
      <div className='container about__container'>
        <div className='about__me'>
          <div className='about__me-image'>
            <img src={ME} alt="Tejas's " />
          </div>
        </div>

        <div className='about__content'>
          <div className="about__cards">
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>1.5+ Years</small>
            </article>

            <article className='about__card'>
              <FiUsers className='about__icon'/>
              <h5>Education</h5>
              <small>Bachelor's of Computer Engineering</small>
            </article>

            <article className='about__card'>
              <VscFolderLibrary className='about__icon'/>
              <h5>Projects</h5>
              <small>5+ Completed</small>
            </article>
          </div>

          {/*  ################################  About Paragraph   ###############################################  */}
          <p>
          Results-driven Software Developer and AI/ML expert seeking a challenging position to
          create innovative solutions. Proficient in Python, React, and CSS, with expertise in data
          analysis, machine learning model development using TensorFlow and Keras, and
          statistical analysis. Committed to contributing to organizational success and continuous
          technical growth.
          </p>
          <a href="#contact" className='btn btn-primary'>Let's Talk</a>
        </div>
      </div>
    </section>
  )
}

export default About