import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import DetailedPage from '../pages/DetailedPage/DetailedPage';
import useAuth from '../hooks/useAuth';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
        <Routes>
            <Route path='/coincap' element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}> 
                <HomePage/>
                </ProtectedRoute>
            }/>
            <Route path="/coincap/crypto/:id" element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}>
                <DetailedPage />
                </ProtectedRoute>
            }/>
            <Route path='/coincap/login' element={<LoginPage/>}/>
        </Routes>
  );
};