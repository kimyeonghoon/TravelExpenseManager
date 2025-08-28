import api from './api'
import { mockApiResponse, mockApiError } from './mockData'

// 개발 모드에서 모킹 데이터 사용
const USE_MOCK_DATA = import.meta.env.DEV

// 이메일 인증 코드 요청
export const requestEmailVerification = async (email) => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 모킹 응답 (1초 후 성공)
    const response = await mockApiResponse({ message: '인증 코드가 이메일로 전송되었습니다.' }, 1000)
    return response.data
  }

  try {
    const response = await api.post('/api/auth/request-verification', { email })
    return response.data
  } catch (error) {
    console.error('이메일 인증 코드 요청 실패:', error)
    throw error
  }
}

// 이메일 인증 코드 확인 및 로그인
export const verifyEmailCode = async (email, code) => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 모킹 응답 (1초 후 성공)
    // 테스트용: 코드가 '123456'이면 성공, 아니면 실패
    if (code === '123456') {
      const mockToken = 'mock_jwt_token_' + Date.now()
      const mockUser = {
        id: 1,
        email: email,
        name: '테스트 사용자',
        created_at: new Date().toISOString()
      }
      
      const response = await mockApiResponse({
        access_token: mockToken,
        token_type: 'bearer',
        user: mockUser
      }, 1000)
      return response.data
    } else {
      throw await mockApiError('잘못된 인증 코드입니다.', 1000)
    }
  }

  try {
    const response = await api.post('/api/auth/verify-code', { email, code })
    return response.data
  } catch (error) {
    console.error('이메일 인증 코드 확인 실패:', error)
    throw error
  }
}

// 로그아웃
export const logout = async () => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 즉시 성공
    return Promise.resolve({ message: '로그아웃되었습니다.' })
  }

  try {
    const response = await api.post('/api/auth/logout')
    return response.data
  } catch (error) {
    console.error('로그아웃 실패:', error)
    throw error
  }
}

// 현재 사용자 정보 조회
export const getCurrentUser = async () => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 모킹 사용자 정보 반환
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: '테스트 사용자',
      created_at: new Date().toISOString()
    }
    const response = await mockApiResponse(mockUser, 500)
    return response.data
  }

  try {
    const response = await api.get('/api/auth/me')
    return response.data
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

// 토큰 갱신
export const refreshToken = async () => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 모킹 토큰 갱신
    const mockToken = 'mock_jwt_token_refreshed_' + Date.now()
    const response = await mockApiResponse({
      access_token: mockToken,
      token_type: 'bearer'
    }, 500)
    return response.data
  }

  try {
    const response = await api.post('/api/auth/refresh')
    return response.data
  } catch (error) {
    console.error('토큰 갱신 실패:', error)
    throw error
  }
}
