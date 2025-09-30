import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderSlider from '../components/HeaderSlider'
import Footer from '../components/Footer'

const Home = () => {
  const navigate = useNavigate()
  const [showDemo, setShowDemo] = useState(false)

  const handleStartTrading = () => {
    navigate('/markets')
  }

  const handleWatchDemo = () => {
    setShowDemo(true)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Galaxy Background via iframe */}
      <iframe 
        src="/galaxy-rich-background.html"
        className="absolute inset-0 w-full h-full border-0"
        style={{ zIndex: 1 }}
        title="Galaxy Background"
      />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 min-h-screen" style={{ paddingTop: 'var(--header-h)' }}>
        {/* Hero Section */}
        <section className="py-[var(--hero-py)] text-center">
          <div className="container-custom">
            <h1 
              className="font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent mb-6"
              style={{ fontSize: 'var(--h1)' }}
            >
              BarzinCrypto
            </h1>
            
            <p 
              className="text-[var(--text-secondary)] max-w-3xl mx-auto mb-12 leading-relaxed"
              style={{ fontSize: 'var(--body)' }}
            >
              Future of Crypto Trading - Advanced platform with AI intelligence, sophisticated analytics, 
              and professional tools for next-generation traders
            </p>

            {/* Centered Slider Layout */}
            <div className="mx-auto max-w-[800px] px-4 py-10">
              <HeaderSlider />
            </div>

            {/* Ticker strip (زیر اسلایدر) */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <div className="flex gap-6 px-4 py-2 text-sm">
                {[
                  { s: "BTC", p: "63,700", c: +1.8 },
                  { s: "ETH", p: "2,460", c: +1.2 },
                  { s: "SOL", p: "142.3", c: -0.8 },
                  { s: "XRP", p: "0.69", c: +0.3 },
                ].map((t) => (
                  <div key={t.s} className="flex items-center gap-2">
                    <span className="text-white/70">{t.s}</span>
                    <span>${t.p}</span>
                    <span className={t.c>=0 ? "text-emerald-300" : "text-rose-300"}>
                      {t.c>=0 ? `+${t.c}%` : `${t.c}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <button 
                onClick={handleStartTrading}
                className="px-8 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all animate-glow"
              >
                Start Trading Now
              </button>
              <button 
                onClick={handleWatchDemo}
                className="px-8 py-4 glass-intense text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]/30">
          <div className="container-custom">
            <h2 
              className="text-center font-bold text-white mb-16"
              style={{ fontSize: 'var(--h2)' }}
            >
              Comprehensive Crypto Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-gap)]">
              {[
                { icon: '💹', title: 'Professional Trading', desc: 'Advanced trading terminal with real-time data and professional tools' },
                { icon: '🎓', title: 'Educational Platform', desc: 'Learn crypto trading with expert courses and webinars' },
                { icon: '🤖', title: 'AI Assistant', desc: 'Smart market analysis and automated trading signals' },
                { icon: '🔐', title: 'VPN Services', desc: 'Secure internet access with global server network' },
                { icon: '📰', title: 'Market News', desc: 'Real-time crypto news and market sentiment analysis' },
                { icon: '📊', title: 'Analytics', desc: 'Deep market insights and portfolio performance tracking' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="glass rounded-[var(--card-r)] p-[var(--card-pad)] text-center group hover:glass-intense transition-all duration-300"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Active Users', value: '50K+' },
                { label: 'Trading Volume', value: '$2.5B' },
                { label: 'Cryptocurrencies', value: '500+' },
                { label: 'Countries', value: '150+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-[var(--accent-primary)] mb-2 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />

        {/* Demo Modal */}
        {showDemo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Platform Demo</h2>
                <button 
                  onClick={() => setShowDemo(false)}
                  className="text-[var(--text-secondary)] hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="aspect-video bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-white text-xl mb-2">Demo Video</p>
                  <p className="text-[var(--text-secondary)]">See BarzinCrypto in action</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-intense p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">📈</div>
                  <div className="text-sm text-white">Real-time Trading</div>
                </div>
                <div className="glass-intense p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="text-sm text-white">AI Assistant</div>
                </div>
                <div className="glass-intense p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm text-white">Secure Platform</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDemo(false)}
                  className="flex-1 py-3 glass-intense text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDemo(false)
                    navigate('/markets')
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all"
                >
                  Start Trading
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home