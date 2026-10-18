import React, { useState, useEffect } from 'react'
import './ProjectModal.css'
import { FaGithub, FaExternalLinkAlt, FaUsers, FaChartLine, FaSmile, FaCalendarAlt, FaUserTie, FaUsersCog } from 'react-icons/fa'

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')

  // Close on Escape and stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (!project) return null

  // Only show tabs that have something to show
  const tabs = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'challenges', label: 'Challenges & Solutions', show: project.challenges?.length || project.solutions?.length },
    { id: 'gallery', label: 'Gallery', show: project.screenshots?.length },
    { id: 'impact', label: 'Impact', show: project.impact }
  ].filter(tab => tab.show)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label={project.title} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close" autoFocus>×</button>
        
        <div className="modal-header">
          <h2>{project.title}</h2>
          <span className="project-category">{project.category}</span>
        </div>

        {tabs.length > 1 && (
          <div className="modal-tabs" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div className="modal-body">
          {activeTab === 'overview' && (
            <>
              {project.image && (
                <div className="modal-image">
                  <img src={project.image} alt={project.title} />
                </div>
              )}

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

                {project.features?.length > 0 && (
                  <div className="project-features">
                    <h3>Key Features</h3>
                    <ul>
                      {project.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {(project.timeline?.duration || project.role || project.team?.size) && (
                  <div className="project-meta">
                    {project.timeline?.duration && (
                      <div className="meta-item">
                        <FaCalendarAlt />
                        <span>{project.timeline.duration}</span>
                      </div>
                    )}
                    {project.role && (
                      <div className="meta-item">
                        <FaUserTie />
                        <span>{project.role}</span>
                      </div>
                    )}
                    {project.team?.size && (
                      <div className="meta-item">
                        <FaUsersCog />
                        <span>Team of {project.team.size}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="project-links">
                  {project.github && (
                    <a href={project.github} className="btn" target="_blank" rel="noopener noreferrer">
                      <FaGithub /> View on GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
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