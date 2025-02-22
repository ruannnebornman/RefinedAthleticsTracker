import type React from "react"
// Simplified version of the toast hook
import { useState } from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastOptions = Omit<Toast, "id">

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ ...props }: ToastOptions) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prevToasts) => [...prevToasts, { id, ...props }])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)
  }

  return {
    toast,
    toasts,
  }
}

