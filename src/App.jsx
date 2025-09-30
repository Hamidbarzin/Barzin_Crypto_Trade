import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { NotificationProvider } from './contexts/NotificationContext'
import Header from './components/Header'
import Home from './pages/Home'
import Market from './pages/Markets'
import News from './pages/News'
import AIAssistant from './pages/AIAssistant'
import Auction from './pages/Auction'
import VPN from './pages/VPN'
import Terminal from './pages/Terminal'
import Education from './pages/Education'
import Auth from './pages/Auth'

function AppContent() {
  const location = useLocation();
  
  useEffect(() => {
    // Health check for critical DOM elements only on pages that need them
    const currentPath = location.pathname;

    // Skip DOM checks for news page since it doesn't have markets/crypto elements
    if (currentPath.includes('/news')) {
      return;
    }

    // Only check elements that exist on current page
    const requiredElements = [];
    if (currentPath === '/' || currentPath === '/markets') {
      requiredElements.push('header');
      // Only check for market elements on home/markets page
      if (document.getElementById('markets')) requiredElements.push('markets');
      if (document.getElementById('crypto-top20')) requiredElements.push('crypto-top20');
    }

    if (requiredElements.length === 0) return;

    setTimeout(() => {
      const missingElements = requiredElements.filter(id => !document.getElementById(id))

      if (missingElements.length > 0) {
        console.warn('Missing DOM elements:', missingElements)
      }
    }, 1000)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Market />} />
        <Route path="/news" element={<News />} />
        <Route path="/ai" element={<AIAssistant />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/vpn" element={<VPN />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/education" element={<Education />} />
        <Route path="/auth/signin" element={<Auth />} />
        <Route path="/auth/signup" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  if (path.startsWith("/news")) return <News />;
  
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  );
}