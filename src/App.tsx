import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'
import DetailedPage from './pages/DetailedPage/DetailedPage'
import useAuth from './hooks/useAuth'

function App() {
  const { isAuthenticated } = useAuth();  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
            <Route path='/coincap' element={
              <ProtectedRoute isAuthenticated={isAuthenticated()}> 
                <HomePage/>
              </ProtectedRoute>
            }>
            </Route>
            <Route path="/coincap/crypto/:id" element={
              <ProtectedRoute isAuthenticated={isAuthenticated()}>
                <DetailedPage />
              </ProtectedRoute>
            } />
          <Route path='/coincap/login' element={<LoginPage/>}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
