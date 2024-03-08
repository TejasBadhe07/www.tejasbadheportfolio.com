import React from 'react';
import './index.css'
import ReactDOM from 'react-dom';
import App from './App';; // Adjust the import path accordingly


// Wrap your ReactDOM.render in a function or component
function Main() {
  return <App />;
}

ReactDOM.render(<Main />, document.querySelector("#root"));
