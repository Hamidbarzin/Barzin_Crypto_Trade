import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotification } from '../contexts/NotificationContext'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { success, error } = useNotification()

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        success('Successfully subscribed to newsletter!')
        setEmail('')
      } else {
        error('Failed to subscribe. Please try again.')
      }
    } catch (err) {
      error('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Trading Terminal', href: '/terminal' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Markets', href: '/markets' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Education', href: '/education' },
        { name: 'AI Assistant', href: '/ai' },
        { name: 'VPN Services', href: '/vpn' },
        { name: 'News & Analysis', href: '/news' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'API Documentation', href: '/api-docs' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Community', href: '/community' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Telegram', icon: '✈️', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' }
  ]

  return (
    <footer className="relative mt-20 glass border-t border-[var(--glass-border)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)]/50 to-transparent pointer-events-none" />
      
      <div className="relative container-custom py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl flex items-center justify-center text-xl font-bold animate-glow">
                🚀
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                BarzinCrypto
              </span>
            </div>
            
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              Advanced cryptocurrency platform with AI intelligence, professional trading tools, 
              and comprehensive services for the next generation of digital asset traders.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 glass-intense rounded-lg flex items-center justify-center text-lg hover:text-[var(--accent-primary)] transition-all group"
                  title={social.name}
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="glass-intense rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Updated with Market Insights
              </h3>
              <p className="text-[var(--text-secondary)]">
                Get the latest crypto news, market analysis, and trading signals delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/5 border border-[var(--glass-border)] rounded-lg text-white placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                required
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Market Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Market Cap', value: '$2.3T', change: '+5.2%' },
            { label: '24h Volume', value: '$89.4B', change: '+12.1%' },
            { label: 'Active Users', value: '50K+', change: '+8.7%' },
            { label: 'Cryptocurrencies', value: '500+', change: '+2.1%' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-[var(--accent-primary)] mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-secondary)] mb-1">{stat.label}</div>
              <div className="text-xs text-[var(--success)]">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[var(--text-secondary)] text-sm">
              © {currentYear} BarzinCrypto. All rights reserved. Built with ❤️ for crypto traders.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-[var(--text-secondary)]">Powered by advanced technology</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse"></div>
                <span className="text-[var(--success)] text-xs">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--accent-primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--accent-secondary)]/5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  )
}

export default Footer