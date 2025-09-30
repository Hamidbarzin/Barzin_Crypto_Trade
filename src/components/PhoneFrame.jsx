import React from 'react'

const PhoneFrame = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative glass-intense rounded-[2.25rem] border-2 border-[var(--glass-border)] overflow-hidden ${className}`}
      style={{ 
        width: 'var(--phone-w)',
        height: 'var(--phone-h)',
        minWidth: '192px',
        minHeight: '380px'
      }}
    >
      {/* Phone Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-b-xl z-10 flex items-center justify-center">
        <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
      </div>
      
      {/* Screen Content */}
      <div className="w-full h-full bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] pt-8">
        {children}
      </div>
      
      {/* Screen Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2.25rem]" />
    </div>
  )
}

export default PhoneFrame