import { useState } from 'react'
import { Toast } from './toast'

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (description: string, title?: string) => {
    addToast({ type: 'success', description, title })
  }

  const error = (description: string, title?: string) => {
    addToast({ type: 'error', description, title })
  }

  const warning = (description: string, title?: string) => {
    addToast({ type: 'warning', description, title })
  }

  const info = (description: string, title?: string) => {
    addToast({ type: 'info', description, title })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  }
}
