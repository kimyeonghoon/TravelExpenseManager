import React from 'react'
import { useExpenses } from '../hooks/useExpenses'
import LoadingSpinner from './ui/LoadingSpinner'
import ErrorMessage from './ui/ErrorMessage'

const ExpenseTable = ({ type = 'public' }) => {
  const { expenses, loading, error, refreshExpenses } = useExpenses(type)

  // 로딩 상태
  if (loading) {
    return <LoadingSpinner size="lg" text="지출 내역을 불러오는 중..." />
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
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">📝</div>
        <p className="text-gray-500">등록된 지출 내역이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* 모바일용 카드 뷰 */}
      <div className="block sm:hidden space-y-3">
        {expenses.map((expense) => (
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
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
              </tr>
            ))}
          </tbody>
        </table>
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

export default ExpenseTable
