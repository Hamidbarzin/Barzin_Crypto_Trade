import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'

const VPN = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [selectedServer, setSelectedServer] = useState(null)
  const [servers, setServers] = useState([])

  useEffect(() => {
    // Mock server data
    const mockServers = [
      { id: 1, country: 'United States', city: 'New York', flag: '🇺🇸', ping: 45, load: 23 },
      { id: 2, country: 'United Kingdom', city: 'London', flag: '🇬🇧', ping: 52, load: 18 },
      { id: 3, country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', ping: 38, load: 31 },
      { id: 4, country: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: 67, load: 15 },
      { id: 5, country: 'Singapore', city: 'Singapore', flag: '🇸🇬', ping: 42, load: 27 },
      { id: 6, country: 'Canada', city: 'Toronto', flag: '🇨🇦', ping: 48, load: 22 },
      { id: 7, country: 'Australia', city: 'Sydney', flag: '🇦🇺', ping: 89, load: 19 },
      { id: 8, country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', ping: 41, load: 25 }
    ]
    setServers(mockServers)
    setSelectedServer(mockServers[0])
  }, [])

  const toggleConnection = () => {
    setIsConnected(!isConnected)
  }

  const connectToServer = (server) => {
    setSelectedServer(server)
    setIsConnected(true)
  }

  const getStatusColor = () => {
    if (isConnected) return 'text-green-400'
    return 'text-red-400'
  }

  const getStatusText = () => {
    if (isConnected) return 'Connected'
    return 'Disconnected'
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Galaxy Background */}
      <iframe 
        src="/galaxy-rich-background.html"
        className="absolute inset-0 w-full h-full border-0"
        style={{ zIndex: 1 }}
        title="Galaxy Background"
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-custom py-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              Secure VPN Service
            </h1>
            <p className="text-[var(--text-secondary)] text-center mb-8">
              Protect your crypto trading with military-grade encryption
            </p>

            {/* Connection Status */}
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Connection Status</h2>
                    <p className={`text-lg ${getStatusColor()}`}>{getStatusText()}</p>
                    {isConnected && selectedServer && (
                      <p className="text-[var(--text-secondary)]">
                        Connected to {selectedServer.flag} {selectedServer.country}, {selectedServer.city}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={toggleConnection}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                    isConnected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black hover:shadow-lg hover:shadow-[var(--accent-primary)]/25'
                  }`}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>

            {/* Server List */}
            <div className="glass rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-6">Choose Server Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servers.map((server) => (
                  <div
                    key={server.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedServer?.id === server.id
                        ? 'glass-intense border-2 border-[var(--accent-primary)]'
                        : 'glass hover:glass-intense'
                    }`}
                    onClick={() => connectToServer(server)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{server.flag}</span>
                        <div>
                          <h4 className="text-white font-semibold">{server.country}</h4>
                          <p className="text-[var(--text-secondary)] text-sm">{server.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-mono">{server.ping}ms</div>
                        <div className="text-[var(--text-secondary)] text-sm">Load: {server.load}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-lg font-semibold text-white mb-2">Military-Grade Encryption</h3>
                <p className="text-[var(--text-secondary)] text-sm">AES-256 encryption protects your data</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-lg font-semibold text-white mb-2">Global Server Network</h3>
                <p className="text-[var(--text-secondary)] text-sm">50+ servers in 30+ countries</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold text-white mb-2">High-Speed Connection</h3>
                <p className="text-[var(--text-secondary)] text-sm">Optimized for crypto trading</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🚫</div>
                <h3 className="text-lg font-semibold text-white mb-2">No-Logs Policy</h3>
                <p className="text-[var(--text-secondary)] text-sm">We don't track your activities</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-semibold text-white mb-2">Crypto Payments</h3>
                <p className="text-[var(--text-secondary)] text-sm">Pay with Bitcoin, Ethereum, and more</p>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Platform</h3>
                <p className="text-[var(--text-secondary)] text-sm">Works on all devices</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 text-center">VPN Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-intense rounded-xl p-6 text-center">
                  <h4 className="text-xl font-semibold text-white mb-2">Basic</h4>
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-4">$9.99<span className="text-lg text-[var(--text-secondary)]">/month</span></div>
                  <ul className="text-[var(--text-secondary)] text-sm space-y-2 mb-6">
                    <li>• 5 Server Locations</li>
                    <li>• 1 Device</li>
                    <li>• Standard Speed</li>
                    <li>• Email Support</li>
                  </ul>
                  <button className="w-full py-3 glass rounded-lg text-white font-semibold hover:glass-intense transition-all">
                    Choose Plan
                  </button>
                </div>
                
                <div className="glass-intense rounded-xl p-6 text-center border-2 border-[var(--accent-primary)]">
                  <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Most Popular
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">Pro</h4>
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-4">$19.99<span className="text-lg text-[var(--text-secondary)]">/month</span></div>
                  <ul className="text-[var(--text-secondary)] text-sm space-y-2 mb-6">
                    <li>• 50+ Server Locations</li>
                    <li>• 5 Devices</li>
                    <li>• High Speed</li>
                    <li>• Priority Support</li>
                    <li>• Kill Switch</li>
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all">
                    Choose Plan
                  </button>
                </div>
                
                <div className="glass-intense rounded-xl p-6 text-center">
                  <h4 className="text-xl font-semibold text-white mb-2">Enterprise</h4>
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-4">$49.99<span className="text-lg text-[var(--text-secondary)]">/month</span></div>
                  <ul className="text-[var(--text-secondary)] text-sm space-y-2 mb-6">
                    <li>• All Server Locations</li>
                    <li>• Unlimited Devices</li>
                    <li>• Maximum Speed</li>
                    <li>• 24/7 Support</li>
                    <li>• Custom Servers</li>
                    <li>• API Access</li>
                  </ul>
                  <button className="w-full py-3 glass rounded-lg text-white font-semibold hover:glass-intense transition-all">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default VPN
