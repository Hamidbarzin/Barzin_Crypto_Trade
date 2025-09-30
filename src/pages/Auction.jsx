import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'

const Auction = () => {
  const [auctions, setAuctions] = useState([])
  const [selectedAuction, setSelectedAuction] = useState(null)
  const [bidAmount, setBidAmount] = useState('')

  useEffect(() => {
    // Mock auction data
    const mockAuctions = [
      {
        id: 1,
        title: "Rare Bitcoin NFT Collection",
        description: "Exclusive collection of 10 unique Bitcoin-themed NFTs",
        currentBid: 2.5,
        currency: "ETH",
        timeLeft: "2d 14h 32m",
        image: "/images/Bitcoin_mobile_trading_interface_497078c4.png",
        bids: 24,
        seller: "CryptoCollector"
      },
      {
        id: 2,
        title: "Ethereum Mining Rig",
        description: "High-performance mining setup with 6x RTX 4090 GPUs",
        currentBid: 15.2,
        currency: "ETH",
        timeLeft: "1d 8h 15m",
        image: "/images/Ethereum_mobile_trading_interface_dcd39c2c.png",
        bids: 12,
        seller: "MiningExpert"
      },
      {
        id: 3,
        title: "Solana Validator Node",
        description: "Complete Solana validator setup with staking rewards",
        currentBid: 850,
        currency: "SOL",
        timeLeft: "5h 42m",
        image: "/images/Solana_mobile_trading_interface_13df3436.png",
        bids: 8,
        seller: "ValidatorPro"
      },
      {
        id: 4,
        title: "Cardano Staking Pool",
        description: "Established ADA staking pool with 2M+ ADA delegated",
        currentBid: 12500,
        currency: "ADA",
        timeLeft: "3d 12h 8m",
        image: "/images/Cardano_mobile_trading_interface_aebf9e73.png",
        bids: 18,
        seller: "StakeMaster"
      }
    ]
    setAuctions(mockAuctions)
  }, [])

  const handleBid = (auctionId) => {
    if (!bidAmount || isNaN(parseFloat(bidAmount))) return
    
    const auction = auctions.find(a => a.id === auctionId)
    const bidValue = parseFloat(bidAmount)
    
    if (bidValue <= auction.currentBid) {
      alert('Bid must be higher than current bid')
      return
    }

    setAuctions(prev => prev.map(auction => 
      auction.id === auctionId 
        ? { 
            ...auction, 
            currentBid: bidValue, 
            bids: auction.bids + 1 
          }
        : auction
    ))
    
    setBidAmount('')
    alert('Bid placed successfully!')
  }

  const formatTimeLeft = (timeStr) => {
    return timeStr
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
              Crypto Auctions
            </h1>
            <p className="text-[var(--text-secondary)] text-center mb-8">
              Bid on exclusive crypto assets and trading equipment
            </p>

            {/* Auction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <div key={auction.id} className="glass rounded-2xl overflow-hidden hover:glass-intense transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center">
                    <img 
                      src={auction.image} 
                      alt={auction.title}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                    <div className="text-6xl hidden">🏆</div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{auction.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">{auction.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Current Bid:</span>
                        <span className="text-2xl font-bold text-[var(--accent-primary)]">
                          {auction.currentBid} {auction.currency}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Time Left:</span>
                        <span className="text-red-400 font-mono">{formatTimeLeft(auction.timeLeft)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Bids:</span>
                        <span className="text-white">{auction.bids}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[var(--text-secondary)]">Seller:</span>
                        <span className="text-white">{auction.seller}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <input
                        type="number"
                        placeholder={`Min bid: ${auction.currentBid + 0.1} ${auction.currency}`}
                        value={selectedAuction === auction.id ? bidAmount : ''}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full p-3 glass-intense rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                        onClick={() => setSelectedAuction(auction.id)}
                      />
                      <button
                        onClick={() => handleBid(auction.id)}
                        className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all"
                      >
                        Place Bid
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* How it Works Section */}
            <div className="mt-16 glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">How Crypto Auctions Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Browse & Discover</h3>
                  <p className="text-[var(--text-secondary)]">Explore unique crypto assets, NFTs, and trading equipment</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Place Your Bid</h3>
                  <p className="text-[var(--text-secondary)]">Bid on items you want using various cryptocurrencies</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Win & Claim</h3>
                  <p className="text-[var(--text-secondary)]">Highest bidder wins and receives the item securely</p>
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

export default Auction
