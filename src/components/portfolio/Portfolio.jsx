import React, { useState } from 'react'
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

const categories = ['All', 'Web Development', 'Computer Vision', 'Machine Learning', 'Deep Learning']

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeCategory === 'All' 
    ? data 
    : data.filter(project => project.category === activeCategory)

  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className='portfolio__filters'>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='container portfolio__container'>
        {filteredProjects.map(({id, image, title, description, technologies, github, demo}) => {
          return (
            <article 
              key={id} 
              className='portfolio__item'
              onClick={() => setSelectedProject(data.find(project => project.id === id))}
            >
              <div className='portfolio__item-image'>
                <img src={image} alt={title} />
              </div>
              <div className='portfolio__item-content'>
                <h3>{title}</h3>
                <p className='portfolio__item-description'>{description}</p>
                <div className='portfolio__item-technologies'>
                  {technologies.map((tech, index) => (
                    <span key={index} className='technology-tag'>{tech}</span>
                  ))}
                </div>
                <div className='portfolio__item-cta'>
                  <a href={github} className='btn' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>GitHub</a>
                  <a href={demo} className='btn btn-primary' target='_blank' rel='noopener noreferrer' onClick={e => e.stopPropagation()}>Live Demo</a>
                </div>
              </div>
            </article>
          )
        })}
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
/* <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a> =========== Add this line under Github for Live Demo*/

export default Portfolio