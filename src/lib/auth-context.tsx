import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { AuthState, User } from './types';
import { supabase, type Database } from './supabase';
import { toast } from 'sonner';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const loadUserProfile = useCallback(async (supabaseUser: SupabaseUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      if (error) throw error;

      const profile = data as Database['public']['Tables']['profiles']['Row'] | null;

      if (profile) {
        const user: User = {
          id: profile.id,
          name: profile.name,
          email: supabaseUser.email!,
          avatarUrl: profile.avatar_url || undefined,
        };

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const checkUser = useCallback(async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [loadUserProfile]);

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [checkUser, loadUserProfile]);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await loadUserProfile(data.user);
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Invalid credentials';
      toast.error(message);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(
            {
              id: data.user.id,
              name,
              avatar_url: null,
            } satisfies Database['public']['Tables']['profiles']['Insert']
          );

        if (profileError) throw profileError;

        const { error: preferencesError } = await supabase
          .from('user_preferences')
          .insert(
            {
              user_id: data.user.id,
              goal: 'general-fitness',
              preferred_duration: 30,
              preferred_intensity: 'medium',
              available_equipment: [],
              preferred_days: [],
            } satisfies Database['public']['Tables']['user_preferences']['Insert']
          );

        if (preferencesError) throw preferencesError;

        await loadUserProfile(data.user);
        toast.success('Account created successfully');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message =
        error instanceof Error
          ? error.message
          : 'An error occurred during registration';
      toast.error(message);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('An error occurred during logout');
    }
  };

  const value = {
    ...authState,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
