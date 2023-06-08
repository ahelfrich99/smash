import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/styles2.css';
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


const styleElement = document.createElement('style');

styleElement.textContent = require('./styles/styles2.css');

document.head.appendChild(styleElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
