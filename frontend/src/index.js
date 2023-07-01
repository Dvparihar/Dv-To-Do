import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Step-1 get html element
// Step-2 create root element
// Step-3 render root element
const htmlElement = document.getElementById('root');
const rootElement = ReactDOM.createRoot(htmlElement);
rootElement.render(<React.StrictMode><App /></React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
