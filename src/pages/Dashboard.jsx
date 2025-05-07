import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaSearch
} from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/dashboard');
  };

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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <div className="overview-header">
              <div className="header-left">
                <h1>Dashboard</h1>
                <p className="header-subtitle">Welcome back to your dashboard</p>
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
            <div className="recent-activity">
              <h2>Recent Activity</h2>
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
                        <input type="text" defaultValue="Tejas Badhe" />
                      </div>
                      <div className="info-group">
                        <label>Title</label>
                        <input type="text" defaultValue="Full Stack Developer" />
                      </div>
                      <div className="info-group">
                        <label>Location</label>
                        <input type="text" defaultValue="New York, USA" />
                      </div>
                      <div className="info-group">
                        <label>Email</label>
                        <input type="email" defaultValue="contact@example.com" />
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Bio</h3>
                    <div className="info-group">
                      <textarea 
                        defaultValue="Passionate developer with expertise in web development. Specializing in React, Node.js, and modern web technologies. Always eager to learn and adapt to new challenges."
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Social Links</h3>
                    <div className="social-links-grid">
                      <div className="info-group">
                        <label><FaLinkedin /> LinkedIn</label>
                        <div className="input-with-icon">
                          <input type="url" defaultValue="https://linkedin.com/in/yourprofile" />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                      <div className="info-group">
                        <label><FaGithub /> GitHub</label>
                        <div className="input-with-icon">
                          <input type="url" defaultValue="https://github.com/yourusername" />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                      <div className="info-group">
                        <label><FaTwitter /> Twitter</label>
                        <div className="input-with-icon">
                          <input type="url" defaultValue="https://twitter.com/yourhandle" />
                          <button className="icon-button"><FaLink /></button>
                        </div>
                      </div>
                    </div>
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
                <button className="add-button">
                  <FaPlus /> Add Experience
                </button>
              </div>
            </div>

            <div className="experience-filters">
              <div className="search-box">
                <input type="text" placeholder="Search experiences..." />
                <FaSearch />
              </div>
              <div className="filter-buttons">
                <button className="filter-button active">All</button>
                <button className="filter-button">Current</button>
                <button className="filter-button">Past</button>
              </div>
            </div>

            <div className="experience-timeline">
              {[
                {
                  id: 1,
                  title: "Senior Full Stack Developer",
                  company: "Tech Innovations Inc.",
                  period: "2022 - Present",
                  location: "New York, USA",
                  type: "current",
                  description: "Leading development team in building scalable web applications. Implementing modern technologies and best practices.",
                  achievements: [
                    "Reduced application load time by 40%",
                    "Implemented CI/CD pipeline",
                    "Mentored junior developers"
                  ],
                  technologies: ["React", "Node.js", "AWS", "Docker"]
                },
                {
                  id: 2,
                  title: "Full Stack Developer",
                  company: "Digital Solutions Ltd",
                  period: "2020 - 2022",
                  location: "San Francisco, USA",
                  type: "past",
                  description: "Developed and maintained multiple client projects. Collaborated with cross-functional teams.",
                  achievements: [
                    "Delivered 10+ client projects",
                    "Improved code quality by 30%",
                    "Introduced automated testing"
                  ],
                  technologies: ["Vue.js", "Python", "MongoDB", "Redis"]
                }
              ].map((exp, index) => (
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
                      <button className="edit-button" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-button" title="Delete">
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

            {/* Add Experience Modal (Hidden by default) */}
            <div className="modal" style={{ display: 'none' }}>
              <div className="modal-content">
                <h3>Add New Experience</h3>
                <form className="experience-form">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" placeholder="e.g., Senior Developer" />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" placeholder="e.g., Tech Corp" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="date" />
                    </div>
                    <div className="form-group">
                      <label>End Date</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" placeholder="e.g., New York, USA" />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your role and responsibilities..." />
                  </div>
                  <div className="form-group">
                    <label>Achievements</label>
                    <div className="achievement-list">
                      <div className="achievement-item">
                        <input type="text" placeholder="Add an achievement" />
                        <button type="button" className="remove-achievement">
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    <button type="button" className="add-achievement">
                      <FaPlus /> Add Achievement
                    </button>
                  </div>
                  <div className="form-group">
                    <label>Technologies</label>
                    <div className="tech-input">
                      <input type="text" placeholder="Add technologies (press Enter)" />
                      <div className="tech-tags">
                        <span className="tech-tag">React <FaTimes /></span>
                        <span className="tech-tag">Node.js <FaTimes /></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit" className="save-button">Save Experience</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Skills</h2>
              <div className="header-actions">
                <button className="add-button">
                  <FaPlus /> Add Skill
                </button>
              </div>
            </div>

            <div className="skills-filters">
              <div className="search-box">
                <input type="text" placeholder="Search skills..." />
                <FaSearch />
              </div>
              <div className="filter-buttons">
                <button className="filter-button active">All</button>
                <button className="filter-button">Frontend</button>
                <button className="filter-button">Backend</button>
                <button className="filter-button">Tools</button>
              </div>
            </div>

            <div className="skills-grid">
              {[
                {
                  category: "Frontend",
                  skills: [
                    { name: "React", level: 90, years: 3, projects: 15 },
                    { name: "JavaScript", level: 85, years: 4, projects: 20 },
                    { name: "HTML/CSS", level: 95, years: 5, projects: 25 }
                  ]
                },
                {
                  category: "Backend",
                  skills: [
                    { name: "Node.js", level: 80, years: 2, projects: 10 },
                    { name: "Python", level: 75, years: 2, projects: 8 },
                    { name: "SQL", level: 85, years: 3, projects: 12 }
                  ]
                },
                {
                  category: "Tools",
                  skills: [
                    { name: "Git", level: 90, years: 3, projects: 20 },
                    { name: "Docker", level: 70, years: 1, projects: 5 },
                    { name: "AWS", level: 65, years: 1, projects: 4 }
                  ]
                }
              ].map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  className="skill-category"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                >
                  <h3 className="category-title">{category.category}</h3>
                  <div className="category-skills">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="skill-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: skillIndex * 0.1 }}
                      >
                        <div className="skill-header">
                          <div className="skill-title">
                            <h4>{skill.name}</h4>
                            <span className="skill-years">{skill.years} years</span>
                          </div>
                          <div className="skill-actions">
                            <button className="edit-button" title="Edit">
                              <FaEdit />
                            </button>
                            <button className="delete-button" title="Delete">
                              <FaTimes />
                            </button>
                          </div>
                        </div>
                        <div className="skill-progress">
                          <div className="progress-bar" style={{ width: `${skill.level}%` }}></div>
                          <span className="progress-text">{skill.level}%</span>
                        </div>
                        <div className="skill-meta">
                          <div className="meta-item">
                            <FaProjectDiagram />
                            <span>{skill.projects} projects</span>
                          </div>
                          <div className="meta-item">
                            <FaAward />
                            <span>Expert</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add Skill Modal (Hidden by default) */}
            <div className="modal" style={{ display: 'none' }}>
              <div className="modal-content">
                <h3>Add New Skill</h3>
                <form className="skill-form">
                  <div className="form-group">
                    <label>Skill Name</label>
                    <input type="text" placeholder="e.g., React" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Proficiency Level</label>
                      <input type="range" min="0" max="100" defaultValue="50" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Years of Experience</label>
                      <input type="number" min="0" placeholder="e.g., 2" />
                    </div>
                    <div className="form-group">
                      <label>Projects Completed</label>
                      <input type="number" min="0" placeholder="e.g., 10" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your expertise in this skill..." />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="cancel-button">Cancel</button>
                    <button type="submit" className="save-button">Save Skill</button>
                  </div>
                </form>
              </div>
            </div>
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
                <button className="edit-button">
                  <FaEdit /> Edit
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
                    <input type="text" defaultValue="Tejas Badhe" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-with-icon">
                      <input type="email" defaultValue="contact@example.com" />
                      <button className="icon-button" title="Copy">
                        <FaLink />
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <div className="input-with-icon">
                      <input type="tel" defaultValue="+1 234 567 890" />
                      <button className="icon-button" title="Copy">
                        <FaLink />
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" defaultValue="New York, USA" />
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
                        <input type="url" defaultValue="https://linkedin.com/in/yourprofile" />
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
                        <input type="url" defaultValue="https://github.com/yourusername" />
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
                        <input type="url" defaultValue="https://twitter.com/yourhandle" />
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
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </div>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label className="switch-label">
                      <span>Email Notifications</span>
                      <div className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </div>
                    </label>
                  </div>
                  <div className="setting-item">
                    <label className="switch-label">
                      <span>Auto-Reply</span>
                      <div className="toggle-switch">
                        <input type="checkbox" />
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
                    placeholder="Enter your auto-reply message..."
                    defaultValue="Thank you for reaching out! I'll get back to you as soon as possible."
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
              onClick={() => setActiveSection(item.id)}
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
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard; 