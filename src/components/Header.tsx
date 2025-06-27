import React from 'react';
import { motion } from 'framer-motion';
import { User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-700 px-4 py-3 md:px-8 md:py-4 w-full z-50"
    >
      <div className="flex items-center justify-between w-full">
        {/* Branding/Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">MyProject</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 md:p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-xl transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Member</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};