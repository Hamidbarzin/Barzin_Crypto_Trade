import React, { useState, useEffect } from 'react'

const ProfessionalSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [livePrices, setLivePrices] = useState({})

  // Crypto data model - English names with SL/TP
  const cryptoData = [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 65230.12,
      change24h: 2.34,
      sl: 62500,
      tp: 68000,
      risk: 'Low',
      nextBuy: '14:20',
      nextSell: '16:45',
      color: '#F7931A',
      sparklinePoints: [62000, 63500, 64200, 65000, 65230],
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2456.89,
      change24h: 1.82,
      sl: 2300,
      tp: 2600,
      risk: 'Medium',
      nextBuy: '15:30',
      nextSell: '17:15',
      color: '#627EEA',
      sparklinePoints: [2400, 2420, 2445, 2450, 2456],
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      price: 142.33,
      change24h: -0.76,
      sl: 135,
      tp: 150,
      risk: 'High',
      nextBuy: '16:00',
      nextSell: '18:30',
      color: '#9945FF',
      sparklinePoints: [145, 143, 141, 142, 142.33],
    },
    {
      id: 'ripple',
      symbol: 'XRP',
      name: 'Ripple',
      price: 0.6234,
      change24h: 0.32,
      sl: 0.58,
      tp: 0.68,
      risk: 'Medium',
      nextBuy: '17:45',
      nextSell: '19:20',
      color: '#00AAE4',
      sparklinePoints: [0.61, 0.615, 0.62, 0.622, 0.6234],
    },
    {
      id: 'cardano',
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.3847,
      change24h: 1.45,
      sl: 0.36,
      tp: 0.42,
      risk: 'Low',
      nextBuy: '18:15',
      nextSell: '20:00',
      color: '#0033AD',
      sparklinePoints: [0.375, 0.378, 0.382, 0.384, 0.3847],
    }
  ]

  // Format price with proper decimals and separators
  const formatPrice = (price) => {
    if (price < 1) {
      return `$${price.toFixed(4)}`
    } else if (price < 100) {
      return `$${price.toFixed(2)}`
    } else {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  }

  // Generate sparkline SVG
  const generateSparkline = (points, color) => {
    const width = 80
    const height = 30
    const min = Math.min(...points)
    const max = Math.max(...points)
    const range = max - min || 1
    
    const pathData = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - ((point - min) / range) * height
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="sparkline">
        <path 
          d={pathData} 
          fill="none" 
          stroke={color} 
          strokeWidth="1.5" 
          className="animate-pulse"
          style={{
            strokeDasharray: '100',
            animation: 'sparkle 3s linear infinite'
          }}
        />
      </svg>
    )
  }

  // Check if current time is within trading window
  const isWithinTradingWindow = (nextTime) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [hours, minutes] = nextTime.split(':').map(Number)
    const targetTime = hours * 60 + minutes
    
    // Within 30 minutes window
    return Math.abs(currentTime - targetTime) <= 30
  }

  // Create phone slide component
  const PhoneSlide = ({ coin, isActive }) => {
    const changeColor = coin.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
    const changeIcon = coin.change24h >= 0 ? '▲' : '▼'
    const canBuy = isWithinTradingWindow(coin.nextBuy)
    const canSell = isWithinTradingWindow(coin.nextSell)
    
    const riskColors = {
      'Low': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Medium': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      'High': 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    }

    return (
      <div className={`phone-frame w-72 h-[580px] rounded-[3rem] p-6 relative transform-gpu transition-all duration-700 ${isActive ? 'scale-105 glow-effect' : 'scale-88 opacity-70'}`}>
        <div className="glass-card rounded-3xl h-full p-6 relative overflow-hidden">
          {/* Coin Logo SVG */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center" style={{ color: coin.color }}>
                {/* Simple crypto icon */}
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: coin.color }}></div>
              </div>
              <div className="text-left">
                <div className="font-bold text-lg">{coin.symbol}</div>
                <div className="text-gray-400 text-sm">{coin.name}</div>
              </div>
            </div>
            <div className={`flex items-center space-x-1 ${changeColor}`}>
              <span className="text-xs">{changeIcon}</span>
              <span className="text-sm font-medium">{Math.abs(coin.change24h).toFixed(2)}%</span>
            </div>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold mb-1 price-display">{formatPrice(livePrices[coin.symbol]?.price || coin.price)}</div>
            <div className="text-gray-400 text-sm">Current Price</div>
          </div>

          {/* Sparkline */}
          <div className="flex justify-center mb-6">
            {generateSparkline(coin.sparklinePoints, coin.color)}
          </div>

          {/* Strategy Panel */}
          <div className="glass-card rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-gray-400 text-xs">Stop Loss</div>
                <div className="text-rose-400 font-semibold">{formatPrice(coin.sl)}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-xs">Take Profit</div>
                <div className="text-emerald-400 font-semibold">{formatPrice(coin.tp)}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-400 text-xs">Risk Level</div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs border ${riskColors[coin.risk]}`}>{coin.risk}</span>
              </div>
            </div>
          </div>

          {/* Trading Times */}
          <div className="glass-card rounded-2xl p-3 mb-6">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="text-gray-400">Next Buy</div>
                <div className="text-emerald-400 font-medium">{coin.nextBuy}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Next Sell</div>
                <div className="text-amber-400 font-medium">{coin.nextSell}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className={`py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${canBuy ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} disabled={!canBuy}>
              Buy
            </button>
            <button className={`py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 ${canSell ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} disabled={!canSell}>
              Sell
            </button>
          </div>

          {/* Disclaimer */}
          <div className="text-center">
            <div className="text-gray-500 text-xs">Not financial advice</div>
          </div>
        </div>
      </div>
    )
  }

  // Fetch live crypto prices
  useEffect(() => {
    const fetchLivePrices = async () => {
      try {
        const response = await fetch('/api/crypto-prices')
        if (response.ok) {
          const data = await response.json()
          setLivePrices(data)
        }
      } catch (error) {
        console.error('Failed to fetch live prices:', error)
      }
    }

    fetchLivePrices()
    const interval = setInterval(fetchLivePrices, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Auto-rotation for slider (RTL direction)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cryptoData.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [cryptoData.length])

  return (
    <div id="header-slider" className="py-8 flex justify-center items-center" style={{ perspective: '1200px' }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white via-[#00D4FF] to-[#FFD700] bg-clip-text text-transparent mb-4">
              {cryptoData.map(coin => coin.name).join(' | ')}
            </h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              Professional platform with AI intelligence, advanced analytics and professional tools for next-generation traders
            </p>
          </div>

          {/* 3D Slider */}
          <div className="mb-6 flex justify-center relative" style={{ transformStyle: 'preserve-3d', height: '600px' }}>
            {cryptoData.map((coin, index) => {
              const offset = index - currentSlide
              let transform = ''
              let zIndex = 1
              let opacity = 0.3

              if (offset === 0) {
                // Active slide
                transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)'
                zIndex = 10
                opacity = 1
              } else if (offset === -1 || (offset === cryptoData.length - 1 && currentSlide === 0)) {
                // Previous slide
                transform = 'translateX(-320px) translateZ(-150px) rotateY(25deg) scale(0.88)'
                zIndex = 2
                opacity = 0.7
              } else if (offset === 1 || (offset === -(cryptoData.length - 1) && currentSlide === cryptoData.length - 1)) {
                // Next slide
                transform = 'translateX(320px) translateZ(-150px) rotateY(-25deg) scale(0.88)'
                zIndex = 2
                opacity = 0.7
              } else if (offset === -2 || (offset === cryptoData.length - 2 && currentSlide <= 1)) {
                // Second previous
                transform = 'translateX(-640px) translateZ(-300px) rotateY(35deg) scale(0.76)'
                zIndex = 1
                opacity = 0.5
              } else if (offset === 2 || (offset === -(cryptoData.length - 2) && currentSlide >= cryptoData.length - 2)) {
                // Second next
                transform = 'translateX(640px) translateZ(-300px) rotateY(-35deg) scale(0.76)'
                zIndex = 1
                opacity = 0.5
              } else {
                // Hidden slides
                transform = 'translateX(0) translateZ(-500px) rotateY(0deg) scale(0.5)'
                zIndex = 0
                opacity = 0
              }

              return (
                <div
                  key={coin.id}
                  className="absolute transition-all duration-700 ease-in-out transform-gpu"
                  style={{
                    transform,
                    opacity,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    zIndex,
                    top: '50%',
                    left: '50%',
                    marginLeft: '-144px',
                    marginTop: '-290px'
                  }}
                >
                  <PhoneSlide coin={coin} isActive={offset === 0} />
                </div>
              )
            })}
          </div>
          
          {/* Manual Navigation */}
          <div className="flex justify-center space-x-3">
            {cryptoData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-[#00D4FF] scale-125 shadow-lg shadow-[#00D4FF]/50 animate-pulse' 
                    : 'bg-gray-600 hover:bg-[#FFD700] hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .phone-frame {
          background: linear-gradient(145deg, #2a2a3a, #1a1a2a);
          border: 2px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glow-effect {
          animation: glow-pulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow-pulse {
          0% { 
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1); 
          }
          100% { 
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.6), 0 0 80px rgba(0, 212, 255, 0.2); 
          }
        }
        
        @keyframes sparkle {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}

export default ProfessionalSlider