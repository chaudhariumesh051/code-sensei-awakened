import { supabase } from '../lib/supabase';

export interface SignUpData {
  email: string;
  password: string;
  full_name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp(data: SignUpData) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Check if email confirmation is required
    const needsVerification = !authData.user?.email_confirmed_at;

    return {
      user: authData.user,
      needsVerification,
    };
  }

  static async signIn(data: SignInData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return authData;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  static async signInWithMagicLink(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  static async signInWithOTP(phone: string) {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  static async verifyOTP(phone: string, token: string) {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  static async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }

    return user;
  }

  static async updateProfile(data: any) {
    const { error } = await supabase
      .from('user_profiles')
      .update(data)
      .eq('id', (await this.getCurrentUser())?.id);

    if (error) {
      throw new Error(error.message);
    }
  }

  static async getUserSessions() {
    // Mock implementation - return empty array for now
    return [];
  }

  static async getSecurityLogs() {
    // Mock implementation - return empty array for now
    return [];
  }

  static async revokeSession(sessionId: string) {
    // Mock implementation - log the session ID
    console.log('Revoking session:', sessionId);
  }
}
