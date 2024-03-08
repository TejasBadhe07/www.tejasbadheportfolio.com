import React from 'react'
import './services.css'
import {BiCheck} from 'react-icons/bi'

const Services = () => {
  return (
    <section id='services'>
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className='container services__container'>
        <article className='service'>
          <div className='service__head'>
            <h3>UI/UX Design</h3>
          </div>
          <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon' />
              <p>User-Centered Design</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Wireframing and Prototyping</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Visual Design</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Usability Testing</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Responsive Design</p>
            </li>
          </ul>
        </article>
{/*====================================  END OF UI/UX  ==========================================*/}
<article className='service'>
          <div className='service__head'>
            <h3>Web Development</h3>
          </div>
          <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon' />
              <p>Frontend Development</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Backend Development:</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Database Management</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>API Development</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Deployment and Hosting</p>
            </li>

          </ul>
        </article>
{/*====================================  END OF Web Development  ==========================================*/}

        <article className='service'>
          <div className='service__head'>
            <h3>Building Predictive Models</h3>
          </div>
          <ul className='service__list'>
            <li>
              <BiCheck className='service__list-icon' />
              <p>Machine Learning Expertise</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Data Preprocessing</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>TensorFlow and Keras Mastery</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Model Tuning and Optimization</p>
            </li>

            <li>
              <BiCheck className='service__list-icon' />
              <p>Deployment and Integration</p>
            </li>
          </ul>
        </article>
{/*====================================  END of Content Creation  ==========================================*/}
      </div>
    </section>
  )
}

export default Services