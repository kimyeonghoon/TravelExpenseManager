import React from 'react'

const ExpenseTable = () => {
  // 테스트용 더미 데이터
  const dummyExpenses = [
    {
      id: 1,
      date: '2024-01-15 14:30',
      category: '숙박',
      amount: 15000,
      paymentMethod: '신용카드',
      note: '도쿄 호텔 1박'
    },
    {
      id: 2,
      date: '2024-01-15 12:00',
      category: '식비',
      amount: 3000,
      paymentMethod: '현금',
      note: '라멘점 점심'
    },
    {
      id: 3,
      date: '2024-01-15 10:00',
      category: '교통',
      amount: 500,
      paymentMethod: '현금',
      note: '지하철 요금'
    }
  ]

  return (
    <div className="space-y-4">
      {/* 모바일용 카드 뷰 */}
      <div className="block sm:hidden space-y-3">
        {dummyExpenses.map((expense) => (
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
            {dummyExpenses.map((expense) => (
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
      
      {/* 테스트용 안내 메시지 */}
      <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs sm:text-sm text-blue-800">
          🧪 <strong>테스트 모드</strong> - 현재 더미 데이터로 표시 중입니다.
          <span className="hidden sm:inline"> Phase 2에서 실제 API 연동이 구현될 예정입니다.</span>
          <span className="sm:hidden"> Phase 2에서 API 연동 예정.</span>
        </p>
      </div>
    </div>
  )
}

export default ExpenseTable
