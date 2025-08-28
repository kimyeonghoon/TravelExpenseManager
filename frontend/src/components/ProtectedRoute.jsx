import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './ui/LoadingSpinner'

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // 로딩 중일 때 스피너 표시
  if (loading) {
    return <LoadingSpinner size="lg" text="인증 상태를 확인하는 중..." />
  }

  // 인증이 필요한 페이지인데 로그인되지 않은 경우
  if (requireAuth && !isAuthenticated) {
    // 로그인 후 원래 페이지로 리다이렉트하기 위해 현재 위치 저장
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // 이미 로그인된 사용자가 로그인 페이지에 접근하려는 경우
  if (!requireAuth && isAuthenticated) {
    // 개인 지출 내역 페이지로 리다이렉트
    return <Navigate to="/personal" replace />
  }

  // 정상적으로 페이지 렌더링
  return children
}

export default ProtectedRoute
