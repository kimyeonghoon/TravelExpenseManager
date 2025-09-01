import React from 'react'

const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rectangular' 
}) => {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]'
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
    avatar: 'rounded-full w-10 h-10'
  }

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    animation: 'shimmer 2s infinite'
  }

  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
      />
    </>
  )
}

// 테이블용 스켈레톤
export const TableSkeleton = ({ rows = 5, columns = 6 }) => (
  <div className="space-y-4">
    {/* 데스크톱 테이블 스켈레톤 */}
    <div className="hidden sm:block">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              {Array(columns).fill().map((_, idx) => (
                <th key={idx} className="px-6 py-3">
                  <Skeleton height="1rem" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array(rows).fill().map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array(columns).fill().map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    <Skeleton height="1rem" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* 모바일 카드 스켈레톤 */}
    <div className="block sm:hidden space-y-3">
      {Array(rows).fill().map((_, idx) => (
        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <Skeleton width="60px" height="1.5rem" variant="rectangular" />
              <Skeleton width="50px" height="1rem" variant="rectangular" />
            </div>
            <Skeleton width="30px" height="1rem" />
          </div>
          <Skeleton width="80px" height="1.2rem" className="mb-1" />
          <Skeleton width="120px" height="0.8rem" className="mb-1" />
          <Skeleton width="100%" height="0.8rem" />
        </div>
      ))}
    </div>
  </div>
)

// 폼용 스켈레톤
export const FormSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Skeleton width="60px" height="1rem" className="mb-2" />
        <Skeleton height="2.5rem" />
      </div>
      <div>
        <Skeleton width="80px" height="1rem" className="mb-2" />
        <Skeleton height="2.5rem" />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Skeleton width="50px" height="1rem" className="mb-2" />
        <Skeleton height="2.5rem" />
      </div>
      <div>
        <Skeleton width="70px" height="1rem" className="mb-2" />
        <Skeleton height="2.5rem" />
      </div>
    </div>
    <div>
      <Skeleton width="40px" height="1rem" className="mb-2" />
      <Skeleton height="6rem" />
    </div>
  </div>
)

export default Skeleton