import React from 'react'
import Button from './Button'

const ErrorMessage = ({ 
  error, 
  onRetry, 
  title = '오류가 발생했습니다',
  className = '' 
}) => {
  if (!error) return null

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            {title}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
          {onRetry && (
            <div className="mt-4">
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="text-red-700 border-red-300 hover:bg-red-100"
              >
                다시 시도
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ErrorMessage
