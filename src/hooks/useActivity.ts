import { useState, useEffect } from 'react';
import { getActivities } from '../lib/db';
import { useAuth } from './useAuth';

export interface Activity {
  type: string;
  sportName?: string;
  duration: string;
  timestamp: string;
}

export function useActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadActivities = async () => {
      if (user?.email) {
        try {
          const userActivities = await getActivities(user.email);
          setActivities(userActivities.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ));
        } catch (error) {
          console.error('Error loading activities:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadActivities();
  }, [user]);

  return { activities, loading };
}