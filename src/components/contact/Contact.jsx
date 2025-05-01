import React, { useState } from 'react'
import './contact.css'
import {MdOutlineMail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {BsWhatsapp} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com'

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm('service_ru0z89h', 'template_gvurn8d', form.current, 'Q6207eDGrt7F6eJpH');
      showNotification('success', 'Message sent successfully!');
      form.current.reset();
    } catch (error) {
      showNotification('error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          <article className='contact__option'>
            <MdOutlineMail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>tbadhe75@gmail.com</h5>
            <a href="mailto:tbadhe75@gmail.com" target='_blank' rel="noreferrer">Send a Message</a>
          </article>

          <article className='contact__option'>
            <RiMessengerLine className='contact__option-icon'/>
            <h4>Messenger</h4>
            <h5>tejas</h5>
            <a href="https://m.me/tejas.badhe.756" target='_blank' rel="noreferrer">Send a message</a>
          </article>

          <article className='contact__option'>
            <BsWhatsapp className='contact__option-icon'/>
            <h4>Whatsapp</h4>
            <h5>+91 7719063683</h5>
            <a href="https://api.whatsapp.com/send?phone=+917719063683" target='_blank' rel="noreferrer">Send a Message</a>
          </article>

          {/* <div className='contact__social'>
            <a href="https://linkedin.com/in/your-profile" target='_blank' rel="noreferrer">
              <FaLinkedin className='social-icon' />
            </a>
            <a href="https://github.com/your-username" target='_blank' rel="noreferrer">
              <FaGithub className='social-icon' />
            </a>
          </div> */}
        </div>

        <form ref={form} onSubmit={sendEmail} className='contact__form'>
          <div className='form__group'>
            <input 
              type="text" 
              name='name' 
              placeholder='Your Full Name' 
              required 
              minLength="2"
              maxLength="50"
            />
          </div>
          
          <div className='form__group'>
            <input 
              type="email" 
              name='email' 
              placeholder='Your Email' 
              required 
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div className='form__group'>
            <select name="subject" required>
              <option value="">Select Subject</option>
              <option value="job">Job Opportunity</option>
              <option value="project">Project Collaboration</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className='form__group'>
            <textarea 
              name="message" 
              rows="7" 
              placeholder='Your Message' 
              required
              minLength="10"
              maxLength="500"
            ></textarea>
          </div>

          <button 
            type='submit' 
            className='btn btn-primary'
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </div>
    </section>
  )
}

export default Contact