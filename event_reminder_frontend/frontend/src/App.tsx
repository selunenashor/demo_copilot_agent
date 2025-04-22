import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage/LoginPage';
import RegisterPage from '@/pages/RegisterPage/RegisterPage';
import DashboardPage from '@/pages/DashboardPage/DashboardPage';
// Remove default App.css import if not used globally
// import './App.css';

// Helper component for protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Optional: Add a catch-all route or redirect for unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
