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
  FaFileAlt,
  FaProjectDiagram,
  FaEnvelopeOpen,
  FaChartLine,
  FaCalendarAlt,
  FaBell
} from 'react-icons/fa';
import './dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message from John Doe', time: '5 minutes ago' },
    { id: 2, message: 'Your blog post was featured', time: '1 hour ago' },
    { id: 3, message: 'New project view', time: '2 hours ago' }
  ]);

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

  const recentActivities = [
    { id: 1, type: 'view', title: 'Portfolio Page', time: '2 minutes ago' },
    { id: 2, type: 'message', title: 'New Contact Form Submission', time: '15 minutes ago' },
    { id: 3, type: 'blog', title: 'New Blog Comment', time: '1 hour ago' },
    { id: 4, type: 'project', title: 'Project View Increased', time: '2 hours ago' }
  ];

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
              {isSidebarOpen && <span>{item.label}</span>}
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
          {isSidebarOpen && <span>Logout</span>}
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}</h1>
          <div className="header-actions">
            <div className="notifications">
              <FaBell />
              <span className="notification-badge">{notifications.length}</span>
            </div>
            <span className="welcome-text">Welcome, Admin</span>
          </div>
        </header>

        <div className="dashboard-content">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="content-section"
          >
            {activeSection === 'home' && (
              <div className="dashboard-overview">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaEye />
                    </div>
                    <div className="stat-info">
                      <h3>Total Views</h3>
                      <p>1,234</p>
                      <span className="stat-trend positive">+12% from last month</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaFileAlt />
                    </div>
                    <div className="stat-info">
                      <h3>Blog Posts</h3>
                      <p>12</p>
                      <span className="stat-trend">2 drafts pending</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaProjectDiagram />
                    </div>
                    <div className="stat-info">
                      <h3>Projects</h3>
                      <p>8</p>
                      <span className="stat-trend positive">+2 new this month</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaEnvelopeOpen />
                    </div>
                    <div className="stat-info">
                      <h3>Messages</h3>
                      <p>25</p>
                      <span className="stat-trend">5 unread</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-grid">
                  <div className="dashboard-card recent-activity">
                    <div className="card-header">
                      <h2>Recent Activity</h2>
                      <FaCalendarAlt />
                    </div>
                    <div className="activity-list">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">
                            {activity.type === 'view' && <FaEye />}
                            {activity.type === 'message' && <FaEnvelopeOpen />}
                            {activity.type === 'blog' && <FaBlog />}
                            {activity.type === 'project' && <FaProjectDiagram />}
                          </div>
                          <div className="activity-details">
                            <h4>{activity.title}</h4>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-card notifications-card">
                    <div className="card-header">
                      <h2>Notifications</h2>
                      <FaBell />
                    </div>
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.message}</p>
                          <span>{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Add other section content here */}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 