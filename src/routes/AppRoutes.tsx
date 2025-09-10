import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import HomePage from '../pages/HomePage/HomePage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import DetailedPage from '../pages/DetailedPage/DetailedPage';
import useAuth from '../hooks/useAuth';
import { DETAILEDPAGE__URL, HOMEPAGE__URL, LOGINPAGE__URL } from '../const/routes';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
        <Routes>
            <Route path={HOMEPAGE__URL} element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}> 
                    <HomePage/>
                </ProtectedRoute>
            }/>
            <Route path={DETAILEDPAGE__URL} element={
                <ProtectedRoute isAuthenticated={isAuthenticated()}>
                    <DetailedPage />
                </ProtectedRoute>
            }/>
            <Route path={LOGINPAGE__URL} element={<LoginPage/>}/>
        </Routes>
  );
};