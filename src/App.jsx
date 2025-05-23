import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Skills from './components/skills/Skills';
import Portfolio from './components/portfolio/Portfolio';
import Blog from './components/blog/Blog';
import BlogPost from './components/blog/BlogPost';
// eslint-disable-next-line
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import Loading from './components/loading/Loading';
import ScrollProgress from './components/scrollProgress/ScrollProgress';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollProgress, setShowScrollProgress] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Show scroll progress after scrolling
    const handleScroll = () => {
      setShowScrollProgress(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const MainContent = () => (
    <>
      <ScrollProgress className={showScrollProgress ? 'visible' : ''} />
      <Header />
      <Nav />
      <About />
      <Experience />
      <Skills />
      <Portfolio />
      <Blog />
      {/*<Testimonials /> */}
      <Contact />
      <Footer />
    </>
  );

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider>
        <PortfolioProvider>
          {isLoading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/dashboard" element={<Login />} />
              <Route 
                path="/dashboard/:section" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={
                <div style={{ 
                  height: '100vh', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <h1>Page Not Found</h1>
                  <a href="/" style={{ color: 'var(--color-primary)' }}>Go Back Home</a>
                </div>
              } />
            </Routes>
          )}
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
