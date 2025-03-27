import React from 'react'
import './skills.css'
import { FaReact, FaNodeJs, FaPython, FaDatabase } from 'react-icons/fa'
import { SiTensorflow, SiOpencv, SiJavascript, SiHtml5, SiCss3, SiMongodb, SiExpress } from 'react-icons/si'

const skillsData = {
  frontend: {
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: <FaReact />, level: 90 },
      { name: 'JavaScript', icon: <SiJavascript />, level: 85 },
      { name: 'HTML5', icon: <SiHtml5 />, level: 95 },
      { name: 'CSS3', icon: <SiCss3 />, level: 90 }
    ]
  },
  backend: {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
      { name: 'Express.js', icon: <SiExpress />, level: 80 },
      { name: 'MongoDB', icon: <SiMongodb />, level: 75 },
      { name: 'SQL', icon: <FaDatabase />, level: 70 }
    ]
  },
  ai: {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow />, level: 85 },
      { name: 'Python', icon: <FaPython />, level: 90 },
      { name: 'OpenCV', icon: <SiOpencv />, level: 80 },
      { name: 'Deep Learning', icon: <SiTensorflow />, level: 85 }
    ]
  }
}

const Skills = () => {
  return (
    <section id='skills'>
      <h5>What Skills I Have</h5>
      <h2>My Expertise</h2>

      <div className='container skills__container'>
        {Object.entries(skillsData).map(([category, data]) => (
          <div key={category} className='skills__category'>
            <h3>{data.title}</h3>
            <div className='skills__list'>
              {data.skills.map((skill, index) => (
                <div key={index} className='skill__item'>
                  <div className='skill__header'>
                    <span className='skill__icon'>{skill.icon}</span>
                    <h4>{skill.name}</h4>
                  </div>
                  <div className='skill__bar'>
                    <div 
                      className='skill__progress'
                      style={{ width: `${skill.level}%` }}
                    >
                      <span className='skill__percentage'>{skill.level}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills 