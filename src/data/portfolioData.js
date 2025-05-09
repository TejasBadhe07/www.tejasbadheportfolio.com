// Initial portfolio data structure
const portfolioData = {
  about: {
    name: "Tejas Badhe",
    title: "Full Stack Developer",
    location: "New York, USA",
    email: "contact@example.com",
    bio: "Passionate developer with expertise in web development. Specializing in React, Node.js, and modern web technologies. Always eager to learn and adapt to new challenges.",
    social: {
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourhandle"
    },
    stats: {
      experience: "5+",
      projects: "50+",
      satisfaction: "100%"
    }
  },
  experience: [
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
    }
  ],
  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 90, years: 3, projects: 15 },
        { name: "JavaScript", level: 85, years: 4, projects: 20 },
        { name: "HTML/CSS", level: 95, years: 5, projects: 25 }
      ]
    }
  ],
  blog: [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt: "Learn the fundamentals of React and build your first application...",
      content: "Full blog content here...",
      date: "2024-03-15",
      status: "Published",
      views: 1234,
      comments: 15,
      category: "Development",
      image: "https://via.placeholder.com/300x200"
    }
  ],
  contact: {
    name: "Tejas Badhe",
    email: "contact@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    social: {
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourhandle"
    },
    settings: {
      enableContactForm: true,
      emailNotifications: true,
      autoReply: false,
      autoReplyMessage: "Thank you for reaching out! I'll get back to you as soon as possible."
    }
  }
};

// Function to save data to localStorage
export const savePortfolioData = (data) => {
  localStorage.setItem('portfolioData', JSON.stringify(data));
};

// Function to load data from localStorage
export const loadPortfolioData = () => {
  const savedData = localStorage.getItem('portfolioData');
  return savedData ? JSON.parse(savedData) : portfolioData;
};

// Function to update specific section
export const updateSection = (section, data) => {
  const currentData = loadPortfolioData();
  currentData[section] = data;
  savePortfolioData(currentData);
  return currentData;
};

// Function to update specific item in a section
export const updateItem = (section, itemId, data) => {
  const currentData = loadPortfolioData();
  if (Array.isArray(currentData[section])) {
    const index = currentData[section].findIndex(item => item.id === itemId);
    if (index !== -1) {
      currentData[section][index] = { ...currentData[section][index], ...data };
    }
  } else {
    currentData[section] = { ...currentData[section], ...data };
  }
  savePortfolioData(currentData);
  return currentData;
};

export default portfolioData; 