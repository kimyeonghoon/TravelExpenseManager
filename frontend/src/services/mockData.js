// 테스트용 더미 데이터
export const mockExpenses = [
  {
    id: 1,
    date: '2024-01-15 10:00',
    category: '교통',
    amount: 500,
    paymentMethod: '현금',
    note: '지하철 요금',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    date: '2024-01-15 12:00',
    category: '식비',
    amount: 3000,
    paymentMethod: '현금',
    note: '라멘점 점심',
    created_at: '2024-01-15T12:00:00Z'
  },
  {
    id: 3,
    date: '2024-01-15 14:30',
    category: '숙박',
    amount: 15000,
    paymentMethod: '신용카드',
    note: '도쿄 호텔 1박',
    created_at: '2024-01-15T14:30:00Z'
  },
  {
    id: 4,
    date: '2024-01-15 16:00',
    category: '입장료',
    amount: 2000,
    paymentMethod: '신용카드',
    note: '도쿄 타워 입장료',
    created_at: '2024-01-15T16:00:00Z'
  },
  {
    id: 5,
    date: '2024-01-15 18:00',
    category: '쇼핑',
    amount: 8000,
    paymentMethod: '신용카드',
    note: '기념품 구매',
    created_at: '2024-01-15T18:00:00Z'
  }
]

// 모킹된 API 응답 시뮬레이션
export const mockApiResponse = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data })
    }, delay)
  })
}

// 에러 시뮬레이션 (테스트용)
export const mockApiError = (message = 'API 오류가 발생했습니다', delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(message))
    }, delay)
  })
}
