import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PersonalExpensePage from './pages/PersonalExpensePage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/personal" 
                element={
                  <ProtectedRoute>
                    <PersonalExpensePage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
