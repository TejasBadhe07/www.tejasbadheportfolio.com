import React, { useState } from 'react'
import './ProjectModal.css'
import { FaGithub, FaExternalLinkAlt, FaUsers, FaChartLine, FaSmile, FaCalendarAlt, FaUserTie, FaUsersCog } from 'react-icons/fa'

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')
  if (!project) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>{project.title}</h2>
          <span className="project-category">{project.category}</span>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            Challenges & Solutions
          </button>
          <button 
            className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button 
            className={`tab-button ${activeTab === 'impact' ? 'active' : ''}`}
            onClick={() => setActiveTab('impact')}
          >
            Impact
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'overview' && (
            <>
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

                <div className="project-meta">
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>{project.timeline?.duration || 'Duration not specified'}</span>
                  </div>
                  <div className="meta-item">
                    <FaUserTie />
                    <span>{project.role || 'Role not specified'}</span>
                  </div>
                  <div className="meta-item">
                    <FaUsersCog />
                    <span>Team of {project.team?.size || 'N/A'}</span>
                  </div>
                </div>

                <div className="project-links">
                  <a href={project.github} className="btn" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> View on GitHub
                  </a>
                  <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            </>
          )}

          {activeTab === 'challenges' && (
            <div className="challenges-section">
              <div className="challenges-grid">
                <div className="challenges-column">
                  <h3>Challenges</h3>
                  <ul>
                    {project.challenges?.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    )) || <li>No challenges documented</li>}
                  </ul>
                </div>
                <div className="solutions-column">
                  <h3>Solutions</h3>
                  <ul>
                    {project.solutions?.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    )) || <li>No solutions documented</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="gallery-section">
              <div className="gallery-grid">
                {project.screenshots?.map((screenshot, index) => (
                  <div key={index} className="gallery-item">
                    <img src={screenshot.url} alt={screenshot.caption} />
                    <p>{screenshot.caption}</p>
                  </div>
                )) || <p>No screenshots available</p>}
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="impact-section">
              <div className="impact-grid">
                <div className="impact-card">
                  <FaUsers />
                  <h4>Users Reached</h4>
                  <p>{project.impact?.users || 'N/A'}</p>
                </div>
                <div className="impact-card">
                  <FaChartLine />
                  <h4>Efficiency Improvement</h4>
                  <p>{project.impact?.efficiency || 'N/A'}</p>
                </div>
                <div className="impact-card">
                  <FaSmile />
                  <h4>User Satisfaction</h4>
                  <p>{project.impact?.satisfaction || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal 