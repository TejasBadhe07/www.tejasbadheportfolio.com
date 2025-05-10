import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaBriefcase, 
  FaCode, 
  FaBlog, 
  FaEnvelope, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaEye,
  FaComments,
  FaProjectDiagram,
  FaStar,
  FaEdit,
  FaPlus,
  FaComment,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaDownload,
  FaSave,
  FaImage,
  FaLink,
  FaAward,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaClock
} from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const mainContentRef = useRef(null);
  const { section = 'overview' } = useParams();
  const { portfolioData, updatePortfolioSection, updatePortfolioItem } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    bio: '',
    social: {
      linkedin: '',
      github: '',
      twitter: ''
    }
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(null);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    period: '',
    location: '',
    type: 'current',
    description: '',
    achievements: [''],
    technologies: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({
    category: '',
    name: '',
    level: 50,
    years: 0,
    projects: 0
  });

  // Add contact section state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    social: {
      linkedin: '',
      github: '',
      twitter: ''
    },
    settings: {
      enableContactForm: true,
      emailNotifications: true,
      autoReply: false
    },
    autoReplyMessage: "Thank you for reaching out! I'll get back to you as soon as possible."
  });

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/dashboard');
    }

    // Get the current section from the URL path
    const path = location.pathname.split('/').pop();
    if (path && path !== 'home') {
      setActiveSection(path);
    }

    if (portfolioData?.about) {
      setFormData({
        name: portfolioData.about.name || '',
        title: portfolioData.about.title || '',
        location: portfolioData.about.location || '',
        email: portfolioData.about.email || '',
        bio: portfolioData.about.bio || '',
        social: {
          linkedin: portfolioData.about.social?.linkedin || '',
          github: portfolioData.about.social?.github || '',
          twitter: portfolioData.about.social?.twitter || ''
        }
      });
    }

    if (portfolioData?.contact) {
      setContactForm({
        name: portfolioData.contact.name || '',
        email: portfolioData.contact.email || '',
        phone: portfolioData.contact.phone || '',
        location: portfolioData.contact.location || '',
        social: {
          linkedin: portfolioData.contact.social?.linkedin || '',
          github: portfolioData.contact.social?.github || '',
          twitter: portfolioData.contact.social?.twitter || ''
        },
        settings: {
          enableContactForm: portfolioData.contact.settings?.enableContactForm ?? true,
          emailNotifications: portfolioData.contact.settings?.emailNotifications ?? true,
          autoReply: portfolioData.contact.settings?.autoReply ?? false
        },
        autoReplyMessage: portfolioData.contact.autoReplyMessage || "Thank you for reaching out! I'll get back to you as soon as possible."
      });
    }
  }, [navigate, location, portfolioData]);

  const handleSectionChange = (sectionId) => {
    // Save current scroll position before changing section
    if (mainContentRef.current) {
      localStorage.setItem('dashboardScrollPosition', mainContentRef.current.scrollTop);
    }
    
    setActiveSection(sectionId);
    navigate(`/dashboard/${sectionId}`);
  };

  // Restore scroll position after content render
  useEffect(() => {
    if (mainContentRef.current) {
      const savedPosition = localStorage.getItem('dashboardScrollPosition');
      if (savedPosition) {
        mainContentRef.current.scrollTop = parseInt(savedPosition);
        // Clear the saved position after restoring
        localStorage.removeItem('dashboardScrollPosition');
      }
    }
  }, [activeSection]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialPlatform = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialPlatform]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setPendingChanges({
      ...portfolioData.about,
      ...formData
    });
    setShowConfirmDialog(true);
  };

  const confirmSave = () => {
    if (pendingChanges) {
      if (pendingChanges.type === 'delete') {
        // Handle delete operation
        const { section, id } = pendingChanges;
        const updatedData = portfolioData[section].filter(item => item.id !== id);
        updatePortfolioSection(section, updatedData);
      } else if (pendingChanges.type === 'update') {
        // Handle update operation
        const { section, data } = pendingChanges;
        updatePortfolioSection(section, data);
      }
      setShowConfirmDialog(false);
      setPendingChanges(null);
    }
  };

  const cancelSave = () => {
    setShowConfirmDialog(false);
    setPendingChanges(null);
  };

  const handleExperienceInputChange = (e) => {
    const { name, value } = e.target;
    setExperienceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...experienceForm.achievements];
    newAchievements[index] = value;
    setExperienceForm(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const addAchievement = () => {
    setExperienceForm(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    const newAchievements = experienceForm.achievements.filter((_, i) => i !== index);
    setExperienceForm(prev => ({
      ...prev,
      achievements: newAchievements
    }));
  };

  const handleTechnologyChange = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newTech = e.target.value.trim();
      if (!experienceForm.technologies.includes(newTech)) {
        setExperienceForm(prev => ({
          ...prev,
          technologies: [...prev.technologies, newTech]
        }));
      }
      e.target.value = '';
    }
  };

  const removeTechnology = (techToRemove) => {
    setExperienceForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setExperienceForm({
      title: '',
      company: '',
      period: '',
      location: '',
      type: 'current',
      description: '',
      achievements: [''],
      technologies: []
    });
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setExperienceForm({
      ...experience,
      achievements: experience.achievements.length ? experience.achievements : ['']
    });
    setShowExperienceModal(true);
  };

  const handleDeleteExperience = (experienceId) => {
    const updatedExperiences = portfolioData.experience.filter(exp => exp.id !== experienceId);
    updatePortfolioSection('experience', updatedExperiences);
  };

  const handleSaveExperience = () => {
    const newExperience = {
      ...experienceForm,
      id: editingExperience?.id || Date.now(),
      achievements: experienceForm.achievements.filter(achievement => achievement.trim() !== '')
    };

    let updatedExperiences;
    if (editingExperience) {
      updatedExperiences = portfolioData.experience.map(exp => 
        exp.id === editingExperience.id ? newExperience : exp
      );
    } else {
      updatedExperiences = [...portfolioData.experience, newExperience];
    }

    updatePortfolioSection('experience', updatedExperiences);
    setShowExperienceModal(false);
    setEditingExperience(null);
  };

  const filteredExperiences = portfolioData?.experience?.filter(exp => {
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'current' && exp.type === 'current') ||
      (activeFilter === 'past' && exp.type === 'past');

    return matchesSearch && matchesFilter;
  }) || [];

  const menuItems = [
    { id: 'home', icon: <FaHome />, label: 'Dashboard' },
    { id: 'about', icon: <FaUser />, label: 'About' },
    { id: 'experience', icon: <FaBriefcase />, label: 'Experience' },
    { id: 'skills', icon: <FaCode />, label: 'Skills' },
    { id: 'blog', icon: <FaBlog />, label: 'Blog' },
    { id: 'contact', icon: <FaEnvelope />, label: 'Contact' },
  ];

  const stats = [
    { title: 'Total Views', value: '1,234', icon: <FaEye />, color: '#4CAF50' },
    { title: 'Comments', value: '56', icon: <FaComments />, color: '#2196F3' },
    { title: 'Projects', value: '12', icon: <FaCode />, color: '#9C27B0' },
    { title: 'Testimonials', value: '8', icon: <FaStar />, color: '#FF9800' },
  ];

  const recentActivities = [
    { id: 1, action: 'Updated About Section', time: '2 hours ago', icon: <FaEdit /> },
    { id: 2, action: 'Added New Project', time: '5 hours ago', icon: <FaPlus /> },
    { id: 3, action: 'Received New Comment', time: '1 day ago', icon: <FaComment /> },
  ];

  const handleSkillInputChange = (e) => {
    const { name, value } = e.target;
    setSkillForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    setEditingSkill(null);
    setSkillForm({
      category: '',
      name: '',
      level: 50,
      years: 0,
      projects: 0
    });
    setShowSkillModal(true);
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      category: skill.category,
      name: skill.name,
      level: skill.level,
      years: skill.years,
      projects: skill.projects
    });
    setShowSkillModal(true);
  };

  const handleDeleteSkill = (skillId) => {
    setPendingChanges({
      type: 'delete',
      section: 'skills',
      id: skillId
    });
    setShowConfirmDialog(true);
  };

  const handleSaveSkill = () => {
    if (!skillForm.category || !skillForm.name) {
      return;
    }

    const skillData = {
      ...skillForm,
      level: parseInt(skillForm.level),
      years: parseInt(skillForm.years),
      projects: parseInt(skillForm.projects)
    };

    if (editingSkill) {
      updatePortfolioItem('skills', editingSkill.id, skillData);
    } else {
      const newSkill = {
        id: Date.now(),
        ...skillData
      };
      const currentSkills = portfolioData.skills || [];
      updatePortfolioSection('skills', [...currentSkills, newSkill]);
    }

    setShowSkillModal(false);
    setEditingSkill(null);
    setSkillForm({
      category: '',
      name: '',
      level: 50,
      years: 0,
      projects: 0
    });
  };

  // Add contact section handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialPlatform = name.split('.')[1];
      setContactForm(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialPlatform]: value
        }
      }));
    } else {
      setContactForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSettingToggle = (setting) => {
    setContactForm(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }));
  };

  const handleSaveContact = () => {
    setPendingChanges({
      type: 'update',
      section: 'contact',
      data: contactForm
    });
    setShowConfirmDialog(true);
  };

  const renderContent = () => {
    switch (section) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="overview-header">
              <div className="header-left">
                <h1>Welcome Back!</h1>
                <p className="header-subtitle">Here's what's happening with your portfolio</p>
              </div>
              <div className="welcome-text">
                <FaUser /> Admin
              </div>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stat-icon" style={{ background: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="stat-info">
                    <h3>{stat.value}</h3>
                    <p>{stat.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="dashboard-grid">
              <div className="recent-activity">
                <div className="section-header">
                  <h2>Recent Activity</h2>
                  <button className="view-all">View All</button>
                </div>
                <div className="activity-list">
                  {recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      className="activity-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="activity-icon">{activity.icon}</div>
                      <div className="activity-details">
                        <h4>{activity.action}</h4>
                        <span>{activity.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="quick-actions">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="actions-grid">
                  <motion.button
                    className="action-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSectionChange('blog')}
                  >
                    <FaBlog />
                    <span>New Blog Post</span>
                  </motion.button>
                  <motion.button
                    className="action-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSectionChange('experience')}
                  >
                    <FaBriefcase />
                    <span>Add Experience</span>
                  </motion.button>
                  <motion.button
                    className="action-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSectionChange('skills')}
                  >
                    <FaCode />
                    <span>Update Skills</span>
                  </motion.button>
                  <motion.button
                    className="action-card"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSectionChange('about')}
                  >
                    <FaUser />
                    <span>Edit Profile</span>
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="performance-section">
              <div className="section-header">
                <h2>Portfolio Performance</h2>
                <div className="time-filter">
                  <button className="active">Week</button>
                  <button>Month</button>
                  <button>Year</button>
                </div>
              </div>
              <div className="performance-grid">
                <div className="performance-card">
                  <h3>Page Views</h3>
                  <div className="performance-chart">
                    {/* Placeholder for chart */}
                    <div className="chart-placeholder">
                      <div className="chart-bar" style={{ height: '60%' }}></div>
                      <div className="chart-bar" style={{ height: '80%' }}></div>
                      <div className="chart-bar" style={{ height: '40%' }}></div>
                      <div className="chart-bar" style={{ height: '90%' }}></div>
                      <div className="chart-bar" style={{ height: '70%' }}></div>
                      <div className="chart-bar" style={{ height: '50%' }}></div>
                      <div className="chart-bar" style={{ height: '85%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="performance-card">
                  <h3>Engagement</h3>
                  <div className="engagement-stats">
                    <div className="engagement-item">
                      <span className="label">Comments</span>
                      <span className="value">24</span>
                    </div>
                    <div className="engagement-item">
                      <span className="label">Shares</span>
                      <span className="value">12</span>
                    </div>
                    <div className="engagement-item">
                      <span className="label">Contact Form</span>
                      <span className="value">8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>About Section</h2>
              <div className="header-actions">
                <button className="save-button">
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
            
            <div className="about-tabs">
              <button className="tab-button active">Profile</button>
              <button className="tab-button">Education</button>
              <button className="tab-button">Awards</button>
            </div>

            <div className="about-content">
              <div className="profile-section">
                <div className="profile-image">
                  <div className="image-container">
                    <img src="/path-to-your-image.jpg" alt="Profile" />
                    <div className="image-overlay">
                      <button className="change-image">
                        <FaImage /> Change Photo
                      </button>
                    </div>
                  </div>
                  <div className="profile-stats">
                    <div className="stat">
                      <span className="stat-value">5+</span>
                      <span className="stat-label">Years Experience</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">50+</span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">100%</span>
                      <span className="stat-label">Satisfaction</span>
                    </div>
                  </div>
                </div>

                <div className="profile-info">
                  <div className="info-section">
                    <h3>Basic Information</h3>
                    <div className="info-grid">
                      <div className="info-group">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="info-group">
                        <label>Title</label>
                        <input 
                          type="text" 
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="info-group">
                        <label>Location</label>
                        <input 
                          type="text" 
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="info-group">
                        <label>Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <button className="save-button" onClick={handleSave}>Save Changes</button>
                  </div>

                  <div className="info-section">
                    <h3>Bio</h3>
                    <div className="info-group">
                      <textarea 
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                      />
                    </div>
                    <button className="save-button" onClick={handleSave}>Save Changes</button>
                  </div>

                  <div className="info-section">
                    <h3>Social Links</h3>
                    <div className="social-links-grid">
                      <div className="info-group">
                        <label><FaLinkedin /> LinkedIn</label>
                        <div className="input-with-icon">
                          <input 
                            type="url" 
                            name="social.linkedin"
                            value={formData.social.linkedin}
                            onChange={handleInputChange}
                          />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                      <div className="info-group">
                        <label><FaGithub /> GitHub</label>
                        <div className="input-with-icon">
                          <input 
                            type="url" 
                            name="social.github"
                            value={formData.social.github}
                            onChange={handleInputChange}
                          />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                      <div className="info-group">
                        <label><FaTwitter /> Twitter</label>
                        <div className="input-with-icon">
                          <input 
                            type="url" 
                            name="social.twitter"
                            value={formData.social.twitter}
                            onChange={handleInputChange}
                          />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                    </div>
                    <button className="save-button" onClick={handleSave}>Save Changes</button>
                  </div>

                  <div className="info-section">
                    <h3>Resume</h3>
                    <div className="resume-upload">
                      <div className="upload-area">
                        <FaDownload />
                        <p>Drag & drop your resume here or</p>
                        <button className="upload-button">Browse Files</button>
                      </div>
                      <div className="current-resume">
                        <span>Current: resume.pdf</span>
                        <button className="download-button"><FaDownload /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'experience':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Experience</h2>
              <div className="header-actions">
                <button className="add-button" onClick={handleAddExperience}>
                  <FaPlus /> Add Experience
                </button>
              </div>
            </div>

            <div className="experience-filters">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search experiences..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch />
              </div>
              <div className="filter-buttons">
                <button 
                  className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'current' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('current')}
                >
                  Current
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'past' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('past')}
                >
                  Past
                </button>
              </div>
            </div>

            <div className="experience-timeline">
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`experience-item ${exp.type}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="experience-header">
                    <div className="experience-title">
                      <h3>{exp.title}</h3>
                      <span className="company">{exp.company}</span>
                    </div>
                    <div className="experience-actions">
                      <button 
                        className="edit-button" 
                        title="Edit"
                        onClick={() => handleEditExperience(exp)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-button" 
                        title="Delete"
                        onClick={() => handleDeleteExperience(exp.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  <div className="experience-details">
                    <div className="detail-row">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <span>{exp.period}</span>
                      </div>
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="experience-description">
                      <p>{exp.description}</p>
                    </div>

                    <div className="experience-achievements">
                      <h4>Key Achievements</h4>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="experience-tech">
                      <h4>Technologies</h4>
                      <div className="tech-tags">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Experience Modal */}
            {showExperienceModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>{editingExperience ? 'Edit Experience' : 'Add New Experience'}</h3>
                  <form className="experience-form" onSubmit={(e) => { e.preventDefault(); handleSaveExperience(); }}>
                    <div className="form-group">
                      <label>Job Title</label>
                      <input 
                        type="text" 
                        name="title"
                        value={experienceForm.title}
                        onChange={handleExperienceInputChange}
                        placeholder="e.g., Senior Developer" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <input 
                        type="text" 
                        name="company"
                        value={experienceForm.company}
                        onChange={handleExperienceInputChange}
                        placeholder="e.g., Tech Corp" 
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Period</label>
                        <input 
                          type="text" 
                          name="period"
                          value={experienceForm.period}
                          onChange={handleExperienceInputChange}
                          placeholder="e.g., 2020 - Present" 
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input 
                          type="text" 
                          name="location"
                          value={experienceForm.location}
                          onChange={handleExperienceInputChange}
                          placeholder="e.g., New York, USA" 
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select 
                        name="type"
                        value={experienceForm.type}
                        onChange={handleExperienceInputChange}
                      >
                        <option value="current">Current</option>
                        <option value="past">Past</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        name="description"
                        value={experienceForm.description}
                        onChange={handleExperienceInputChange}
                        placeholder="Describe your role and responsibilities..." 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Achievements</label>
                      <div className="achievement-list">
                        {experienceForm.achievements.map((achievement, index) => (
                          <div key={index} className="achievement-item">
                            <input 
                              type="text" 
                              value={achievement}
                              onChange={(e) => handleAchievementChange(index, e.target.value)}
                              placeholder="Add an achievement" 
                            />
                            <button 
                              type="button" 
                              className="remove-achievement"
                              onClick={() => removeAchievement(index)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button 
                        type="button" 
                        className="add-achievement"
                        onClick={addAchievement}
                      >
                        <FaPlus /> Add Achievement
                      </button>
                    </div>
                    <div className="form-group">
                      <label>Technologies</label>
                      <div className="tech-input">
                        <input 
                          type="text" 
                          placeholder="Add technologies (press Enter)" 
                          onKeyDown={handleTechnologyChange}
                        />
                        <div className="tech-tags">
                          {experienceForm.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">
                              {tech} 
                              <button 
                                type="button" 
                                onClick={() => removeTechnology(tech)}
                              >
                                <FaTimes />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setShowExperienceModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-button">
                        {editingExperience ? 'Update Experience' : 'Save Experience'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'skills':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Skills</h2>
              <div className="header-actions">
                <button className="add-button" onClick={handleAddSkill}>
                  <FaPlus /> Add Skill
                </button>
              </div>
            </div>

            <div className="skills-filters">
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Search skills..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch />
              </div>
              <div className="filter-buttons">
                <button 
                  className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'Frontend' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Frontend')}
                >
                  Frontend
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'Backend' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Backend')}
                >
                  Backend
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'Database' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Database')}
                >
                  Database
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'DevOps' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('DevOps')}
                >
                  DevOps
                </button>
                <button 
                  className={`filter-button ${activeFilter === 'Mobile' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('Mobile')}
                >
                  Mobile
                </button>
              </div>
            </div>

            <div className="skills-container">
              {['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Other'].map(category => {
                const categorySkills = portfolioData.skills?.filter(skill => 
                  skill.category === category &&
                  (activeFilter === 'all' || activeFilter === category) &&
                  (searchQuery === '' || 
                    skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
                ) || [];

                if (categorySkills.length === 0 && activeFilter !== 'all') return null;

                return (
                  <div key={category} className="skill-category">
                    <h3 className="category-title">{category}</h3>
                    <div className="skills-grid">
                      {categorySkills.map((skill) => (
                        <motion.div
                          key={skill.id}
                          className="skill-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -5 }}
                        >
                          <div className="skill-header">
                            <div className="skill-title">
                              <h4>{skill.name}</h4>
                              <span className="skill-category">{skill.category}</span>
                            </div>
                            <div className="skill-actions">
                              <button 
                                className="edit-button" 
                                title="Edit"
                                onClick={() => handleEditSkill(skill)}
                              >
                                <FaEdit />
                              </button>
                              <button 
                                className="delete-button" 
                                title="Delete"
                                onClick={() => handleDeleteSkill(skill.id)}
                              >
                                <FaTimes />
                              </button>
                            </div>
                          </div>

                          <div className="skill-progress">
                            <div 
                              className="progress-bar"
                              style={{ width: `${skill.level}%` }}
                            />
                            <span className="progress-text">{skill.level}%</span>
                          </div>

                          <div className="skill-meta">
                            <div className="meta-item">
                              <FaProjectDiagram />
                              <span>{skill.projects} projects</span>
                            </div>
                            <div className="meta-item">
                              <FaClock />
                              <span>{skill.years} years</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Skill Modal */}
            {showSkillModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                  <form className="skill-form" onSubmit={(e) => { e.preventDefault(); handleSaveSkill(); }}>
                    <div className="form-group">
                      <label>Category</label>
                      <select 
                        name="category"
                        value={skillForm.category}
                        onChange={handleSkillInputChange}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Skill Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={skillForm.name}
                        onChange={handleSkillInputChange}
                        placeholder="e.g., React, Node.js" 
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Proficiency Level: {skillForm.level}%</label>
                      <input 
                        type="range" 
                        name="level"
                        min="0"
                        max="100"
                        value={skillForm.level}
                        onChange={handleSkillInputChange}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Years of Experience</label>
                        <input 
                          type="number" 
                          name="years"
                          min="0"
                          value={skillForm.years}
                          onChange={handleSkillInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Projects Completed</label>
                        <input 
                          type="number" 
                          name="projects"
                          min="0"
                          value={skillForm.projects}
                          onChange={handleSkillInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-button"
                        onClick={() => setShowSkillModal(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="save-button">
                        {editingSkill ? 'Update Skill' : 'Add Skill'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'blog':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Blog Posts</h2>
              <div className="header-actions">
                <button className="add-button">
                  <FaPlus /> New Post
                </button>
              </div>
            </div>

            <div className="blog-filters">
              <div className="search-box">
                <input type="text" placeholder="Search posts..." />
                <FaSearch />
              </div>
              <div className="filter-buttons">
                <button className="filter-button active">All</button>
                <button className="filter-button">Published</button>
                <button className="filter-button">Draft</button>
                <button className="filter-button">Archived</button>
              </div>
            </div>

            <div className="blog-grid">
              {[
                {
                  id: 1,
                  title: "Getting Started with React",
                  excerpt: "Learn the fundamentals of React and build your first application...",
                  date: "2024-03-15",
                  status: "Published",
                  views: 1234,
                  comments: 15,
                  category: "Development",
                  image: "https://via.placeholder.com/300x200"
                },
                {
                  id: 2,
                  title: "Advanced CSS Techniques",
                  excerpt: "Master modern CSS features and create stunning layouts...",
                  date: "2024-03-10",
                  status: "Published",
                  views: 856,
                  comments: 8,
                  category: "Design",
                  image: "https://via.placeholder.com/300x200"
                },
                {
                  id: 3,
                  title: "Node.js Best Practices",
                  excerpt: "Discover the best practices for building scalable Node.js applications...",
                  date: "2024-03-05",
                  status: "Draft",
                  views: 0,
                  comments: 0,
                  category: "Backend",
                  image: "https://via.placeholder.com/300x200"
                }
              ].map((post, index) => (
                <motion.div
                  key={post.id}
                  className="blog-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-category">{post.category}</div>
                  </div>
                  <div className="blog-content">
                    <div className="blog-header">
                      <h3>{post.title}</h3>
                      <div className="blog-actions">
                        <button className="edit-button" title="Edit">
                          <FaEdit />
                        </button>
                        <button className="delete-button" title="Delete">
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <div className="meta-item">
                        <FaCalendarAlt />
                        <span>{post.date}</span>
                      </div>
                      <div className="meta-item">
                        <FaEye />
                        <span>{post.views} views</span>
                      </div>
                      <div className="meta-item">
                        <FaComments />
                        <span>{post.comments} comments</span>
                      </div>
                    </div>
                    <div className="blog-status">
                      <span className={`status-badge ${post.status.toLowerCase()}`}>
                        {post.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Blog Post Modal (Hidden by default) */}
            <div className="modal" style={{ display: 'none' }}>
              <div className="modal-content">
                <h3>Create New Blog Post</h3>
                <form className="blog-form">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" placeholder="Enter post title" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select>
                      <option value="development">Development</option>
                      <option value="design">Design</option>
                      <option value="backend">Backend</option>
                      <option value="frontend">Frontend</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Featured Image</label>
                    <div className="image-upload">
                      <div className="upload-area">
                        <FaImage />
                        <p>Drag & drop your image here or</p>
                        <button type="button" className="upload-button">Browse Files</button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Content</label>
                    <textarea placeholder="Write your blog post content..." rows="10" />
                  </div>
                  <div className="form-group">
                    <label>Excerpt</label>
                    <textarea placeholder="Write a short excerpt..." rows="3" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Status</label>
                      <select>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Publish Date</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit" className="save-button">Publish Post</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Contact Information</h2>
              <div className="header-actions">
                <button className="save-button" onClick={handleSaveContact}>
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-card">
                <div className="card-header">
                  <h3>Basic Information</h3>
                </div>
                <div className="contact-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-with-icon">
                      <input 
                        type="email" 
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactInputChange}
                      />
                      <button className="icon-button" title="Copy">
                        <FaLink />
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <div className="input-with-icon">
                      <input 
                        type="tel" 
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactInputChange}
                      />
                      <button className="icon-button" title="Copy">
                        <FaLink />
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input 
                      type="text" 
                      name="location"
                      value={contactForm.location}
                      onChange={handleContactInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-header">
                  <h3>Social Media</h3>
                </div>
                <div className="social-links">
                  <div className="social-item">
                    <div className="social-icon">
                      <FaLinkedin />
                    </div>
                    <div className="social-info">
                      <label>LinkedIn</label>
                      <div className="input-with-icon">
                        <input 
                          type="url" 
                          name="social.linkedin"
                          value={contactForm.social.linkedin}
                          onChange={handleContactInputChange}
                        />
                        <button className="icon-button" title="Copy">
                          <FaLink />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="social-item">
                    <div className="social-icon">
                      <FaGithub />
                    </div>
                    <div className="social-info">
                      <label>GitHub</label>
                      <div className="input-with-icon">
                        <input 
                          type="url" 
                          name="social.github"
                          value={contactForm.social.github}
                          onChange={handleContactInputChange}
                        />
                        <button className="icon-button" title="Copy">
                          <FaLink />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="social-item">
                    <div className="social-icon">
                      <FaTwitter />
                    </div>
                    <div className="social-info">
                      <label>Twitter</label>
                      <div className="input-with-icon">
                        <input 
                          type="url" 
                          name="social.twitter"
                          value={contactForm.social.twitter}
                          onChange={handleContactInputChange}
                        />
                        <button className="icon-button" title="Copy">
                          <FaLink />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-header">
                  <h3>Contact Form Settings</h3>
                </div>
                <div className="form-settings">
                  <div className="setting-item">
                    <label className="switch-label">
                      <span>Enable Contact Form</span>
                      <div className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={contactForm.settings.enableContactForm}
                          onChange={() => handleSettingToggle('enableContactForm')}
                        />
                        <span className="slider"></span>
                      </div>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label className="switch-label">
                      <span>Email Notifications</span>
                      <div className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={contactForm.settings.emailNotifications}
                          onChange={() => handleSettingToggle('emailNotifications')}
                        />
                        <span className="slider"></span>
                      </div>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label className="switch-label">
                      <span>Auto-Reply</span>
                      <div className="toggle-switch">
                        <input 
                          type="checkbox" 
                          checked={contactForm.settings.autoReply}
                          onChange={() => handleSettingToggle('autoReply')}
                        />
                        <span className="slider"></span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="contact-card">
                <div className="card-header">
                  <h3>Auto-Reply Message</h3>
                </div>
                <div className="form-group">
                  <textarea 
                    name="autoReplyMessage"
                    value={contactForm.autoReplyMessage}
                    onChange={handleContactInputChange}
                    placeholder="Enter your auto-reply message..."
                    rows="4"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="content-section">
            <h2>Select a section from the sidebar</h2>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <motion.aside 
        className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleSectionChange(item.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <motion.button
          className="logout-button"
          onClick={handleLogout}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="dashboard-main" ref={mainContentRef}>
        {renderContent()}
      </main>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content confirmation-dialog">
            <h3>Confirm Changes</h3>
            <p>Are you sure you want to save these changes? This will update your portfolio information.</p>
            <div className="dialog-actions">
              <button className="cancel-button" onClick={cancelSave}>Cancel</button>
              <button className="confirm-button" onClick={confirmSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 