import { ref, readonly } from 'vue'

interface ToastItem {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const toasts = ref<ToastItem[]>([])

export const useToast = () => {
  const showToast = (message: string, type: ToastItem['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast: ToastItem = {
      id,
      message,
      type,
      duration
    }

    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts: readonly(toasts),
    showToast,
    removeToast,
    clearToasts
  }
}