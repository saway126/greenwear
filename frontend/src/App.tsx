import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DashboardPage from './pages/DashboardPage';
import AlertPage from './pages/AlertPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <div>
    <nav style={{ padding: 16, borderBottom: '1px solid #eee' }}>
      <Link to="/">홈</Link> | <Link to="/dashboard">대시보드</Link> | <Link to="/alert">알림</Link>
    </nav>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/alert" element={<AlertPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App; 