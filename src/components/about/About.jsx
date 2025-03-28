import React from 'react'
import './about.css'
import ME from '../../assets/images/me-about.jpg'
// eslint-disable-next-line
import {FaAward, FaCode, FaGraduationCap} from 'react-icons/fa'
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
          {/* <div className="about__cards">
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>2.0+ Years</small>
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
          </div> */}

          <div className='about__text'>
          <p>
            I’m Tejas Badhe, a software developer with expertise in Python, Flask, React, HTML, CSS, and JavaScript. 
            I specialize in building scalable backend systems, designing RESTful APIs, and deploying applications using 
            AWS, Render, and CI/CD pipelines.
          </p>
          <p>
            My skill set also includes machine learning with TensorFlow, data analysis with Pandas and NumPy, and 
            computer vision using OpenCV. With a strong foundation in version control (Git, npm) and deployment 
            automation, I focus on creating efficient, secure, and maintainable solutions.
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