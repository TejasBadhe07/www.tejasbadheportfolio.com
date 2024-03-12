import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/images/portfolio_images/library_management_system.jpg'
import IMG2 from '../../assets/images/portfolio_images/object_detection_car2.jpg'
import IMG3 from '../../assets/images/portfolio_images/handwriting_digit_recognition.jpg'
import IMG4 from '../../assets/images/portfolio_images/image_classification.png'
// eslint-disable-next-line
import IMG5 from '../../assets/images/portfolio_images/portfolio5.jpg'
// eslint-disable-next-line
import IMG6 from '../../assets/images/portfolio_images/portfolio6.jpg'


/* ==================================== PORTFOLIO PROJEC AND ITS LINKS IN THIS CLASS ========================================== */
const data = [
  {
    id: 1,
    image: IMG1,
    title: ' Library Management System',
    github: 'https://github.com/TejasBadhe07/Library-Management-System',
    /*demo: "https://dribbble.com/shots/20179884-Eclipse-Figma-dashboard-UI-kit-for-data-design-web-apps"*/
  },

  {
    id: 2,
    image: IMG2,
    title: 'Object-Detection-Car',
    github: 'https://github.com/TejasBadhe07/Object-Detection-Car',
    /*demo: "https://dribbble.com/shots/20179855-Eclipse-Figma-dashboard-UI-kit-for-data-design-web-apps"*/
  },

  {
    id: 3,
    image: IMG3,
    title: 'Handwritten Digit Recognization',
    github: 'https://github.com/TejasBadhe07/Handwritten-Digit-Recognization',
    /*demo: "https://dribbble.com/shots/20111348-Orion-UI-kit-for-Figma"*/
  },

  {
    id: 4,
    image: IMG4,
    title: 'CNN for Image Classification',
    github: 'https://github.com/TejasBadhe07/CNN-for-Image-Classification',
    demo: "https://dribbble.com/shots/20111240-Orion-UI-kit-for-Figma"
  },
  /*
  {
    id: 5,
    image: IMG5,
    title: 'Figma dashboard UI kit for data design web apps',
    github: 'https://github.com',
    demo: "https://dribbble.com/shots/19886945-Eclipse-Figma-dashboard-UI-kit-for-data-design-web-apps"
  },


  {
    id: 6,
    image: IMG6,
    title: 'Figma dashboard UI kit for data design web apps',
    github: 'https://github.com',
    demo: "https://dribbble.com/shots/19838794-Eclipse-Figma-dashboard-UI-kit-for-data-design-web-apps"
  }
  
  */
]


const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        {
          data.map(({id, image, title, github, demo}) => {
            return (
              <article key={id} className='portfolio__item'>
              <div className='portfolio__item-image'>
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className='portfolio__item-cta'>
                <a href={github} className='btn'>GitHub</a>
                
              </div>          
            </article>
            )
          })
        }
     

      </div>
    </section>
  )
}
/* <a href={demo} className='btn btn-primary' target='_blank'>Live Demo</a> =========== Add this line under Github for Live Demo*/

export default Portfolio

