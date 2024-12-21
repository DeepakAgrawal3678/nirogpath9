import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { ActivityData, IntegrationStatus } from '../types/activity';

export function useActivitySync() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const syncActivities = async (provider: string) => {
    if (!user?.email) return;

    setSyncing(true);
    setError(null);

    try {
      // In a real app, this would make API calls to the respective providers
      // For now, we'll simulate a sync
      await new Promise(resolve => setTimeout(resolve, 2000));

      setLastSync(new Date().toISOString());
    } catch (error) {
      setError('Failed to sync activities. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  return {
    syncing,
    lastSync,
    error,
    syncActivities
  };
}