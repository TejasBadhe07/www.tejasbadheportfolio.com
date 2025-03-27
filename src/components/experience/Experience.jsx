import React, { useState } from 'react'
import './experience.css'
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { BsCalendarCheck } from 'react-icons/bs'

const experienceData = [
  {
    id: 1,
    title: "Software Developer",
    company: "Tech Company",
    location: "Mumbai, India",
    period: "Jan 2023 - Present",
    type: "work",
    description: "Working on full-stack development projects using React, Node.js, and Python. Developing and maintaining web applications with modern technologies.",
    achievements: [
      "Led the development of a new feature that increased user engagement by 40%",
      "Implemented automated testing reducing bug reports by 25%",
      "Mentored junior developers and conducted code reviews"
    ],
    technologies: ["React", "Node.js", "Python", "MongoDB", "AWS"]
  },
  {
    id: 2,
    title: "Machine Learning Intern",
    company: "AI Solutions",
    location: "Bangalore, India",
    period: "Jun 2022 - Dec 2022",
    type: "work",
    description: "Worked on developing and optimizing machine learning models for computer vision applications.",
    achievements: [
      "Developed a custom CNN model achieving 95% accuracy",
      "Optimized model inference time by 30%",
      "Created automated data preprocessing pipeline"
    ],
    technologies: ["Python", "TensorFlow", "OpenCV", "PyTorch"]
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