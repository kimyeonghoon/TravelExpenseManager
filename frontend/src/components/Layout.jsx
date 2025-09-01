import React from 'react'
import Header from './Header'
import Footer from './Footer'
import KeyboardShortcutHelp from './ui/KeyboardShortcutHelp'

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {children}
      </main>
      <Footer />
      <KeyboardShortcutHelp />
    </div>
  )
}

export default Layout
