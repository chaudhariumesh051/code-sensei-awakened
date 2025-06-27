import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        if (user) {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          if (error) throw error;
          setProfile(data);
        }
      } catch (err: any) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-lg">Loading your dashboard...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  }
  if (!profile) {
    return <div className="flex justify-center items-center h-64 text-gray-500">No profile data found.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, {profile.full_name || profile.email}!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
          <div className="space-y-2">
            <div><span className="font-medium">Email:</span> {profile.email}</div>
            <div><span className="font-medium">Full Name:</span> {profile.full_name}</div>
            <div><span className="font-medium">Username:</span> {profile.username || '-'}</div>
            <div><span className="font-medium">Role:</span> {profile.role || 'user'}</div>
            <div><span className="font-medium">Joined:</span> {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '-'}</div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-2xl border border-gray-200 dark:border-dark-700 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Usage Stats</h2>
          <div className="space-y-2">
            <div><span className="font-medium">Total Analyses:</span> {profile.total_analyses ?? 0}</div>
            <div><span className="font-medium">Problems Solved:</span> {profile.total_problems_solved ?? 0}</div>
            <div><span className="font-medium">Videos Generated:</span> {profile.total_videos_generated ?? 0}</div>
            <div><span className="font-medium">Subscription Status:</span> {profile.subscription_status || 'inactive'}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};