
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Dashboard } from './Dashboard';
import { ProfileSettings } from './ProfileSettings';
import { AdminPanel } from './AdminPanel';
import { ProtectedRoute } from './ProtectedRoute';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <main className="py-6 px-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyzer" element={<div className="text-center text-gray-600">Code Analyzer - Coming Soon</div>} />
          <Route path="/solver" element={<div className="text-center text-gray-600">Problem Solver - Coming Soon</div>} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};
