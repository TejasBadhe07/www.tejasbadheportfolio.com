import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import './portfolio.css'
import ProjectModal from './ProjectModal'
import IMG1 from '../../assets/images/portfolio_images/library_management_system.jpg'
import IMG2 from '../../assets/images/portfolio_images/object_detection_car2.jpg'
import IMG3 from '../../assets/images/portfolio_images/handwriting_digit_recognition.jpg'
import IMG4 from '../../assets/images/portfolio_images/image_classification.png'
import IMG5 from '../../assets/images/portfolio_images/contentcreatorui.png'
// eslint-disable-next-line
import IMG6 from '../../assets/images/portfolio_images/quizmaster.png'


/* ==================================== PORTFOLIO PROJEC AND ITS LINKS IN THIS CLASS ========================================== */
const data = [
  // Newest project, shown as the large card at the top. The code is private, so there is no public link yet.
  {
    id: 7,
    isNew: true,
    status: 'In progress',
    image: null,
    title: 'HostTerrace: OTA Platform',
    description: 'One shared platform for companies that run several holiday properties. Each company gets its own booking website, an admin area for villas, bookings and team, and a channel manager that keeps prices and open or closed nights in sync with Airbnb and MakeMyTrip through Beds24.',
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Playwright'],
    category: 'Web Development',
    github: '',
    demo: '',
    features: [
      'Separate website and admin area for every company',
      'Channel manager that syncs prices and availability with Airbnb and MakeMyTrip (via Beds24)',
      'Each company only sees its own villas, bookings, team and history',
      'Passwordless email sign-in links',
      'Per-company branding: logo, colour and font pairing',
      'Platform admin area to approve new company sign-ups'
    ],
    role: 'Full Stack Developer'
  },

  {
    id: 1,
    image: IMG1,
    title: 'Library Management System',
    description: 'A comprehensive library management system that helps librarians manage books, members, and transactions efficiently. Features include book tracking, member management, and automated notifications.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Web Development',
    github: 'https://github.com/TejasBadhe07/Library-Management-System',
    demo: 'https://library-management-system-demo.herokuapp.com',
    features: [
      'User authentication and authorization',
      'Book inventory management',
      'Member registration and management',
      'Borrowing and return system',
      'Fine calculation and payment tracking',
      'Search and filter functionality',
      'Reports generation'
    ],
    challenges: [
      'Implementing real-time updates for book availability',
      'Designing an efficient search algorithm',
      'Managing concurrent user sessions'
    ],
    solutions: [
      'Used WebSocket for real-time updates',
      'Implemented Elasticsearch for fast search',
      'Utilized Redis for session management'
    ],
    impact: {
      users: '500+',
      efficiency: '40% improvement',
      satisfaction: '95% positive feedback'
    },
    screenshots: [
      { url: IMG1, caption: 'Dashboard Overview' },
      { url: IMG2, caption: 'Book Management' },
      { url: IMG3, caption: 'User Interface' }
    ],
    timeline: {
      start: 'Jan 2023',
      end: 'Mar 2023',
      duration: '3 months'
    },
    role: 'Full Stack Developer',
    team: {
      size: 3,
      roles: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer']
    }
  },

  {
    id: 2,
    image: IMG2,
    title: 'Object-Detection-Car',
    description: 'Real-time object detection system specifically designed for vehicle detection and classification. Uses advanced computer vision techniques to identify and track vehicles in video streams.',
    technologies: ['Python', 'OpenCV', 'YOLO', 'TensorFlow'],
    category: 'Computer Vision',
    github: 'https://github.com/TejasBadhe07/Object-Detection-Car',
    demo: 'https://object-detection-car-demo.herokuapp.com',
    features: [
      'Real-time vehicle detection',
      'Multiple vehicle tracking',
      'Vehicle classification',
      'Speed estimation',
      'Traffic analysis',
      'Custom model training support'
    ]
  },

  {
    id: 3,
    image: IMG3,
    title: 'Handwritten Digit Recognition',
    description: 'Machine learning model that can recognize handwritten digits with high accuracy. Built using the MNIST dataset and implements various neural network architectures for optimal performance.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'NumPy'],
    category: 'Machine Learning',
    github: 'https://github.com/TejasBadhe07/Handwritten-Digit-Recognization',
    demo: 'https://digit-recognition-demo.herokuapp.com',
    features: [
      'High accuracy digit recognition',
      'Support for various handwriting styles',
      'Real-time prediction',
      'Model performance visualization',
      'Easy integration with other applications',
      'Custom dataset support',
      'User-friendly interface'
    ]
  },

  {
    id: 4,
    image: IMG4,
    title: 'CNN for Image Classification',
    description: 'Deep learning project implementing Convolutional Neural Networks for image classification. Features custom architecture design and transfer learning capabilities for various image datasets.',
    technologies: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV'],
    category: 'Deep Learning',
    github: 'https://github.com/TejasBadhe07/CNN-for-Image-Classification',
    demo: 'https://cnn-classification-demo.herokuapp.com',
    features: [
      'Custom CNN architecture',
      'Transfer learning support',
      'Multiple dataset compatibility',
      'Real-time classification',
      'Model performance metrics',
      'Data augmentation techniques'
    ]
  },

  {
    id: 5,
    image: IMG5,
    title: 'Content Creator Streamline Process Website',
    description: 'A web application designed to help content creators streamline their workflow and manage their content creation process efficiently.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
    github: 'https://github.com/TejasBadhe07/CreatorStudio',
    demo: "https://content-creator-studio.vercel.app/",
    features: [
      'Content planning and scheduling',
      'Social media integration',
      'Analytics dashboard',
      'Content calendar',
      'Team collaboration tools',
      'Content performance tracking'
    ]
  },

  {
    id: 6,
    image: IMG6,
    title: 'Quiz App',
    description: 'An interactive quiz application that allows users to test their knowledge on various topics. Features include daily quizzes, leaderboards, and streak tracking to encourage regular participation.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Web Development',
    github: 'https://github.com/TejasBadhe07/Quiz-Master',
    demo: "https://quiz-master-tawny-pi.vercel.app/",
    features: [
      'Daily Quiz',
      'Quiz Leaderboard',
      'Streak Counter',
      'Responsive Design'
    ]
  }
]


