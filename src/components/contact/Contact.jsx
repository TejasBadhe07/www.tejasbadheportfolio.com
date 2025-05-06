import React, { useState, useRef } from 'react'
import './contact.css'
import {MdOutlineMail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {BsWhatsapp} from 'react-icons/bs'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'

const Contact = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm('service_ru0z89h', 'template_gvurn8d', form.current, 'Q6207eDGrt7F6eJpH');
      showNotification('success', 'Message sent successfully!');
      form.current.reset();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      showNotification('error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactOptions = [
    {
      icon: <MdOutlineMail className='contact__option-icon'/>,
      title: 'Email',
      value: 'tbadhe75@gmail.com',
      link: 'mailto:tbadhe75@gmail.com',
      text: 'Send a Message'
    },
    {
      icon: <RiMessengerLine className='contact__option-icon'/>,
      title: 'Messenger',
      value: 'tejas',
      link: 'https://m.me/tejas.badhe.756',
      text: 'Send a message'
    },
    {
      icon: <BsWhatsapp className='contact__option-icon'/>,
      title: 'Whatsapp',
      value: '+91 7719063683',
      link: 'https://api.whatsapp.com/send?phone=+917719063683',
      text: 'Send a Message'
    }
  ];

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          {contactOptions.map((option, index) => (
            <motion.article 
              key={index}
              className='contact__option'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {option.icon}
              <h4>{option.title}</h4>
              <h5>{option.value}</h5>
              <motion.a 
                href={option.link} 
                target='_blank' 
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.text}
              </motion.a>
            </motion.article>
          ))}
        </div>

        <motion.form 
          ref={form} 
          onSubmit={sendEmail} 
          className='contact__form'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className='form__group'>
            <input 
              type="text" 
              name='name' 
              placeholder='Your Full Name' 
              required 
              minLength="2"
              maxLength="50"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          
          <div className='form__group'>
            <input 
              type="email" 
              name='email' 
              placeholder='Your Email' 
              required 
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className='form__group'>
            <select 
              name="subject" 
              required
              value={formData.subject}
              onChange={handleInputChange}
            >
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
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <motion.button 
            type='submit' 
            className='btn btn-primary'
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </motion.form>

        {notification.show && (
          <motion.div 
            className={`notification ${notification.type}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {notification.message}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Contact