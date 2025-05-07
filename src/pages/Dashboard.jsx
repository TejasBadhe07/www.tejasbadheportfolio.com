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
      default:
        return (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="content-section"
          >
            <h2>{menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'} Content</h2>
            <p>This is where the {activeSection} content will go.</p>
          </motion.div>
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