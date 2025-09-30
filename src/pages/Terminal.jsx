import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'

const Terminal = () => {
  const [activeTab, setActiveTab] = useState('trading')
  const [orders, setOrders] = useState([])
  const [positions, setPositions] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    // Mock data
    const mockOrders = [
      { id: 1, symbol: 'BTC/USDT', side: 'BUY', type: 'LIMIT', amount: 0.5, price: 45000, status: 'FILLED', time: '10:30:15' },
      { id: 2, symbol: 'ETH/USDT', side: 'SELL', type: 'MARKET', amount: 2.0, price: 3200, status: 'PENDING', time: '10:32:22' },
      { id: 3, symbol: 'SOL/USDT', side: 'BUY', type: 'LIMIT', amount: 10, price: 150, status: 'CANCELLED', time: '10:35:08' }
    ]
    
    const mockPositions = [
      { symbol: 'BTC/USDT', size: 0.5, entryPrice: 45000, markPrice: 45200, pnl: 100, pnlPercent: 0.44 },
      { symbol: 'ETH/USDT', size: 2.0, entryPrice: 3200, markPrice: 3180, pnl: -40, pnlPercent: -0.63 }
    ]
    
    const mockHistory = [
      { id: 1, action: 'Order Filled', symbol: 'BTC/USDT', details: '0.5 BTC @ $45,000', time: '10:30:15' },
      { id: 2, action: 'Order Placed', symbol: 'ETH/USDT', details: '2.0 ETH @ $3,200', time: '10:32:22' },
      { id: 3, action: 'Order Cancelled', symbol: 'SOL/USDT', details: '10 SOL @ $150', time: '10:35:08' }
    ]

    setOrders(mockOrders)
    setPositions(mockPositions)
    setHistory(mockHistory)
  }, [])

  const tabs = [
    { id: 'trading', label: 'Trading', icon: '📈' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'positions', label: 'Positions', icon: '💼' },
    { id: 'history', label: 'History', icon: '📊' }
  ]

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'CANCELLED' } : order
    ))
  }

  const closePosition = (symbol) => {
    setPositions(prev => prev.filter(pos => pos.symbol !== symbol))
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
              Professional Trading Terminal
            </h1>
            <p className="text-[var(--text-secondary)] text-center mb-8">
              Advanced trading interface with real-time data and professional tools
            </p>

            {/* Terminal Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
              {/* Left Panel - Trading */}
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Trade</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Symbol</label>
                      <select className="w-full p-3 glass-intense rounded-lg text-white">
                        <option>BTC/USDT</option>
                        <option>ETH/USDT</option>
                        <option>SOL/USDT</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold">
                        Buy
                      </button>
                      <button className="py-2 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold">
                        Sell
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Amount</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full p-3 glass-intense rounded-lg text-white placeholder-white/60"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[var(--text-secondary)] mb-2">Price</label>
                      <input 
                        type="number" 
                        placeholder="0.00"
                        className="w-full p-3 glass-intense rounded-lg text-white placeholder-white/60"
                      />
                    </div>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Panel - Chart */}
              <div className="lg:col-span-2">
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Price Chart</h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs bg-[var(--accent-primary)] text-black rounded">1H</button>
                      <button className="px-3 py-1 text-xs glass-intense rounded">4H</button>
                      <button className="px-3 py-1 text-xs glass-intense rounded">1D</button>
                    </div>
                  </div>
                  
                  <div className="h-64 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <p className="text-[var(--text-secondary)]">Trading Chart</p>
                      <p className="text-sm text-[var(--text-secondary)]">Real-time price data</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Market Data */}
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">Market Data</h3>
                  
                  <div className="space-y-3">
                    {[
                      { symbol: 'BTC/USDT', price: '45,200', change: '+2.5%', volume: '1.2B' },
                      { symbol: 'ETH/USDT', price: '3,180', change: '-1.2%', volume: '800M' },
                      { symbol: 'SOL/USDT', price: '148', change: '+5.8%', volume: '300M' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 glass-intense rounded-lg">
                        <div>
                          <div className="text-white font-semibold">{item.symbol}</div>
                          <div className="text-[var(--text-secondary)] text-sm">{item.volume}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-white">${item.price}</div>
                          <div className={`text-sm ${item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel - Tabs */}
            <div className="mt-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex gap-4 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-[var(--accent-primary)] text-black'
                          : 'glass-intense text-white hover:bg-white/10'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'orders' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-4 text-sm text-[var(--text-secondary)] font-semibold pb-2 border-b border-white/10">
                      <div>Symbol</div>
                      <div>Side</div>
                      <div>Type</div>
                      <div>Amount</div>
                      <div>Price</div>
                      <div>Actions</div>
                    </div>
                    {orders.map((order) => (
                      <div key={order.id} className="grid grid-cols-6 gap-4 text-sm text-white py-2">
                        <div>{order.symbol}</div>
                        <div className={order.side === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>
                          {order.side}
                        </div>
                        <div>{order.type}</div>
                        <div>{order.amount}</div>
                        <div>${order.price.toLocaleString()}</div>
                        <div>
                          {order.status === 'PENDING' && (
                            <button 
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs"
                            >
                              Cancel
                            </button>
                          )}
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${
                            order.status === 'FILLED' ? 'bg-emerald-600' :
                            order.status === 'PENDING' ? 'bg-yellow-600' : 'bg-gray-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'positions' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-6 gap-4 text-sm text-[var(--text-secondary)] font-semibold pb-2 border-b border-white/10">
                      <div>Symbol</div>
                      <div>Size</div>
                      <div>Entry Price</div>
                      <div>Mark Price</div>
                      <div>PnL</div>
                      <div>Actions</div>
                    </div>
                    {positions.map((position, index) => (
                      <div key={index} className="grid grid-cols-6 gap-4 text-sm text-white py-2">
                        <div>{position.symbol}</div>
                        <div>{position.size}</div>
                        <div>${position.entryPrice.toLocaleString()}</div>
                        <div>${position.markPrice.toLocaleString()}</div>
                        <div className={position.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          ${position.pnl} ({position.pnlPercent}%)
                        </div>
                        <div>
                          <button 
                            onClick={() => closePosition(position.symbol)}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-4 text-sm text-[var(--text-secondary)] font-semibold pb-2 border-b border-white/10">
                      <div>Time</div>
                      <div>Action</div>
                      <div>Symbol</div>
                      <div>Details</div>
                    </div>
                    {history.map((item) => (
                      <div key={item.id} className="grid grid-cols-4 gap-4 text-sm text-white py-2">
                        <div>{item.time}</div>
                        <div>{item.action}</div>
                        <div>{item.symbol}</div>
                        <div>{item.details}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'trading' && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced Trading Tools</h3>
                    <p className="text-[var(--text-secondary)] mb-6">
                      Use the trading panel on the left to place orders and monitor your positions
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="glass-intense p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">📈</div>
                        <div className="text-sm text-white">Market Orders</div>
                      </div>
                      <div className="glass-intense p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-sm text-white">Limit Orders</div>
                      </div>
                      <div className="glass-intense p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">⚡</div>
                        <div className="text-sm text-white">Stop Loss</div>
                      </div>
                      <div className="glass-intense p-4 rounded-lg text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm text-white">Take Profit</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Terminal
