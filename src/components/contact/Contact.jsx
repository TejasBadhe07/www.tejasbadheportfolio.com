import React, { useRef, useState } from 'react';
import './contact.css';
import { MdOutlineEmail } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_8q3g3qg',
      'template_8q3g3qg',
      formRef.current,
      '8q3g3qg'
    )
      .then((result) => {
        showNotification('Message sent successfully!', 'success');
        formRef.current.reset();
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        showNotification('Failed to send message. Please try again.', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const contactOptions = [
    {
      icon: <MdOutlineEmail className="contact__option-icon" />,
      title: 'Email',
      subtitle: 'tejasbadhe@gmail.com',
      link: 'mailto:tejasbadhe@gmail.com'
    },
    {
      icon: <RiMessengerLine className="contact__option-icon" />,
      title: 'Messenger',
      subtitle: 'tejasbadhe',
      link: 'https://m.me/tejasbadhe'
    },
    {
      icon: <BsWhatsapp className="contact__option-icon" />,
      title: 'WhatsApp',
      subtitle: '+91 1234567890',
      link: 'https://wa.me/911234567890'
    }
  ];

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          {contactOptions.map((option, index) => (
            <motion.article
              key={index}
              className="contact__option"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {option.icon}
              <h4>{option.title}</h4>
              <h5>{option.subtitle}</h5>
              <a href={option.link} target="_blank" rel="noreferrer">
                Send a message
              </a>
            </motion.article>
          ))}
        </div>

        <motion.form
          ref={formRef}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="contact__form"
        >
          <div className="form__group">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group">
            <textarea
              name="message"
              rows="7"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>

      {notification.show && (
        <motion.div
          className={`notification ${notification.type}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {notification.message}
        </motion.div>
      )}
    </section>
  );
};

export default Contact;