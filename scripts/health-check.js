#!/usr/bin/env node

// Health check script to verify required DOM elements exist
const requiredElements = [
  'app',
  'header', 
  'header-slider',
  'markets',
  'crypto-top20'
]

console.log('🔍 Starting BarzinCrypto Health Check...')

// Wait for DOM to be ready
const checkHealth = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const missingElements = []
      
      requiredElements.forEach(id => {
        const element = document.getElementById(id)
        if (!element) {
          missingElements.push(id)
        }
      })
      
      if (missingElements.length > 0) {
        console.error('❌ Health Check Failed - Missing DOM elements:', missingElements)
        console.error('Required elements:', requiredElements)
        resolve(false)
      } else {
        console.log('✅ Health Check Passed - All required DOM elements found')
        resolve(true)
      }
    }, 2000) // Wait 2 seconds for components to render
  })
}

// For Node.js environment (when running via npm run check)
if (typeof window === 'undefined') {
  console.log('📋 Health check script loaded successfully')
  console.log('Required DOM elements:', requiredElements)
  console.log('Run this in browser environment to verify DOM health')
  process.exit(0)
}

// Export for browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkHealth, requiredElements }
}

// Auto-run in browser
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async () => {
    const isHealthy = await checkHealth()
    if (!isHealthy) {
      console.warn('⚠️  Some components may not have rendered correctly')
    }
  })
}