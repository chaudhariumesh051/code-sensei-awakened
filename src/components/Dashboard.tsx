
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, TrendingUp, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserStats {
  totalAnalyses: number;
  totalProblems: number;
  recentActivity: Array<{
    id: string;
    type: 'analysis' | 'problem';
    title: string;
    created_at: string;
  }>;
}

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalAnalyses: 0,
    totalProblems: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      if (!user) return;

      // Fetch analyses count
      const { count: analysesCount } = await supabase
        .from('code_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch problems count
      const { count: problemsCount } = await supabase
        .from('problem_solutions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch recent activity
      const { data: analyses } = await supabase
        .from('code_analyses')
        .select('id, title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: problems } = await supabase
        .from('problem_solutions')
        .select('id, problem_title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      const recentActivity = [
        ...(analyses?.map(a => ({ ...a, type: 'analysis' as const, title: a.title })) || []),
        ...(problems?.map(p => ({ ...p, type: 'problem' as const, title: p.problem_title })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

      setStats({
        totalAnalyses: analysesCount || 0,
        totalProblems: problemsCount || 0,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

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
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            AI Analysis
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {loading ? '...' : stats.totalAnalyses}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Code analyses completed
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Code className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Problems Solved
          </h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {loading ? '...' : stats.totalProblems}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Coding problems solved
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <TrendingUp className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Progress
          </h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {loading ? '...' : Math.round((stats.totalAnalyses + stats.totalProblems) / 2)}%
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Overall improvement
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <User className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Profile
          </h3>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {profile?.full_name || 'User'}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {profile?.is_admin ? 'Admin' : 'Member'}
          </p>
        </motion.div>
      </div>

      {stats.recentActivity.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {activity.type === 'analysis' ? (
                  <Code className="w-5 h-5 text-blue-500" />
                ) : (
                  <Brain className="w-5 h-5 text-purple-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
