import { useState, useCallback } from 'react'
import { useNotification } from '../contexts/NotificationContext'

export const useAction = (actionFn, options = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const { success, error: showError } = useNotification()

  const {
    successMessage = 'Action completed successfully',
    errorMessage = 'An error occurred',
    showSuccessToast = true,
    showErrorToast = true,
    onSuccess,
    onError
  } = options

  const execute = useCallback(async (...args) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await actionFn(...args)
      setData(result)
      
      if (showSuccessToast && successMessage) {
        success(successMessage)
      }
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
    } catch (err) {
      const errorMsg = err.message || errorMessage
      setError(err)
      
      if (showErrorToast) {
        showError(errorMsg)
      }
      
      if (onError) {
        onError(err)
      }
      
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [actionFn, successMessage, errorMessage, showSuccessToast, showErrorToast, onSuccess, onError, success, showError])

  const reset = useCallback(() => {
    setError(null)
    setData(null)
    setIsLoading(false)
  }, [])

  return {
    execute,
    isLoading,
    error,
    data,
    reset
  }
}

export default useAction
