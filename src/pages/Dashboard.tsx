
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Video, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome to AI Tutor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your intelligent programming companion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Brain, title: 'Problem Solver', desc: 'AI-powered solutions' },
          { icon: Code, title: 'Code Analysis', desc: 'Deep code insights' },
          { icon: Video, title: 'Video Tutorials', desc: 'Visual learning' },
          { icon: TrendingUp, title: 'Progress', desc: 'Track your growth' },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700"
          >
            <item.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
