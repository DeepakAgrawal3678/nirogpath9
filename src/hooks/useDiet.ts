import { useState, useEffect } from 'react';
import { getDietEntries } from '../lib/db';
import { useAuth } from './useAuth';
import type { DietEntry } from '../types/diet';

export function useDiet() {
  const [entries, setEntries] = useState<DietEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadEntries = async () => {
      if (user?.email) {
        try {
          const userEntries = await getDietEntries(user.email);
          setEntries(userEntries.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ));
        } catch (error) {
          console.error('Error loading diet entries:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadEntries();
  }, [user]);

  return { entries, loading };
}