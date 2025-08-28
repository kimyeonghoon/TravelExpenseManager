import React from 'react'
import ExpenseTable from '../components/ExpenseTable'

const HomePage = () => {
  return (
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          일본 여행 지출 내역
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          다른 여행자들의 지출 내역을 참고하여 효율적인 여행 계획을 세워보세요.
          로그인하면 개인 지출 내역도 관리할 수 있습니다.
        </p>
      </div>

      {/* 공개 지출 내역 테이블 */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            공개 지출 내역
          </h3>
          <div className="text-sm text-gray-500">
            최신 순으로 정렬됨
          </div>
        </div>
        
        <ExpenseTable />
      </div>
    </div>
  )
}

export default HomePage
