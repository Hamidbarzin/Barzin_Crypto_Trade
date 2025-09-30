import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// Environment variables for memory optimization
if (process.env.NODE_ENV === 'development') {
  console.log('BarzinCrypto - Development Mode');
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)