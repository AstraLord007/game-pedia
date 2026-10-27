import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

(function () {
  const redirect = sessionStorage.redirect;
  if (redirect) {
    delete sessionStorage.redirect;
    window.history.replaceState(null, null, '/game-pedia' + redirect);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/game-pedia">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);