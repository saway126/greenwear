import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DashboardPage from './pages/DashboardPage';
import AlertPage from './pages/AlertPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-600">GreenWear</h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  홈
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  대시보드
                </Link>
                <Link 
                  to="/alert" 
                  className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  알림
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/alert" element={<AlertPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);

export default App; 