const categories = ['All', ...new Set(data.map(project => project.category))]

const ProjectImage = ({ image, title }) => (
  image
    ? <img src={image} alt={title} loading='lazy' />
    : <div className='portfolio__item-placeholder' aria-hidden='true'>{title.split(':')[0]}</div>
)

const ProjectLinks = ({ github, demo }) => (
  <div className='portfolio__item-cta'>
    {github && (
      <a href={github} className='btn' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>
        <FaGithub /> Code
      </a>
    )}
    {demo && (
      <a href={demo} className='btn btn-primary' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>
        <FaExternalLinkAlt /> Live Demo
      </a>
    )}
  </div>
)

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const featured = data.find(project => project.isNew)
  const showFeatured = featured && (activeCategory === 'All' || activeCategory === featured.category)

  const filteredProjects = data.filter(project =>
    !project.isNew && (activeCategory === 'All' || project.category === activeCategory)
  )

  const openOnKey = (project) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setSelectedProject(project)
    }
  }

  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Projects</h2>

      <div className='portfolio__filters' role='tablist' aria-label='Filter projects'>
        {categories.map(category => (
          <button
            key={category}
            role='tab'
            aria-selected={activeCategory === category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='container'>
        {showFeatured && (
          <motion.article
            className='portfolio__featured'
            onClick={() => setSelectedProject(featured)}
            onKeyDown={openOnKey(featured)}
            tabIndex={0}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className='portfolio__featured-image'>
              <ProjectImage image={featured.image} title={featured.title} />
            </div>
            <div className='portfolio__featured-content'>
              <div className='portfolio__badges'>
                <span className='portfolio__badge'>New</span>
                {featured.status && <span className='portfolio__status'>{featured.status}</span>}
              </div>
              <span className='portfolio__category'>{featured.category}</span>
              <h3>{featured.title}</h3>
              <p>{featured.description}</p>
              <div className='portfolio__item-technologies'>
                {featured.technologies.map(tech => (
                  <span key={tech} className='technology-tag'>{tech}</span>
                ))}
              </div>
              <div className='portfolio__item-cta'>
                <button type='button' className='btn btn-primary'>View details</button>
                {featured.github && (
                  <a href={featured.github} className='btn' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>
                    <FaGithub /> Code
                  </a>
                )}
                {featured.demo && (
                  <a href={featured.demo} className='btn' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        )}

        <motion.div layout className='portfolio__container'>
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => {
              const { id, image, title, description, technologies, category, github, demo } = project
              return (
                <motion.article
                  layout
                  key={id}
                  className='portfolio__item'
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={openOnKey(project)}
                  tabIndex={0}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45 }}
                >
                  <div className='portfolio__item-image'>
                    <ProjectImage image={image} title={title} />
                    <span className='portfolio__item-view'>View details</span>
                  </div>
                  <div className='portfolio__item-content'>
                    <span className='portfolio__category'>{category}</span>
                    <h3>{title}</h3>
                    <p className='portfolio__item-description'>{description}</p>
                    <div className='portfolio__item-technologies'>
                      {technologies.map(tech => (
                        <span key={tech} className='technology-tag'>{tech}</span>
                      ))}
                    </div>
                    <ProjectLinks github={github} demo={demo} />
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  )
}

export default Portfolio
