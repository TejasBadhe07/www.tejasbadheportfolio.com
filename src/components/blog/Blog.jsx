import React, { useState } from 'react'
import './blog.css'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaTags, FaArrowRight } from 'react-icons/fa'

const blogData = [
  {
    id: 1,
    title: 'Building a Full-Stack Quiz Application with React and Node.js',
    excerpt: 'Learn how to create an interactive quiz application using modern web technologies. This article covers the complete development process from design to deployment.',
    date: 'March 15, 2024',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack'],
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '#'
  },
  {
    id: 2,
    title: 'Machine Learning in Web Development: A Practical Guide',
    excerpt: 'Explore how to integrate machine learning models into web applications. This guide covers TensorFlow.js, model deployment, and real-world applications.',
    date: 'March 10, 2024',
    tags: ['Machine Learning', 'TensorFlow', 'Web Development'],
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '#'
  },
  {
    id: 3,
    title: 'Optimizing React Performance: Best Practices and Tips',
    excerpt: 'Discover effective strategies to improve your React application\'s performance. Learn about code splitting, lazy loading, and other optimization techniques.',
    date: 'March 5, 2024',
    tags: ['React', 'Performance', 'JavaScript'],
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    link: '#'
  }
]

const Blog = () => {
  const [activeTag, setActiveTag] = useState('All')

  const allTags = ['All', ...new Set(blogData.flatMap(blog => blog.tags))]

  const filteredBlogs = activeTag === 'All' 
    ? blogData 
    : blogData.filter(blog => blog.tags.includes(activeTag))

  return (
    <section id='blog'>
      <h5>My Technical Articles</h5>
      <h2>Blog</h2>

      <div className='blog__filters'>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className='container blog__container'>
        {filteredBlogs.map(({id, title, excerpt, date, tags, readTime, image, link}) => (
          <motion.article 
            key={id} 
            className='blog__item'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className='blog__item-image'>
              <img src={image} alt={title} />
            </div>
            <div className='blog__item-content'>
              <div className='blog__item-meta'>
                <span className='blog__item-date'>
                  <FaCalendarAlt /> {date}
                </span>
                <span className='blog__item-readtime'>{readTime}</span>
              </div>
              <h3>{title}</h3>
              <p>{excerpt}</p>
              <div className='blog__item-tags'>
                <FaTags />
                {tags.map((tag, index) => (
                  <span key={index} className='tag'>{tag}</span>
                ))}
              </div>
              <a href={link} className='blog__item-link'>
                Read More <FaArrowRight />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default Blog 