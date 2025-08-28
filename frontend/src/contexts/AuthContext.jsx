import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { 
  requestEmailVerification, 
  verifyEmailCode, 
  logout, 
  getCurrentUser,
  refreshToken 
} from '../services/authService'

// 인증 컨텍스트 생성
const AuthContext = createContext()

// 인증 컨텍스트 사용을 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// 인증 프로바이더 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 초기 인증 상태 확인
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          const userData = await getCurrentUser()
          setUser(userData)
        }
      } catch (err) {
        console.error('인증 상태 초기화 실패:', err)
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // 이메일 인증 코드 요청
  const requestVerification = useCallback(async (email) => {
    setError(null)
    try {
      const response = await requestEmailVerification(email)
      return response
    } catch (err) {
      const errorMessage = err.message || '인증 코드 요청에 실패했습니다.'
      setError(errorMessage)
      throw err
    }
  }, [])

  // 이메일 인증 코드 확인 및 로그인
  const login = useCallback(async (email, code) => {
    setError(null)
    try {
      const response = await verifyEmailCode(email, code)
      
      // 토큰과 사용자 정보 저장
      const { access_token, user: userData } = response
      localStorage.setItem('authToken', access_token)
      setUser(userData)
      
      return response
    } catch (err) {
      const errorMessage = err.message || '로그인에 실패했습니다.'
      setError(errorMessage)
      throw err
    }
  }, [])

  // 로그아웃
  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch (err) {
      console.error('로그아웃 중 오류 발생:', err)
    } finally {
      // 로컬 상태 정리
      localStorage.removeItem('authToken')
      setUser(null)
      setError(null)
    }
  }, [])

  // 토큰 갱신
  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await refreshToken()
      const { access_token } = response
      localStorage.setItem('authToken', access_token)
      return access_token
    } catch (err) {
      console.error('토큰 갱신 실패:', err)
      // 토큰 갱신 실패 시 로그아웃
      await handleLogout()
      throw err
    }
  }, [handleLogout])

  // 에러 초기화
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // 인증 상태 확인
  const isAuthenticated = !!user

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    requestVerification,
    login,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
