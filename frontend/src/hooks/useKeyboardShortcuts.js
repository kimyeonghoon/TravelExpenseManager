import { useEffect } from 'react'

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ignore shortcuts when user is typing in input fields
      if (
        event.target.tagName === 'INPUT' ||
        event.target.tagName === 'TEXTAREA' ||
        event.target.tagName === 'SELECT' ||
        event.target.isContentEditable
      ) {
        return
      }

      const key = event.key.toLowerCase()
      const ctrl = event.ctrlKey || event.metaKey
      const alt = event.altKey
      const shift = event.shiftKey

      // Check each shortcut
      Object.entries(shortcuts).forEach(([shortcut, callback]) => {
        const parts = shortcut.toLowerCase().split('+')
        const targetKey = parts[parts.length - 1]
        const needsCtrl = parts.includes('ctrl') || parts.includes('cmd')
        const needsAlt = parts.includes('alt')
        const needsShift = parts.includes('shift')

        if (
          key === targetKey &&
          ctrl === needsCtrl &&
          alt === needsAlt &&
          shift === needsShift
        ) {
          event.preventDefault()
          callback(event)
        }
      })
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [shortcuts])
}

export default useKeyboardShortcuts