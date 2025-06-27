
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { CodeAnalyzer } from './CodeAnalyzer';
import { ProblemSolver } from './ProblemSolver';
import { SettingsPanel } from './SettingsPanel';
import { AdminPanel } from './AdminPanel';
import { useAuth } from './AuthProvider';

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analyzer" element={<CodeAnalyzer />} />
              <Route path="/solver" element={<ProblemSolver />} />
              <Route path="/settings" element={<SettingsPanel />} />
              {profile?.is_admin && (
                <Route path="/admin" element={<AdminPanel />} />
              )}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};
