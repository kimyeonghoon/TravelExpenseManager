import React, { useState } from 'react'

const KeyboardShortcutHelp = () => {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: 'Ctrl + N', description: '새 지출 등록' },
    { key: 'Ctrl + E', description: 'CSV 내보내기' },
    { key: 'Ctrl + R', description: '데이터 새로고침' },
    { key: 'Esc', description: '모달 닫기' },
    { key: '?', description: '단축키 도움말 (이 창)' },
  ]

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 z-40"
        title="키보드 단축키 도움말 (?)"
        aria-label="키보드 단축키 도움말"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 id="shortcuts-title" className="text-lg font-semibold text-gray-900">
                키보드 단축키
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="도움말 닫기"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-sm text-gray-600">{shortcut.description}</span>
                  <kbd className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded border">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 <strong>팁:</strong> 입력 필드에 포커스가 있을 때는 단축키가 비활성화됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default KeyboardShortcutHelp