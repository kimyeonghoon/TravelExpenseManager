import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import ExpenseTable from '../components/ExpenseTable'
import ExpenseCreateModal from '../components/ExpenseCreateModal'
import { useState } from 'react'
import Button from '../components/ui/Button'
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../services/expenseService'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const PersonalExpensePage = () => {
  const { user, loading } = useAuth()
  const [openCreate, setOpenCreate] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [filters, setFilters] = useState({
    category: '',
    paymentMethod: '',
    minAmount: '',
    maxAmount: '',
    search: '',
    sortKey: 'date',
    sortDir: 'asc',
  })
  const [pageSize, setPageSize] = useState(10)
  const handleCreated = () => {
    setRefreshKey((k) => k + 1)
  }
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }
  const resetFilters = () => {
    setFilters({ category: '', paymentMethod: '', minAmount: '', maxAmount: '', search: '', sortKey: 'date', sortDir: 'asc' })
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="사용자 정보를 불러오는 중..." />
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-lg mb-2">🔒</div>
        <p className="text-gray-500">로그인이 필요합니다.</p>
      </div>
    )
  }

  return (
    <>
    <div className="space-y-8">
      {/* 페이지 헤더 */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          내 지출 내역
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
          안녕하세요, <span className="font-semibold text-primary-600">{user.name}</span>님!
          개인 지출 내역을 관리하고 다른 여행자들과 공유해보세요.
        </p>
      </div>

      {/* 사용자 정보 카드 */}
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            사용자 정보
          </h3>
          <div className="text-sm text-gray-500">
            로그인: {new Date(user.created_at).toLocaleDateString('ko-KR')}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">이메일</div>
            <div className="font-medium text-gray-900">{user.email}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">이름</div>
            <div className="font-medium text-gray-900">{user.name}</div>
          </div>
        </div>
      </div>

      {/* 개인 지출 내역 테이블 */}
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            개인 지출 내역
          </h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="primary" onClick={() => setOpenCreate(true)}>
              새 지출 등록
            </Button>
            <Button size="sm" variant="outline">
              내보내기
            </Button>
          </div>
        </div>

        {/* 필터/정렬 바 */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 mb-4">
          <input name="search" value={filters.search} onChange={handleFilterChange} placeholder="메모/카테고리/결제 검색" className="input-field w-full sm:col-span-2" />
          <select name="category" value={filters.category} onChange={handleFilterChange} className="input-field w-full">
            <option value="">전체 카테고리</option>
            {Object.values(EXPENSE_CATEGORIES).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select name="paymentMethod" value={filters.paymentMethod} onChange={handleFilterChange} className="input-field w-full">
            <option value="">전체 결제수단</option>
            {Object.values(PAYMENT_METHODS).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input type="number" name="minAmount" value={filters.minAmount} onChange={handleFilterChange} placeholder="최소 금액" className="input-field w-full" />
          <input type="number" name="maxAmount" value={filters.maxAmount} onChange={handleFilterChange} placeholder="최대 금액" className="input-field w-full" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">정렬:</label>
            <select name="sortKey" value={filters.sortKey} onChange={handleFilterChange} className="input-field">
              <option value="date">날짜</option>
              <option value="amount">금액</option>
              <option value="category">카테고리</option>
            </select>
            <select name="sortDir" value={filters.sortDir} onChange={handleFilterChange} className="input-field">
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">페이지 크기:</label>
            <select className="input-field" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <Button size="sm" variant="secondary" onClick={resetFilters}>필터 초기화</Button>
          </div>
        </div>
        
        <ExpenseTable type="personal" refreshKey={refreshKey} filters={filters} pageSize={pageSize} />
      </div>

      {/* 공개 설정 */}
      <div className="card p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            공개 설정
          </h3>
          <div className="text-sm text-gray-500">
            다른 여행자들과 지출 내역을 공유할 수 있습니다
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">지출 내역 공개</div>
              <div className="text-sm text-gray-500">익명으로 다른 여행자들에게 표시됩니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">통계 공개</div>
              <div className="text-sm text-gray-500">카테고리별 지출 통계를 공유합니다</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <ExpenseCreateModal isOpen={openCreate} onClose={() => setOpenCreate(false)} onCreated={handleCreated} />
    </>
  )
}

export default PersonalExpensePage
