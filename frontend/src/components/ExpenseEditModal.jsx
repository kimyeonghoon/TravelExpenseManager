import React, { useState, useEffect } from 'react'
import Button from './ui/Button'
import { updateExpense, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../services/expenseService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toStorageDateString } from '../utils/date'

const ExpenseEditModal = ({ isOpen, onClose, expense, onUpdated }) => {
  const [form, setForm] = useState({
    category: '',
    amount: '',
    paymentMethod: '',
    note: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (expense) {
      setForm({
        category: expense.category || '',
        amount: String(expense.amount ?? ''),
        paymentMethod: expense.paymentMethod || '',
        note: expense.note || ''
      })
    }
  }, [expense])

  if (!isOpen || !expense) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        category: form.category,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        note: form.note,
      }
      await updateExpense(expense.id, payload)
      onUpdated?.()
      onClose()
    } catch (err) {
      console.error('지출 수정 실패:', err)
      alert('지출 수정 실패: ' + (err.message || '알 수 없는 오류'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">지출 수정</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">날짜/시간</div>
            <div className="text-sm font-medium text-gray-900">{expense.date}</div>
            <div className="text-xs text-gray-500">날짜/시간은 여기서 수정할 수 없습니다.</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">카테고리</label>
              <select name="category" value={form.category} onChange={handleChange} required className="input-field w-full">
                <option value="" disabled>선택</option>
                {Object.values(EXPENSE_CATEGORIES).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">금액(¥)</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" required className="input-field w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">결제수단</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required className="input-field w-full">
                <option value="" disabled>선택</option>
                {Object.values(PAYMENT_METHODS).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">메모</label>
              <input type="text" name="note" value={form.note} onChange={handleChange} className="input-field w-full" />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose} disabled={submitting}>취소</Button>
            <Button type="submit" variant="primary" disabled={submitting}>{submitting ? '저장 중...' : '저장'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExpenseEditModal
