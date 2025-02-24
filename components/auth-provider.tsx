"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  email: string
  name: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true,
})

const AUTH_STORAGE_KEY = "auth_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  // Handle auth-required routes
  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ["/login", "/register"]
      const isPublicPath = publicPaths.includes(pathname)

      if (!user && !isPublicPath) {
        router.push("/login")
      } else if (user && isPublicPath) {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      // Mock login - in a real app, this would validate against your backend
      if (email === "test@example.com" && password === "password") {
        const user = {
          id: "1",
          email,
          name: "Test User",
        }
        setUser(user)
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred",
      })
      throw error
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      // Mock registration - in a real app, this would create a user in your backend
      const user = {
        id: "1",
        email,
        name,
      }
      setUser(user)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred",
      })
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  if (isLoading) {
    return null // or a loading spinner
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

