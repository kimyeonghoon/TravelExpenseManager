import { useState, useEffect, useCallback } from 'react'
import { getPublicExpenses, getPersonalExpenses } from '../services/expenseService'

export const useExpenses = (type = 'public', refreshKey = 0) => {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 지출 내역 조회 함수
  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      let data
      if (type === 'public') {
        data = await getPublicExpenses()
      } else {
        data = await getPersonalExpenses()
      }
      
      // 날짜 기준 오름차순 정렬 (오래된 순)
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))
      setExpenses(sortedData)
    } catch (err) {
      setError(err.message || '지출 내역을 불러오는데 실패했습니다.')
      console.error('지출 내역 조회 에러:', err)
    } finally {
      setLoading(false)
    }
  }, [type])

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses, refreshKey])

  // 데이터 새로고침
  const refreshExpenses = useCallback(() => {
    fetchExpenses()
  }, [fetchExpenses])

  return {
    expenses,
    loading,
    error,
    refreshExpenses
  }
}
