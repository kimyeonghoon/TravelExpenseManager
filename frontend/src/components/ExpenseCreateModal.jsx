import React, { useState } from 'react'
import Button from './ui/Button'
import Input from './ui/Input'
import { createExpense, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../services/expenseService'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toStorageDateString } from '../utils/date'
import ko from 'date-fns/locale/ko'
registerLocale('ko', ko)

const ExpenseCreateModal = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState({
    date: new Date(),
    category: '',
    amount: '',
    paymentMethod: '',
    note: ''
  })
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.category || !form.paymentMethod || !form.amount) {
      alert('카테고리/결제수단/금액을 입력해주세요.')
      return
    }
    if (Number.isNaN(Number(form.amount)) || Number(form.amount) < 0) {
      alert('금액은 0 이상의 숫자여야 합니다.')
      return
    }
    if (Number(form.amount) > 1000000) {
      const ok = confirm('금액이 1,000,000엔을 초과합니다. 계속하시겠습니까?')
      if (!ok) return
    }
    setSubmitting(true)
    try {
      const payload = {
        date: toStorageDateString(form.date),
        category: form.category,
        amount: Number(form.amount),
        paymentMethod: form.paymentMethod,
        note: form.note,
      }
      await createExpense(payload)
      onCreated?.()
      onClose()
    } catch (err) {
      console.error('지출 등록 실패:', err)
      alert('지출 등록 실패: ' + (err.message || '알 수 없는 오류'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">새 지출 등록</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">날짜/시간</label>
              <DatePicker
                selected={form.date}
                onChange={(d) => setForm((prev) => ({ ...prev, date: d || new Date() }))}
                showTimeSelect
                timeIntervals={10}
                dateFormat="yyyy-MM-dd HH:mm"
                locale="ko"
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">금액(¥)</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" className="input-field w-full" />
              <p className="text-xs text-gray-400">0 이상, 1,000,000 초과 시 경고</p>
            </div>
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
              <label className="block text-sm text-gray-700 mb-1">결제수단</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required className="input-field w-full">
                <option value="" disabled>선택</option>
                {Object.values(PAYMENT_METHODS).map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">메모</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={3} maxLength={200} className="input-field w-full" />
            <p className="text-xs text-gray-400 text-right">{(form.note || '').length}/200</p>
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

export default ExpenseCreateModal
