import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/Header/Header.css'
import './components/MiddlePanel/MiddlePanel.css';
import './components/RightPanel/RightPanel.css';
import './components/MiddlePanel/Articles.css';
import './components/TextEditor/TextEditor.css';
import './components/Articles/Article.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <App />

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
