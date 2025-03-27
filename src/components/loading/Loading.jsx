import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-logo">
          <span>T</span>
          <span>B</span>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loading; 