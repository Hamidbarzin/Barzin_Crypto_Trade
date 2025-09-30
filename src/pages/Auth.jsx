import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from '../components/Footer'

const Auth = () => {
  const location = useLocation()
  const isSignUp = location.pathname === '/auth/signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (isSignUp) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock successful authentication
      console.log('Auth successful:', formData)
      alert(isSignUp ? 'Account created successfully!' : 'Login successful!')
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        agreeToTerms: false
      })
    } catch (error) {
      console.error('Auth error:', error)
      alert('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const socialAuth = (provider) => {
    console.log(`Login with ${provider}`)
    alert(`${provider} authentication coming soon!`)
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
      <div className="relative z-10 min-h-screen flex items-center justify-center" style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-custom py-8">
          <div className="max-w-md mx-auto">
            <div className="glass rounded-2xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🚀
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h1>
                <p className="text-[var(--text-secondary)]">
                  {isSignUp ? 'Join BarzinCrypto and start trading' : 'Sign in to your account'}
                </p>
              </div>

              {/* Social Auth */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => socialAuth('Google')}
                  className="w-full py-3 glass-intense rounded-lg text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <span>🔍</span>
                  Continue with Google
                </button>
                <button
                  onClick={() => socialAuth('Apple')}
                  className="w-full py-3 glass-intense rounded-lg text-white font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                >
                  <span>🍎</span>
                  Continue with Apple
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[var(--bg-primary)] text-[var(--text-secondary)]">Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass-intense rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                        errors.fullName ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-3 glass-intense rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                      errors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full p-3 glass-intense rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                      errors.password ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full p-3 glass-intense rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] ${
                        errors.confirmPassword ? 'ring-2 ring-red-500' : ''
                      }`}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {isSignUp && (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                    <label className="text-sm text-[var(--text-secondary)]">
                      I agree to the{' '}
                      <a href="#" className="text-[var(--accent-primary)] hover:underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-[var(--accent-primary)] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                )}

                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <input type="checkbox" className="rounded" />
                      Remember me
                    </label>
                    <a href="#" className="text-sm text-[var(--accent-primary)] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-[var(--text-secondary)]">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <a 
                    href={isSignUp ? '/auth/signin' : '/auth/signup'} 
                    className="text-[var(--accent-primary)] hover:underline font-semibold"
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Auth
