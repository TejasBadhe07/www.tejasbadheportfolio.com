import React from 'react'
import './about.css'
import ME from '../../assets/images/me-about.jpg'
import {FaAward, FaCode, FaGraduationCap} from 'react-icons/fa'
import {FiUsers} from 'react-icons/fi'
import {VscFolderLibrary} from 'react-icons/vsc'
import {BiCodeAlt} from 'react-icons/bi'



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
            <div className='about__me-overlay'>
              <div className='about__me-overlay-content'>
                <BiCodeAlt className='overlay-icon' />
                <span>Full Stack Developer</span>
              </div>
            </div>
          </div>
        </div>

        <div className='about__content'>
          <div className="about__cards">
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>1.5+ Years</small>
              <div className='card-details'>
                <span>Software Development</span>
                <span>AI/ML Projects</span>
              </div>
            </article>

            <article className='about__card'>
              <FaGraduationCap className='about__icon'/>
              <h5>Education</h5>
              <small>Bachelor's of Computer Engineering</small>
              <div className='card-details'>
                <span>Computer Engineering</span>
                <span>AI/ML Specialization</span>
              </div>
            </article>

            <article className='about__card'>
              <FaCode className='about__icon'/>
              <h5>Skills</h5>
              <small>Full Stack Development</small>
              <div className='card-details'>
                <span>React, Python</span>
                <span>TensorFlow, Keras</span>
              </div>
            </article>
          </div>

          <div className='about__text'>
            <p>
              I'm a passionate Full Stack Developer and AI/ML enthusiast with a strong foundation in creating innovative solutions. 
              My journey in technology has equipped me with expertise in both frontend and backend development, along with advanced 
              knowledge in machine learning and artificial intelligence.
            </p>
            <p>
              With 1.5+ years of experience, I've worked on diverse projects ranging from web applications to AI-powered solutions. 
              My technical stack includes React, Python, TensorFlow, and various modern web technologies. I'm particularly interested 
              in developing intelligent systems and creating seamless user experiences.
            </p>
            <div className='about__cta'>
              <a href="#contact" className='btn btn-primary'>Let's Talk</a>
              <a href="#portfolio" className='btn btn-secondary'>View My Work</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About