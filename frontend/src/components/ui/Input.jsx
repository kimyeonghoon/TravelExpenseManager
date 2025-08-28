import React from 'react'
import clsx from 'clsx'

const Input = ({ 
  label,
  error,
  hint,
  className = '',
  ...props 
}) => {
  const inputClasses = clsx(
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200',
    {
      'border-gray-300': !error,
      'border-red-500': error,
      'focus:ring-red-500': error
    },
    className
  )
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input 
        className={inputClasses}
        {...props}
      />
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : hint ? (
        <p className="text-xs text-gray-400">{hint}</p>
      ) : null}
    </div>
  )
}

export default Input
