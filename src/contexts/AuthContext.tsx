
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, type AuthUser, type Profile } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);
      
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email!
        };
        setUser(authUser);
        
        // Fetch user profile with a slight delay to ensure trigger has run
        setTimeout(async () => {
          const profile = await fetchUserProfile(session.user.id);
          setProfile(profile);
          authUser.profile = profile || undefined;
          setUser(authUser);
        }, 100);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const authUser: AuthUser = {
          id: session.user.id,
          email: session.user.email!
        };
        setUser(authUser);
        
        // Fetch user profile
        fetchUserProfile(session.user.id).then(profile => {
          setProfile(profile);
          authUser.profile = profile || undefined;
          setUser(authUser);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const profile = await fetchUserProfile(user.id);
      setProfile(profile);
      setUser(prev => prev ? { ...prev, profile: profile || undefined } : null);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      session,
      loading, 
      isAuthenticated: !!user,
      refreshUser,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};
