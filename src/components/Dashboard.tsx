
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, BarChart3, TrendingUp } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { supabase } from '../lib/supabase';

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [recentAnalyses, setRecentAnalyses] = useState<any[]>([]);
  const [recentSolutions, setRecentSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch recent code analyses
      const { data: analyses } = await supabase
        .from('code_analyses')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Fetch recent problem solutions
      const { data: solutions } = await supabase
        .from('problem_solutions')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentAnalyses(analyses || []);
      setRecentSolutions(solutions || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: 'Total Analyses', 
      value: profile?.total_analyses || 0, 
      icon: Code, 
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    { 
      label: 'Problems Solved', 
      value: profile?.total_problems_solved || 0, 
      icon: TrendingUp, 
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    { 
      label: 'Recent Activity', 
      value: recentAnalyses.length + recentSolutions.length, 
      icon: BarChart3, 
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    { 
      label: 'Account Type', 
      value: profile?.is_admin ? 'Admin' : 'User', 
      icon: Users, 
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to continue your coding journey? Let's analyze some code and solve problems together.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bg} dark:bg-gray-700 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color} dark:text-gray-300`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Code Analyses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Code Analyses</h3>
          {recentAnalyses.length > 0 ? (
            <div className="space-y-3">
              {recentAnalyses.map((analysis, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{analysis.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{analysis.language}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No code analyses yet. Start analyzing code to see your history here!</p>
          )}
        </motion.div>

        {/* Recent Problem Solutions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Problem Solutions</h3>
          {recentSolutions.length > 0 ? (
            <div className="space-y-3">
              {recentSolutions.map((solution, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{solution.problem_title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{solution.language}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {new Date(solution.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No problems solved yet. Start solving problems to see your progress here!</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
