
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, TrendingUp, Clock, Calendar, Activity } from 'lucide-react';
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
  todayActivity: number;
  weekActivity: number;
}

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalAnalyses: 0,
    totalProblems: 0,
    recentActivity: [],
    todayActivity: 0,
    weekActivity: 0
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

      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

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

      // Fetch today's activity
      const { count: todayAnalyses } = await supabase
        .from('code_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today);

      const { count: todayProblems } = await supabase
        .from('problem_solutions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', today);

      // Fetch week's activity
      const { count: weekAnalyses } = await supabase
        .from('code_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', weekAgo);

      const { count: weekProblems } = await supabase
        .from('problem_solutions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', weekAgo);

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
        recentActivity,
        todayActivity: (todayAnalyses || 0) + (todayProblems || 0),
        weekActivity: (weekAnalyses || 0) + (weekProblems || 0)
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome back, {profile?.full_name || 'Developer'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your intelligent programming companion
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Code Analyses
          </h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {loading ? '...' : stats.totalAnalyses}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total completed
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
            Total completed
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Calendar className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Today's Activity
          </h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {loading ? '...' : stats.todayActivity}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Tasks completed today
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <Activity className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Weekly Activity
          </h3>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {loading ? '...' : stats.weekActivity}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This week's progress
          </p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      {stats.recentActivity.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {activity.type === 'analysis' ? (
                  <Brain className="w-5 h-5 text-blue-500 flex-shrink-0" />
                ) : (
                  <Code className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.created_at).toLocaleDateString()} at{' '}
                    {new Date(activity.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    activity.type === 'analysis' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {activity.type === 'analysis' ? 'Analysis' : 'Solution'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Welcome Message for New Users */}
      {!loading && stats.totalAnalyses === 0 && stats.totalProblems === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center">
          <TrendingUp className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to CodeSage AI Tutor!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start your journey by analyzing code or solving problems. Your progress will be tracked here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/dashboard/analyzer'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze Code
            </button>
            <button
              onClick={() => window.location.href = '/dashboard/solver'}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Solve Problems
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
