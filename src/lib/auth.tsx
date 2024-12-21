import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Temporary user type to mimic Firebase User
interface User {
  email: string;
  displayName?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Temporary in-memory storage for development
const users = new Map<string, { password: string }>();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userRecord = users.get(email);
      if (!userRecord || userRecord.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      setUser({ email });
      navigate('/dashboard');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (users.has(email)) {
        throw new Error('Email already in use');
      }
      
      users.set(email, { password });
      setUser({ email });
      navigate('/dashboard');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Simulate Google sign in
      const email = 'demo.google@example.com';
      users.set(email, { password: 'google-auth' });
      setUser({ email, displayName: 'Google User' });
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithMicrosoft = async () => {
    setLoading(true);
    try {
      // Simulate Microsoft sign in
      const email = 'demo.microsoft@example.com';
      users.set(email, { password: 'microsoft-auth' });
      setUser({ email, displayName: 'Microsoft User' });
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to sign in with Microsoft');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithGoogle,
      signInWithMicrosoft,
      signInWithEmail,
      signUpWithEmail,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}