import React from 'react'
import './ProjectModal.css'

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{project.title}</h2>
          <span className="project-category">{project.category}</span>
        </div>

        <div className="modal-body">
          <div className="modal-image">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="modal-details">
            <div className="project-description">
              <h3>About the Project</h3>
              <p>{project.description}</p>
            </div>

            <div className="project-technologies">
              <h3>Technologies Used</h3>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-features">
              <h3>Key Features</h3>
              <ul>
                {project.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-links">
              <a href={project.github} className="btn" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
              <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal 