import React, { useState } from 'react'
import LoginModal from './LoginModal'

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUserInfo(userData)
    setIsLoginModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserInfo(null)
    // TODO: JWT 토큰 제거 및 로그아웃 API 호출
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 제목 */}
          <div className="flex items-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
              🇯🇵 <span className="hidden sm:inline">일본 여행 지출 관리</span>
              <span className="sm:hidden">지출 관리</span>
            </h1>
          </div>

          {/* 우측 상단 로그인/사용자 정보 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="hidden sm:block text-gray-700 text-sm">
                  안녕하세요, {userInfo?.nickname || '사용자'}님!
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </header>
  )
}

export default Header
