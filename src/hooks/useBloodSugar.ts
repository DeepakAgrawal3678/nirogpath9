import { useState, useEffect } from 'react';
import { getBloodSugarReadings } from '../lib/db';
import { useAuth } from './useAuth';

export interface BloodSugarReading {
  beforeFood: string;
  afterFood: string;
  timestamp: string;
}

export function useBloodSugar() {
  const [readings, setReadings] = useState<BloodSugarReading[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadReadings = async () => {
      if (user?.email) {
        try {
          const userReadings = await getBloodSugarReadings(user.email);
          setReadings(userReadings.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ));
        } catch (error) {
          console.error('Error loading blood sugar readings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadReadings();
  }, [user]);

  return { readings, loading };
}