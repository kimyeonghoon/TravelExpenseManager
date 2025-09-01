// 입력 데이터 검증 및 새니타이즈 유틸리티

// XSS 방지를 위한 HTML 이스케이프
export const escapeHtml = (unsafe) => {
  if (typeof unsafe !== 'string') return unsafe
  
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

// 텍스트 입력 새니타이즈
export const sanitizeText = (text, maxLength = 500) => {
  if (!text || typeof text !== 'string') return ''
  
  // HTML 태그 제거
  const sanitized = text
    .replace(/<[^>]*>/g, '') // HTML 태그 제거
    .replace(/javascript:/gi, '') // 자바스크립트 프로토콜 제거
    .replace(/on\w+=/gi, '') // 이벤트 핸들러 제거
    .trim()
    .substring(0, maxLength)
  
  return sanitized
}

// 이메일 유효성 검증
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: '이메일을 입력해주세요.' }
  }
  
  const sanitized = email.trim().toLowerCase()
  
  if (sanitized.length > 254) {
    return { isValid: false, error: '이메일이 너무 깁니다.' }
  }
  
  if (!emailRegex.test(sanitized)) {
    return { isValid: false, error: '올바른 이메일 형식이 아닙니다.' }
  }
  
  return { isValid: true, value: sanitized }
}

// 금액 유효성 검증
export const validateAmount = (amount) => {
  if (!amount && amount !== 0) {
    return { isValid: false, error: '금액을 입력해주세요.' }
  }
  
  const numAmount = Number(amount)
  
  if (Number.isNaN(numAmount)) {
    return { isValid: false, error: '올바른 숫자를 입력해주세요.' }
  }
  
  if (numAmount < 0) {
    return { isValid: false, error: '금액은 0 이상이어야 합니다.' }
  }
  
  if (numAmount > 10000000) {
    return { isValid: false, error: '금액이 너무 큽니다. (최대: 10,000,000엔)' }
  }
  
  // 소수점 둘째 자리까지만 허용
  if (numAmount % 0.01 !== 0) {
    return { isValid: false, error: '소수점 둘째 자리까지만 입력 가능합니다.' }
  }
  
  return { isValid: true, value: numAmount }
}

// 인증 코드 검증
export const validateVerificationCode = (code) => {
  if (!code || typeof code !== 'string') {
    return { isValid: false, error: '인증 코드를 입력해주세요.' }
  }
  
  const sanitized = code.trim().replace(/\D/g, '') // 숫자만 추출
  
  if (sanitized.length < 4 || sanitized.length > 8) {
    return { isValid: false, error: '인증 코드는 4-8자리 숫자여야 합니다.' }
  }
  
  return { isValid: true, value: sanitized }
}

// 지출 데이터 전체 검증
export const validateExpenseData = (data) => {
  const errors = {}
  
  // 카테고리 검증
  if (!data.category || typeof data.category !== 'string') {
    errors.category = '카테고리를 선택해주세요.'
  } else if (data.category.length > 50) {
    errors.category = '카테고리가 너무 깁니다.'
  }
  
  // 결제 방식 검증
  if (!data.paymentMethod || typeof data.paymentMethod !== 'string') {
    errors.paymentMethod = '결제 방식을 선택해주세요.'
  } else if (data.paymentMethod.length > 50) {
    errors.paymentMethod = '결제 방식이 너무 깁니다.'
  }
  
  // 금액 검증
  const amountValidation = validateAmount(data.amount)
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.error
  }
  
  // 날짜 검증
  if (!data.date) {
    errors.date = '날짜를 선택해주세요.'
  } else {
    const date = new Date(data.date)
    const now = new Date()
    const maxFutureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1일 후까지 허용
    
    if (date > maxFutureDate) {
      errors.date = '미래 날짜는 선택할 수 없습니다.'
    }
    
    if (date < new Date('2000-01-01')) {
      errors.date = '너무 오래된 날짜입니다.'
    }
  }
  
  // 메모 검증 (선택사항)
  if (data.note && typeof data.note === 'string') {
    if (data.note.length > 500) {
      errors.note = '메모는 500자 이하로 입력해주세요.'
    }
    // 메모 새니타이즈
    data.note = sanitizeText(data.note, 500)
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      ...data,
      category: sanitizeText(data.category, 50),
      paymentMethod: sanitizeText(data.paymentMethod, 50),
      note: data.note ? sanitizeText(data.note, 500) : ''
    }
  }
}

// URL 안전성 검증
export const isSafeUrl = (url) => {
  try {
    const parsedUrl = new URL(url)
    return ['http:', 'https:'].includes(parsedUrl.protocol)
  } catch {
    return false
  }
}

export default {
  escapeHtml,
  sanitizeText,
  validateEmail,
  validateAmount,
  validateVerificationCode,
  validateExpenseData,
  isSafeUrl
}