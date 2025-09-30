import React, { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      duration: 3000,
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)
    
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const success = useCallback((message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    })
  }, [addNotification])

  const error = useCallback((message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 5000,
      ...options
    })
  }, [addNotification])

  const info = useCallback((message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    })
  }, [addNotification])

  const warning = useCallback((message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    })
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}

const NotificationItem = ({ notification, onRemove }) => {
  const { id, type, message, title } = notification

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-600 border-emerald-500'
      case 'error':
        return 'bg-red-600 border-red-500'
      case 'warning':
        return 'bg-yellow-600 border-yellow-500'
      case 'info':
      default:
        return 'bg-blue-600 border-blue-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  return (
    <div
      className={`glass rounded-lg p-4 border-l-4 ${getTypeStyles()} min-w-80 max-w-96 animate-slide-in`}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
          )}
          <p className="text-white text-sm">{message}</p>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="text-white/70 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default NotificationProvider
