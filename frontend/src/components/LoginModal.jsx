import React, { useState } from 'react'

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [step, setStep] = useState(1) // 1: 이메일 입력, 2: 인증코드 입력
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // TODO: Phase 3에서 실제 API 연동 구현
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1000)
  }

  const handleVerificationSubmit = async (e) => {
    e.preventDefault()
    if (!verificationCode) return
    
    setIsLoading(true)
    // TODO: Phase 3에서 실제 API 연동 구현
    setTimeout(() => {
      setIsLoading(false)
      onLogin({ email, nickname: email.split('@')[0] })
    }, 1000)
  }

  const handleClose = () => {
    setStep(1)
    setEmail('')
    setVerificationCode('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 max-w-md w-full mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {step === 1 ? '로그인' : '인증 코드 입력'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl p-1"
          >
            ×
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일 주소
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="example@email.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isLoading ? '인증 코드 발송 중...' : '인증 코드 발송'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                인증 코드
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="6자리 코드 입력"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {email}로 발송된 인증 코드를 입력해주세요
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading || !verificationCode}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full btn-secondary"
            >
              이메일 다시 입력
            </button>
          </form>
        )}

        {/* 테스트용 안내 메시지 */}
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            🧪 <strong>테스트 모드</strong> - 실제 인증 없이 로그인됩니다.
            Phase 3에서 실제 이메일 인증이 구현될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
