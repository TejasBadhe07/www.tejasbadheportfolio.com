import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './blog.css'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaTags, FaArrowRight, FaHome } from 'react-icons/fa'
import { getBlogPosts } from '../../services/blogService'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTag, setActiveTag] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Starting to fetch posts...')
        const blogPosts = await getBlogPosts()
        console.log('Posts fetched:', blogPosts)
        setPosts(blogPosts)
      } catch (error) {
        console.error('Error in fetchPosts:', error)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const allTags = ['All', 'Contentful', 'React', 'Portfolio'] // Default tags since they're not in the response

  const filteredPosts = activeTag === 'All' 
    ? posts 
    : posts.filter(post => post.fields.tags?.includes(activeTag))

  if (loading) {
    return (
      <section id='blog'>
        <div className="container blog__container">
          <motion.div 
            className="blog__navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Back to Home
            </motion.button>
          </motion.div>

          <h5>My Technical Articles</h5>
          <h2>Blog</h2>
          <div className="container blog__container">
            <p>Loading posts...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id='blog'>
        <div className="container blog__container">
          <motion.div 
            className="blog__navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Back to Home
            </motion.button>
          </motion.div>

          <h5>My Technical Articles</h5>
          <h2>Blog</h2>
          <div className="container blog__container">
            <p className="error">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section id='blog'>
        <div className="container blog__container">
          <motion.div 
            className="blog__navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome /> Back to Home
            </motion.button>
          </motion.div>

          <h5>My Technical Articles</h5>
          <h2>Blog</h2>
          <div className="container blog__container">
            <p>No blog posts found.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='blog'>
      <div className="container blog__container">
        <motion.div 
          className="blog__navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className="btn btn-primary"
            onClick={() => navigate(`${process.env.PUBLIC_URL}/`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> Back to Home
          </motion.button>
        </motion.div>

        <h5>My Technical Articles</h5>
        <h2>Blog</h2>

        <div className="blog__tags">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`blog__tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="blog__posts">
          {filteredPosts.map(post => {
            // Create a URL-friendly slug from the title if not provided
            const slug = post.fields.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')

            return (
              <motion.article
                key={post.sys.id}
                className="blog__post"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="blog__post-image">
                  <img 
                    src={post.fields.coverImage?.fields?.file?.url} 
                    alt={post.fields.title}
                    onError={(e) => {
                      e.target.src = 'path-to-default-image.jpg' // Add a default image path
                    }}
                  />
                </div>
                <div className="blog__post-content">
                  <div className="blog__post-meta">
                    <span>
                      <FaCalendarAlt /> {new Date(post.fields.publishedDate).toLocaleDateString()}
                    </span>
                    <span>
                      <FaTags /> {post.fields.readTime} min read
                    </span>
                  </div>
                  <h3>{post.fields.title}</h3>
                  <p>{post.fields.excerpt}</p>
                  <div className="blog__post-tags">
                    {allTags.filter(tag => tag !== 'All').map(tag => (
                      <span key={tag} className="blog__post-tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`${process.env.PUBLIC_URL}/blog/${slug}`} className="btn btn-primary">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Blog 