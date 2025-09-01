import React, { useMemo, useCallback } from 'react'
import { useExpenses } from '../hooks/useExpenses'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorMessage from './ui/ErrorMessage'
import { TableSkeleton } from './ui/Skeleton'
import { updateExpense, deleteExpense } from '../services/expenseService'
import ExpenseEditModal from './ExpenseEditModal'
import { useState } from 'react'
import { buildCsv, downloadCsv } from '../utils/csv'
import { useToast } from '../contexts/ToastContext'

// 내부 컴포넌트: window 이벤트를 통해 상위 페이지 버튼과 브릿지
const EventBridge = ({ onExport }) => {
  React.useEffect(() => {
    const handler = () => onExport?.()
    window.addEventListener('expense:export', handler)
    return () => window.removeEventListener('expense:export', handler)
  }, [onExport])
  return null
}

const ExpenseTable = ({ type = 'public', refreshKey = 0, filters, pageSize = 10, initialPage = 1, onPageChange }) => {
  // 모든 훅은 조건문/조기 반환보다 먼저 호출되어야 함
  const { expenses, loading, error, refreshExpenses } = useExpenses(type, refreshKey)
  const [editTarget, setEditTarget] = useState(null)
  const [page, setPage] = useState(initialPage)
  const { show } = useToast()

  const handleQuickEditNote = useCallback(async (expense) => {
    const next = window.prompt('비고를 수정하세요', expense.note || '')
    if (next === null) return
    try {
      await updateExpense(expense.id, { note: next })
      await refreshExpenses()
      show('메모가 수정되었습니다.', { type: 'success' })
    } catch (e) {
      show('수정 실패: ' + (e.message || '알 수 없는 오류'), { type: 'error' })
    }
  }, [show, refreshExpenses])

  const handleDelete = useCallback(async (expense) => {
    const ok = window.confirm('이 지출을 삭제하시겠습니까? (논리 삭제)')
    if (!ok) return
    try {
      await deleteExpense(expense.id)
      await refreshExpenses()
      show('항목이 삭제되었습니다.', { type: 'success' })
    } catch (e) {
      show('삭제 실패: ' + (e.message || '알 수 없는 오류'), { type: 'error' })
    }
  }, [show, refreshExpenses])

  // 필터/정렬 적용 - 메모이제이션으로 성능 최적화 (조건부 반환 전에 위치)
  const filteredAndSortedExpenses = useMemo(() => {
    if (!expenses) return []
    
    const applyFilters = (list) => {
      let data = [...list]
      if (filters) {
        const { category, paymentMethod, minAmount, maxAmount, search, sortKey = 'date', sortDir = 'asc' } = filters
        if (category) data = data.filter((e) => e.category === category)
        if (paymentMethod) data = data.filter((e) => e.paymentMethod === paymentMethod)
        if (minAmount) data = data.filter((e) => Number(e.amount) >= Number(minAmount))
        if (maxAmount) data = data.filter((e) => Number(e.amount) <= Number(maxAmount))
        if (search) {
          const q = search.toLowerCase()
          data = data.filter((e) =>
            (e.note || '').toLowerCase().includes(q) ||
            (e.category || '').toLowerCase().includes(q) ||
            (e.paymentMethod || '').toLowerCase().includes(q)
          )
        }
        data.sort((a, b) => {
          let A = a[sortKey]
          let B = b[sortKey]
          if (sortKey === 'date') {
            A = new Date(a.date).getTime(); B = new Date(b.date).getTime()
          }
          if (sortKey === 'amount') {
            A = Number(a.amount); B = Number(b.amount)
          }
          if (A < B) return sortDir === 'asc' ? -1 : 1
          if (A > B) return sortDir === 'asc' ? 1 : -1
          return 0
        })
      }
      return data
    }
    
    return applyFilters(expenses)
  }, [expenses, filters])

  const shown = filteredAndSortedExpenses
  const total = shown.length
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, Number(pageSize))))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const pageItems = shown.slice(start, end)

  const setPageSafe = (p) => {
    const np = Math.min(Math.max(1, p), totalPages)
    setPage(np)
    onPageChange?.(np)
  }

  const exportCsv = () => {
    const rows = shown.map((e) => ({
      date: e.date,
      category: e.category,
      amount: e.amount,
      paymentMethod: e.paymentMethod,
      note: e.note || '',
    }))
    const csv = buildCsv(rows, ['date', 'category', 'amount', 'paymentMethod', 'note'])
    const filename = type === 'personal' ? 'personal_expenses.csv' : 'public_expenses.csv'
    downloadCsv(filename, csv)
  }

  // 로딩 상태 - 스켈레톤 UI 사용
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">지출 내역을 불러오는 중...</div>
        </div>
        <TableSkeleton rows={pageSize || 10} />
      </div>
    )
  }

  // 에러 상태
  if (error) {
    return (
      <ErrorMessage 
        error={error} 
        onRetry={refreshExpenses}
        title="지출 내역을 불러올 수 없습니다"
      />
    )
  }

  // 데이터가 없는 경우
  if (!shown || shown.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📝</div>
        <p className="text-gray-500">등록된 지출 내역이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 내보내기 이벤트 리스너 (Personal 페이지 버튼과 연결) */}
      {type === 'personal' && (
        <EventBridge onExport={exportCsv} />
      )}
      {/* 모바일용 카드 뷰 */}
      <div className="block sm:hidden space-y-3">
        {pageItems.map((expense) => (
          <div key={expense.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {expense.category}
                  </span>
                  <span className="text-sm text-gray-500">{expense.paymentMethod}</span>
                </div>
                <p className="text-sm text-gray-900 font-medium">
                  ¥{expense.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-600">{expense.date}</p>
                {expense.note && (
                  <p className="text-xs text-gray-500 mt-1">{expense.note}</p>
                )}
              </div>
              {type === 'personal' && (
                <div className="flex flex-col items-end space-y-2 ml-3">
                  <button onClick={() => handleQuickEditNote(expense)} className="text-xs text-primary-600 hover:underline">메모 수정</button>
                  <button onClick={() => setEditTarget(expense)} className="text-xs text-primary-600 hover:underline">상세 수정</button>
                  <button onClick={() => handleDelete(expense)} className="text-xs text-red-600 hover:underline">삭제</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 데스크톱용 테이블 뷰 */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                날짜/시간
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                항목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                금액 (¥)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                결제방식
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                비고
              </th>
              {type === 'personal' && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pageItems.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  ¥{expense.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.note}
                </td>
                {type === 'personal' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button onClick={() => handleQuickEditNote(expense)} className="text-primary-600 hover:underline mr-3">메모 수정</button>
                    <button onClick={() => setEditTarget(expense)} className="text-primary-600 hover:underline mr-3">상세 수정</button>
                    <button onClick={() => handleDelete(expense)} className="text-red-600 hover:underline">삭제</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {type === 'personal' && (
        <ExpenseEditModal 
          isOpen={!!editTarget} 
          onClose={() => setEditTarget(null)} 
          expense={editTarget} 
          onUpdated={refreshExpenses}
        />
      )}
      
      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-600">
          {total}건 중 {(start + 1)}-{Math.min(end, total)} 표시
        </div>
        <div className="inline-flex items-center space-x-1">
          <button onClick={() => setPageSafe(1)} disabled={currentPage === 1} className="px-2 py-1 text-sm border rounded disabled:opacity-40">≪</button>
          <button onClick={() => setPageSafe(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 text-sm border rounded disabled:opacity-40">이전</button>
          <span className="px-2 text-sm">{currentPage} / {totalPages}</span>
          <button onClick={() => setPageSafe(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 text-sm border rounded disabled:opacity-40">다음</button>
          <button onClick={() => setPageSafe(totalPages)} disabled={currentPage === totalPages} className="px-2 py-1 text-sm border rounded disabled:opacity-40">≫</button>
        </div>
      </div>

      {/* 데이터 새로고침 버튼 */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={refreshExpenses}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>새로고침</span>
        </button>
      </div>
    </div>
  )
}

export default React.memo(ExpenseTable)
