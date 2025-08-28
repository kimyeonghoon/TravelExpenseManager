import api from './api'
import { mockExpenses, mockApiResponse, mockApiError } from './mockData'

// 지출 내역 타입 정의
export const EXPENSE_CATEGORIES = {
  ACCOMMODATION: '숙박',
  TRANSPORTATION: '교통',
  FOOD: '식비',
  ENTERTAINMENT: '입장료',
  SHOPPING: '쇼핑',
  OTHER: '기타'
}

export const PAYMENT_METHODS = {
  CREDIT_CARD: '신용카드',
  CASH: '현금',
  ONLINE: '온라인결제',
  DEBIT_CARD: '체크카드',
  MOBILE: '모바일결제'
}

// 개발 모드에서 모킹 데이터 사용
const USE_MOCK_DATA = import.meta.env.DEV

// 개발 모드용 인메모리 DB (개인 지출)
let mockPersonalDb = mockExpenses.map((e, idx) => ({
  ...e,
  id: idx + 1,
  is_deleted: false,
  user_id: 1,
}))

// 공개 지출 내역 조회
export const getPublicExpenses = async () => {
  if (USE_MOCK_DATA) {
    // 개발 모드에서는 모킹 데이터 반환
    const response = await mockApiResponse(mockExpenses, 800)
    return response.data
  }
  
  try {
    const response = await api.get('/api/expenses/public')
    return response.data
  } catch (error) {
    console.error('공개 지출 내역 조회 실패:', error)
    throw error
  }
}

// 개인 지출 내역 조회
export const getPersonalExpenses = async () => {
  if (USE_MOCK_DATA) {
    // 개발 모드: 인메모리 DB 조회 (논리삭제 제외)
    const data = mockPersonalDb.filter((e) => !e.is_deleted)
    const response = await mockApiResponse(data, 300)
    return response.data
  }
  try {
    const response = await api.get('/api/expenses/')
    return response.data
  } catch (error) {
    console.error('개인 지출 내역 조회 실패:', error)
    throw error
  }
}

// 지출 내역 등록
export const createExpense = async (expenseData) => {
  if (USE_MOCK_DATA) {
    const now = new Date().toISOString()
    const newItem = {
      id: mockPersonalDb.length ? Math.max(...mockPersonalDb.map((e) => e.id)) + 1 : 1,
      is_deleted: false,
      user_id: 1,
      created_at: now,
      updated_at: now,
      ...expenseData,
    }
    mockPersonalDb = [...mockPersonalDb, newItem]
    const response = await mockApiResponse(newItem, 200)
    return response.data
  }
  try {
    const response = await api.post('/api/expenses/', expenseData)
    return response.data
  } catch (error) {
    console.error('지출 내역 등록 실패:', error)
    throw error
  }
}

// 지출 내역 수정
export const updateExpense = async (id, expenseData) => {
  if (USE_MOCK_DATA) {
    const index = mockPersonalDb.findIndex((e) => e.id === Number(id))
    if (index === -1) {
      throw new Error('지출 내역을 찾을 수 없습니다.')
    }
    const updated = {
      ...mockPersonalDb[index],
      ...expenseData,
      updated_at: new Date().toISOString(),
    }
    mockPersonalDb[index] = updated
    const response = await mockApiResponse(updated, 200)
    return response.data
  }
  try {
    const response = await api.put(`/api/expenses/${id}`, expenseData)
    return response.data
  } catch (error) {
    console.error('지출 내역 수정 실패:', error)
    throw error
  }
}

// 지출 내역 삭제 (논리 삭제)
export const deleteExpense = async (id) => {
  if (USE_MOCK_DATA) {
    const index = mockPersonalDb.findIndex((e) => e.id === Number(id))
    if (index === -1) {
      throw new Error('지출 내역을 찾을 수 없습니다.')
    }
    mockPersonalDb[index] = {
      ...mockPersonalDb[index],
      is_deleted: true,
      updated_at: new Date().toISOString(),
    }
    const response = await mockApiResponse({ success: true }, 150)
    return response.data
  }
  try {
    const response = await api.delete(`/api/expenses/${id}`)
    return response.data
  } catch (error) {
    console.error('지출 내역 삭제 실패:', error)
    throw error
  }
}
