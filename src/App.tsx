import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
            <Route path='/coincap' element={
              <ProtectedRoute> 
                <HomePage/>
              </ProtectedRoute>
            }>
            </Route>
          <Route path='/coincap/login' element={<LoginPage/>}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
      
  )
}

export default App
