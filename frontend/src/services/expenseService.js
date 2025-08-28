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
  try {
    const response = await api.delete(`/api/expenses/${id}`)
    return response.data
  } catch (error) {
    console.error('지출 내역 삭제 실패:', error)
    throw error
  }
}
