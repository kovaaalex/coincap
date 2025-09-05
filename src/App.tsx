import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/coincap/login' element={<LoginPage/>}></Route>
        </Routes>
      </Router>
  )
}

export default App
