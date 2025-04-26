import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Skills from './components/skills/Skills';
import Portfolio from './components/portfolio/Portfolio';
import Blog from './components/blog/Blog';
// eslint-disable-next-line
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Loading from './components/loading/Loading';
import ScrollProgress from './components/scrollProgress/ScrollProgress';

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

  return (
    <ThemeProvider>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </ThemeProvider>
  );
};

export default App;
