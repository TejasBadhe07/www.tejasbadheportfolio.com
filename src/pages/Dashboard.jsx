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
  FaComment
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
              <button className="edit-button">
                <FaEdit /> Edit
              </button>
            </div>
            <div className="about-content">
              <div className="profile-section">
                <div className="profile-image">
                  <img src="/path-to-your-image.jpg" alt="Profile" />
                  <button className="change-image">
                    <FaEdit /> Change Image
                  </button>
                </div>
                <div className="profile-info">
                  <div className="info-group">
                    <label>Full Name</label>
                    <input type="text" defaultValue="Tejas Badhe" />
                  </div>
                  <div className="info-group">
                    <label>Title</label>
                    <input type="text" defaultValue="Full Stack Developer" />
                  </div>
                  <div className="info-group">
                    <label>Bio</label>
                    <textarea defaultValue="Passionate developer with expertise in web development..." />
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
              <button className="add-button">
                <FaPlus /> Add Experience
              </button>
            </div>
            <div className="experience-list">
              {[
                {
                  title: "Senior Developer",
                  company: "Tech Corp",
                  period: "2022 - Present",
                  description: "Leading development team..."
                },
                // Add more experiences
              ].map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{exp.title}</h3>
                    <div className="experience-actions">
                      <button className="edit-button"><FaEdit /></button>
                      <button className="delete-button"><FaTimes /></button>
                    </div>
                  </div>
                  <p className="company">{exp.company}</p>
                  <p className="period">{exp.period}</p>
                  <p className="description">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Skills</h2>
              <button className="add-button">
                <FaPlus /> Add Skill
              </button>
            </div>
            <div className="skills-grid">
              {[
                { name: "React", level: 90 },
                { name: "JavaScript", level: 85 },
                { name: "Node.js", level: 80 },
                // Add more skills
              ].map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-header">
                    <h3>{skill.name}</h3>
                    <div className="skill-actions">
                      <button className="edit-button"><FaEdit /></button>
                      <button className="delete-button"><FaTimes /></button>
                    </div>
                  </div>
                  <div className="skill-progress">
                    <div className="progress-bar" style={{ width: `${skill.level}%` }}></div>
                    <span>{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Blog Posts</h2>
              <button className="add-button">
                <FaPlus /> New Post
              </button>
            </div>
            <div className="blog-list">
              {[
                {
                  title: "Getting Started with React",
                  date: "2024-03-15",
                  status: "Published"
                },
                // Add more blog posts
              ].map((post, index) => (
                <div key={index} className="blog-item">
                  <div className="blog-info">
                    <h3>{post.title}</h3>
                    <div className="blog-meta">
                      <span className="date">{post.date}</span>
                      <span className="status">{post.status}</span>
                    </div>
                  </div>
                  <div className="blog-actions">
                    <button className="edit-button"><FaEdit /></button>
                    <button className="delete-button"><FaTimes /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="content-section">
            <div className="section-header">
              <h2>Contact Information</h2>
              <button className="edit-button">
                <FaEdit /> Edit
              </button>
            </div>
            <div className="contact-info">
              <div className="info-group">
                <label>Email</label>
                <input type="email" defaultValue="contact@example.com" />
              </div>
              <div className="info-group">
                <label>Phone</label>
                <input type="tel" defaultValue="+1 234 567 890" />
              </div>
              <div className="info-group">
                <label>Location</label>
                <input type="text" defaultValue="New York, USA" />
              </div>
              <div className="social-links">
                <h3>Social Media Links</h3>
                <div className="info-group">
                  <label>LinkedIn</label>
                  <input type="url" defaultValue="https://linkedin.com/in/yourprofile" />
                </div>
                <div className="info-group">
                  <label>GitHub</label>
                  <input type="url" defaultValue="https://github.com/yourusername" />
                </div>
                <div className="info-group">
                  <label>Twitter</label>
                  <input type="url" defaultValue="https://twitter.com/yourhandle" />
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