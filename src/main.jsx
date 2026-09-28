import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import { ToastProvider } from './components/Toast';
import './styles/global.css';

// Hash URLs (/#/events) work on any static host without server config. Set VITE_HASH_ROUTER=true to use them.
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>
  </React.StrictMode>,
);
