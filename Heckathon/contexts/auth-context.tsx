"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
  phone_number?: string 
}

interface Profile {

    user_id : ""
    full_name?: ""
    bio?: ""
    profile_image_url?: ""
    education?: ""
    experience?: ""
    portfolio_url?: ""
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  getProfile: () => Promise<Profile>
  setProfile: (profileData: Partial<Profile>) => Promise<{ success: boolean; message?: string } | null>
  signUp: (email: string, password: string, username: string, phone: string) => Promise<{ success: boolean; message: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 저장된 세션 확인
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem("EqualLocal_user")
        const sessionExpiry = localStorage.getItem("EqualLocal_session_expiry")

        if (savedUser && sessionExpiry) {
          const expiryTime = Number.parseInt(sessionExpiry)
          const currentTime = Date.now()

          if (currentTime < expiryTime) {
            // 세션이 유효한 경우
            setUser(JSON.parse(savedUser))
          } else {
            // 세션이 만료된 경우
            localStorage.removeItem("EqualLocal_user")
            localStorage.removeItem("EqualLocal_session_expiry")
          }
        }
      } catch (error) {
        console.error("세션 확인 중 오류:", error)
        localStorage.removeItem("EqualLocal_user")
        localStorage.removeItem("EqualLocal_session_expiry")
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  // 자동 로그아웃 타이머 설정
  useEffect(() => {
    if (user) {
      const sessionExpiry = localStorage.getItem("EqualLocal_session_expiry")
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

  const signUp = async (email: string, password: string, username: string, phone: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, phone }),
        credentials: "include", // 세션 쿠키를 받으려면 필요
      })

      if (response.ok) {

        console.log("회원가입 성공:")

        const msRes = await login(email, password)
        if(!msRes.success){
          return msRes
        }else
        {
           console.log("자동 로그인 실행")
        }

        setIsLoading(false)

        return { success: true, message: "회원가입에 성공했습니다." }
      } else {
        const msg = await response.text()
        setIsLoading(false)
        return { success: false, message: msg || "회원가입에 실패했습니다." }
      }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: "회원가입 중 오류가 발생했습니다." }
    }
  }
  
  // 로그인 함수
  // 이메일과 비밀번호를 받아서 로그인 처리
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true)

    
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // 로그인 확인
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 세션 쿠키를 받으려면 필요
      })
      
      if (response.ok) {
        // 로그인 성공 시 사용자 정보 받아오기 (예: /users/me)
        const meRes = await fetch(`${API_BASE_URL}/users/me`, {
          credentials: "include",
        })

        if (!meRes.ok) {
          setIsLoading(false)
          return { success: false, message: "사용자 정보를 불러오지 못했습니다." }
        }
        const userData = await meRes.json()
        const sessionExpiry = Date.now() + 24 * 60 * 60 * 1000 // 24시간

        // 로컬 스토리지에 사용자 정보와 세션 만료 시간 저장
        localStorage.setItem("EqualLocal_user", JSON.stringify(userData))
        localStorage.setItem("EqualLocal_session_expiry", sessionExpiry.toString())

        setUser(await userData)
        setIsLoading(false)

        return { success: true, message: "로그인에 성공했습니다." }
      } else {
        const msg = await response.text()
        setIsLoading(false)
        return { success: false, message: msg || "이메일 또는 비밀번호가 올바르지 않습니다." }
      }
    } catch (error) {
      setIsLoading(false)
      return { success: false, message: "로그인 중 오류가 발생했습니다." }
    }
  }


  // 사용자 정보를 호출하는 함수
  const getUser = async (): Promise<User | null> => {
    
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("사용자 정보를 불러오지 못했습니다.")
      }
      const userData = await response.json()
      return userData
    } catch (error) {
      console.error("사용자 정보 불러오기 오류:", error)
      return null
    }
  }


  const logout = () => {
    setUser(null)
    localStorage.removeItem("EqualLocal_user")
    localStorage.removeItem("EqualLocal_session_expiry")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("EqualLocal_user", JSON.stringify(updatedUser))
    }
  }

  const getProfile = async () => {
    if (!user) return null
    //console.log("getProfile 호출됨, user:", user.id)
    try {
      const response = await fetch(`${API_BASE_URL}/users/getProfile`, {
        method: "POST",
        body: JSON.stringify({ userid : user.id }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",

      })

      if (!response.ok) {
        throw new Error("사용자 정보를 불러오지 못했습니다.")        
      }
      const profileData = await response.json()
      return profileData
    } catch (error) {
      console.error("프로필 불러오기 오류:", error)
      return null
    }
  }

  const setProfile = async (profileData: Partial<Profile>): Promise<{ success: boolean; message?: string } | null> => {
    if (!user) return null

    try {
      const response = await fetch(`${API_BASE_URL}/users/setProfile`, {
        method: "POST",
        body: JSON.stringify({ user_id: user.id, ...profileData }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",        
      })
      if (!response.ok) {
        const msg = await response.text()
        return { success: false, message: msg || "프로필 업데이트에 실패했습니다." }
      }
      // Optionally update user state here if needed
      return { success: true, message: "프로필이 성공적으로 업데이트되었습니다." }
    } catch (error) {
      console.error("프로필 업데이트 오류:", error)
      return { success: false, message: "프로필 업데이트 중 오류가 발생했습니다." }
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    getProfile,
    setProfile,
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
