
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Shield, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: User },
    { name: 'Code Analyzer', path: '/dashboard/analyzer', icon: User },
    { name: 'Problem Solver', path: '/dashboard/solver', icon: User },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ...(profile?.is_admin ? [{ name: 'Admin', path: '/dashboard/admin', icon: Shield }] : [])
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
          >
            CodeSage AI Tutor
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              {profile?.avatar_url ? (
                <span className="text-lg">{profile.avatar_url}</span>
              ) : (
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {profile?.full_name || 'User'}
              {profile?.is_admin && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                  Admin
                </span>
              )}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4"
        >
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="flex items-center space-x-2 px-3 py-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <span className="text-lg">{profile.avatar_url}</span>
                  ) : (
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {profile?.full_name || 'User'}
                  </div>
                  {profile?.is_admin && (
                    <div className="text-xs text-orange-600 dark:text-orange-400">Admin</div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
