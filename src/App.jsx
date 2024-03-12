import React from 'react';
import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Services from './components/services/Services';
import Portfolio from './components/portfolio/Portfolio';
// eslint-disable-next-line
import Testimonials from './components/testimonials/Testimonials';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';

const App = () => {
  // Set a variable to determine if the site is under maintenance
  const isUnderMaintenance = 0; // Set to 1 to show the website, 0 to show maintenance message

  return (
    <>
      {isUnderMaintenance === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h1>Site Under Maintenance</h1>
          <p>We're currently performing some updates.</p>
          <p>Please check back later!</p> 
          <p>Hello Tejas..!!!</p>
        </div>
      ) : (
        <>
          <Header />
          <Nav />
          <About />
          <Experience />
          <Services />
          <Portfolio />
          {/*<Testimonials /> */}
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
