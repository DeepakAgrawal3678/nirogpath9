import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, authenticateUser, hasProfile } from '../lib/db';

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await authenticateUser(email, password);
      setUser({ email: user.email });
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      
      const profileExists = await hasProfile(email);
      if (!profileExists) {
        navigate('/dashboard/profile');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUser(email, password);
      setUser({ email });
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/dashboard/profile');
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}