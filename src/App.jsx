import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useProfile } from './hooks/useProfile';
import ProfileScreen from './pages/ProfileScreen';
import WaterScreen from './pages/WaterScreen';

function RootRedirect() {
  const { profile, loading } = useProfile();

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return <Navigate to={profile ? '/water' : '/profile'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/water" element={<WaterScreen />} />
    </Routes>
  );
}
