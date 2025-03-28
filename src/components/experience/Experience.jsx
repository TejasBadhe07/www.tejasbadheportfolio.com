import React, { useState } from 'react'
import './experience.css'
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { BsCalendarCheck } from 'react-icons/bs'

const experienceData = [
  {
    "id": 1,
    "title": "Software Developer",
    "company": "SCI-COM SOFTWARE INDIA PRIVATE LIMITED",
    "location": "Pune, India",
    "period": "Jan 2025 - Present & May 2023 - September 2023",
    "type": "work",
    "description": "Developing and maintaining full-stack applications, integrating machine learning models, and optimizing data pipelines for enhanced performance.",
    "achievements": [
      "Conducted in-depth data analysis using Pandas and NumPy, extracting key insights from diverse datasets.",
      "Developed end-to-end machine learning platforms with Python and TensorFlow, covering data preparation, prototyping, and deployment.",
      "Applied advanced data visualization techniques using Matplotlib and Seaborn to enhance model interpretability.",
      "Optimized machine learning models with TensorFlow, incorporating the latest industry advancements for performance improvements."
    ],
    "technologies": ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "AWS", "Pandas", "NumPy", "Matplotlib", "Seaborn"]
  },
  {
    "id": 2,
    "title": "Software Developer Intern",
    "company": "Anyu Biomedical LLP",
    "location": "Pune, India",
    "period": "Oct 2022 - May 2023",
    "type": "work",
    "description": "Conducted in-depth analysis of time series data and developed machine learning models for computer vision applications.",
    "achievements": [
      "Performed advanced statistical analysis and visualizations using Matplotlib and Seaborn.",
      "Engineered image data from time series data using OpenCV (CV2) for ML applications.",
      "Developed and optimized predictive models with TensorFlow and Keras, improving accuracy and efficiency.",
      "Handled end-to-end machine learning workflows, including data preprocessing, feature engineering, training, validation, and deployment."
    ],
    "technologies": ["Python", "TensorFlow", "OpenCV", "PyTorch", "Keras", "Matplotlib", "Seaborn"]
  },
  {
    id: 3,
    title: "Bachelor of Computer Engineering",
    company: "University Name",
    location: "Mumbai, India",
    period: "2018 - 2022",
    type: "education",
    description: "Graduated with First Class with Distinction. Specialized in Computer Engineering with focus on AI and Machine Learning.",
    achievements: [
      "CGPA: 8.5/10",
      "Led the college technical club",
      "Participated in multiple hackathons"
    ],
    technologies: ["C++", "Java", "Python", "Data Structures"]
  }
]

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work')
  const [expandedId, setExpandedId] = useState(null)

  const filteredExperience = experienceData.filter(exp => exp.type === activeTab)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id='experience'>
      <h5>What I've Done</h5>
      <h2>My Experience</h2>

      <div className='experience__tabs'>
        <button 
          className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          <FaBriefcase className='tab-icon' />
          Work Experience
        </button>
        <button 
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <FaGraduationCap className='tab-icon' />
          Education
        </button>
      </div>

      <div className='container experience__container'>
        <div className='experience__timeline'>
          {filteredExperience.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`timeline__item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className={`timeline__content ${expandedId === exp.id ? 'expanded' : ''}`}>
                <div className='timeline__header' onClick={() => toggleExpand(exp.id)}>
                  <div className='timeline__header-main'>
                    <h3>{exp.title}</h3>
                    <div className='timeline__company'>
                      <h4>{exp.company}</h4>
                      <span className='timeline__location'>{exp.location}</span>
                    </div>
                  </div>
                  <div className='timeline__header-meta'>
                    <span className='timeline__period'>
                      <BsCalendarCheck className='period-icon' />
                      {exp.period}
                    </span>
                    <button className='expand-btn'>
                      {expandedId === exp.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                <div className={`timeline__details ${expandedId === exp.id ? 'show' : ''}`}>
                  <p className='timeline__description'>{exp.description}</p>

                  <div className='timeline__achievements'>
                    <h5>Key Achievements</h5>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className='timeline__technologies'>
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className='tech-tag'>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience