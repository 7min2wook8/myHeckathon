"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  location?: string
  interests?: string[]
  skills?: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 더미 사용자 데이터
const DUMMY_USERS = [
  {
    id: "1",
    name: "민욱",
    email: "minwook@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "서울",
    interests: ["창업", "IT", "디자인"],
    skills: ["React", "Node.js", "Python", "UI/UX"],
  },
  {
    id: "2",
    name: "김철수",
    email: "chulsoo@example.com",
    password: "password123",
    avatar: "/placeholder.svg?height=100&width=100",
    location: "부산",
    interests: ["IT", "마케팅"],
    skills: ["Java", "Spring", "MySQL"],
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 저장된 세션 확인
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem("sonani_user")
        const sessionExpiry = localStorage.getItem("sonani_session_expiry")

        if (savedUser && sessionExpiry) {
          const expiryTime = Number.parseInt(sessionExpiry)
          const currentTime = Date.now()

          if (currentTime < expiryTime) {
            // 세션이 유효한 경우
            setUser(JSON.parse(savedUser))
          } else {
            // 세션이 만료된 경우
            localStorage.removeItem("sonani_user")
            localStorage.removeItem("sonani_session_expiry")
          }
        }
      } catch (error) {
        console.error("세션 확인 중 오류:", error)
        localStorage.removeItem("sonani_user")
        localStorage.removeItem("sonani_session_expiry")
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // 자동 로그아웃 타이머 설정
  useEffect(() => {
    if (user) {
      const sessionExpiry = localStorage.getItem("sonani_session_expiry")
      if (sessionExpiry) {
        const expiryTime = Number.parseInt(sessionExpiry)
        const currentTime = Date.now()
        const timeUntilExpiry = expiryTime - currentTime

        if (timeUntilExpiry > 0) {
          const timer = setTimeout(() => {
            logout()
            alert("세션이 만료되어 자동으로 로그아웃되었습니다.")
          }, timeUntilExpiry)

          return () => clearTimeout(timer)
        }
      }
    }
  }, [user])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    // 실제 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const foundUser = DUMMY_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24시간

        // 로컬 스토리지에 사용자 정보와 세션 만료 시간 저장
        localStorage.setItem("sonani_user", JSON.stringify(userWithoutPassword))
        localStorage.setItem("sonani_session_expiry", sessionExpiry.toString())

        setUser(userWithoutPassword)
        setIsLoading(false)

        return { success: true, message: "로그인에 성공했습니다." }
      } else {
        setIsLoading(false)
        return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." }
      }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: "로그인 중 오류가 발생했습니다." }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("sonani_user")
    localStorage.removeItem("sonani_session_expiry")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("sonani_user", JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
