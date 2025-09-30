import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'

const AIAssistant = () => {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = { text: inputMessage, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputMessage }),
      })

      const data = await response.json()
      const aiMessage = { text: data.response, sender: 'ai' }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = [
    "How do I start crypto trading?",
    "What is Bitcoin?",
    "Explain Ethereum smart contracts",
    "Best crypto trading strategies",
    "How to analyze market trends?"
  ]

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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2 text-center">
              AI Trading Assistant
            </h1>
            <p className="text-[var(--text-secondary)] text-center mb-8">
              Get instant answers to your crypto trading questions
            </p>

            {/* Chat Container */}
            <div className="glass rounded-2xl p-6 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-[var(--text-secondary)] py-8">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-lg mb-4">Ask me anything about crypto trading!</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputMessage(question)}
                          className="p-3 text-left glass-intense rounded-lg hover:bg-white/20 transition-all"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black'
                            : 'glass-intense text-white'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === 'ai' && (
                            <div className="text-2xl">🤖</div>
                          )}
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.text}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="glass-intense p-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl">🤖</div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about crypto trading..."
                  className="flex-1 p-4 glass-intense rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="px-6 py-4 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default AIAssistant
