import React, { useState } from 'react'
import Footer from '../components/Footer'

const Education = () => {
  const [activeCategory, setActiveCategory] = useState('basics')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const categories = [
    { id: 'basics', name: 'Basics', icon: '🎓' },
    { id: 'trading', name: 'Trading', icon: '📈' },
    { id: 'analysis', name: 'Analysis', icon: '📊' },
    { id: 'defi', name: 'DeFi', icon: '🏦' },
    { id: 'nft', name: 'NFTs', icon: '🖼️' },
    { id: 'security', name: 'Security', icon: '🔐' }
  ]

  const courses = {
    basics: [
      {
        id: 1,
        title: 'What is Cryptocurrency?',
        description: 'Learn the fundamentals of digital currencies and blockchain technology',
        duration: '15 min',
        level: 'Beginner',
        progress: 0,
        thumbnail: '💰'
      },
      {
        id: 2,
        title: 'How Blockchain Works',
        description: 'Understanding the technology behind cryptocurrencies',
        duration: '20 min',
        level: 'Beginner',
        progress: 25,
        thumbnail: '⛓️'
      },
      {
        id: 3,
        title: 'Wallets and Storage',
        description: 'Secure ways to store your digital assets',
        duration: '18 min',
        level: 'Beginner',
        progress: 0,
        thumbnail: '👛'
      }
    ],
    trading: [
      {
        id: 4,
        title: 'Trading Fundamentals',
        description: 'Basic concepts of buying and selling cryptocurrencies',
        duration: '25 min',
        level: 'Intermediate',
        progress: 0,
        thumbnail: '📈'
      },
      {
        id: 5,
        title: 'Order Types Explained',
        description: 'Market, limit, and stop orders in crypto trading',
        duration: '22 min',
        level: 'Intermediate',
        progress: 50,
        thumbnail: '📋'
      },
      {
        id: 6,
        title: 'Risk Management',
        description: 'How to protect your capital while trading',
        duration: '30 min',
        level: 'Advanced',
        progress: 0,
        thumbnail: '🛡️'
      }
    ],
    analysis: [
      {
        id: 7,
        title: 'Technical Analysis Basics',
        description: 'Reading charts and identifying patterns',
        duration: '35 min',
        level: 'Intermediate',
        progress: 0,
        thumbnail: '📊'
      },
      {
        id: 8,
        title: 'Fundamental Analysis',
        description: 'Evaluating crypto projects and their value',
        duration: '28 min',
        level: 'Intermediate',
        progress: 75,
        thumbnail: '🔍'
      },
      {
        id: 9,
        title: 'Market Sentiment',
        description: 'Understanding fear, greed, and market psychology',
        duration: '20 min',
        level: 'Advanced',
        progress: 0,
        thumbnail: '🧠'
      }
    ],
    defi: [
      {
        id: 10,
        title: 'DeFi Introduction',
        description: 'Decentralized Finance and its applications',
        duration: '25 min',
        level: 'Intermediate',
        progress: 0,
        thumbnail: '🏦'
      },
      {
        id: 11,
        title: 'Yield Farming',
        description: 'Earning rewards through DeFi protocols',
        duration: '30 min',
        level: 'Advanced',
        progress: 0,
        thumbnail: '🌾'
      }
    ],
    nft: [
      {
        id: 12,
        title: 'NFTs Explained',
        description: 'Understanding Non-Fungible Tokens',
        duration: '20 min',
        level: 'Beginner',
        progress: 0,
        thumbnail: '🖼️'
      },
      {
        id: 13,
        title: 'NFT Trading',
        description: 'Buying, selling, and valuing NFTs',
        duration: '25 min',
        level: 'Intermediate',
        progress: 0,
        thumbnail: '🎨'
      }
    ],
    security: [
      {
        id: 14,
        title: 'Security Best Practices',
        description: 'Keeping your crypto safe from hackers',
        duration: '22 min',
        level: 'Beginner',
        progress: 0,
        thumbnail: '🔐'
      },
      {
        id: 15,
        title: 'Avoiding Scams',
        description: 'Recognizing and avoiding crypto scams',
        duration: '18 min',
        level: 'Beginner',
        progress: 0,
        thumbnail: '⚠️'
      }
    ]
  }

  const startCourse = (course) => {
    setSelectedCourse(course)
  }

  const getProgressColor = (progress) => {
    if (progress === 0) return 'bg-gray-600'
    if (progress < 50) return 'bg-yellow-500'
    if (progress < 100) return 'bg-blue-500'
    return 'bg-emerald-500'
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              Crypto Education Center
            </h1>
            <p className="text-[var(--text-secondary)] text-center mb-8">
              Master cryptocurrency trading with expert courses and tutorials
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black'
                      : 'glass-intense text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span className="font-semibold">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses[activeCategory]?.map((course) => (
                <div key={course.id} className="glass rounded-2xl overflow-hidden hover:glass-intense transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center">
                    <div className="text-6xl">{course.thumbnail}</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        course.level === 'Beginner' ? 'bg-green-600' :
                        course.level === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-[var(--text-secondary)] text-sm">{course.duration}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">{course.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${getProgressColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => startCourse(course)}
                      className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all"
                    >
                      {course.progress > 0 ? 'Continue' : 'Start Course'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Course Modal */}
            {selectedCourse && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="glass rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">{selectedCourse.title}</h2>
                    <button 
                      onClick={() => setSelectedCourse(null)}
                      className="text-[var(--text-secondary)] hover:text-white text-2xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-6xl">{selectedCourse.thumbnail}</div>
                  </div>
                  
                  <p className="text-[var(--text-secondary)] mb-6">{selectedCourse.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="glass-intense p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">⏱️</div>
                      <div className="text-sm text-white">Duration</div>
                      <div className="text-lg font-semibold text-[var(--accent-primary)]">{selectedCourse.duration}</div>
                    </div>
                    <div className="glass-intense p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm text-white">Level</div>
                      <div className="text-lg font-semibold text-[var(--accent-primary)]">{selectedCourse.level}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedCourse(null)}
                      className="flex-1 py-3 glass-intense text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        // Start course logic
                        setSelectedCourse(null)
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Section */}
            <div className="mt-16 glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Learning Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-2">50+</div>
                  <div className="text-[var(--text-secondary)]">Courses Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-2">10K+</div>
                  <div className="text-[var(--text-secondary)]">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-2">95%</div>
                  <div className="text-[var(--text-secondary)]">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[var(--accent-primary)] mb-2">4.9</div>
                  <div className="text-[var(--text-secondary)]">Average Rating</div>
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

export default Education
