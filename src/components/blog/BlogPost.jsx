import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaTags, FaArrowLeft } from 'react-icons/fa'
import { getBlogPost } from '../../services/blogService'
import './blog.css'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log('Fetching blog post with slug:', slug)
        const blogPost = await getBlogPost(slug)
        console.log('Received blog post:', blogPost)
        
        if (!blogPost) {
          console.log('No blog post found for slug:', slug)
          setError('Blog post not found')
          return
        }
        
        setPost(blogPost)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setError('Failed to load blog post. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <section className="blog-post">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="blog-post">
        <div className="container">
          <p className="error">{error}</p>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="blog-post">
        <div className="container">
          <p>Blog post not found</p>
        </div>
      </section>
    )
  }

  return (
    <section className="blog-post">
      <div className="container">
        <motion.button
          className="btn btn-primary back-button"
          onClick={() => navigate('/blog')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowLeft /> Back to Blog
        </motion.button>

        <motion.article
          className="blog-post__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="blog-post__header">
            <div className="blog-post__meta">
              <span>
                <FaCalendarAlt /> {new Date(post.fields.publishedDate).toLocaleDateString()}
              </span>
              <span>
                <FaTags /> {post.fields.readTime} min read
              </span>
            </div>
            <h1>{post.fields.title}</h1>
            <p className="blog-post__excerpt">{post.fields.excerpt}</p>
          </div>

          <div className="blog-post__image">
            <img 
              src={post.fields.coverImage?.fields?.file?.url} 
              alt={post.fields.title}
              onError={(e) => {
                e.target.src = 'path-to-default-image.jpg'
              }}
            />
          </div>

          <div className="blog-post__body">
            {post.fields.content.content.map((block, index) => {
              if (block.nodeType === 'paragraph') {
                return (
                  <p key={index} className="blog-post__paragraph">
                    {block.content.map((text, textIndex) => {
                      if (text.nodeType === 'text') {
                        return (
                          <span key={textIndex}>
                            {text.value}
                          </span>
                        )
                      }
                      return null
                    })}
                  </p>
                )
              }
              return null
            })}
          </div>

          <div className="blog-post__tags">
            {['Contentful', 'React', 'Portfolio'].map(tag => (
              <span key={tag} className="blog-post__tag">{tag}</span>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export default BlogPost 