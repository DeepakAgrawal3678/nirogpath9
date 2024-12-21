import { useState, useEffect } from 'react';
import { getDietEntries } from '../lib/db';
import { useAuth } from './useAuth';
import type { NutritionalInfo } from '../types/diet';

const DEFAULT_TARGET: NutritionalInfo = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 70
};

export function useNutrition() {
  const [current, setCurrent] = useState<NutritionalInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [target] = useState<NutritionalInfo>(DEFAULT_TARGET);
  const { user } = useAuth();

  useEffect(() => {
    const loadNutrition = async () => {
      if (user?.email) {
        try {
          const entries = await getDietEntries(user.email);
          if (entries.length > 0) {
            const latestEntry = entries[0];
            setCurrent(latestEntry.totalNutrition || {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0
            });
          }
        } catch (error) {
          console.error('Error loading nutrition data:', error);
        }
      }
    };

    loadNutrition();
  }, [user]);

  return { current, target };
}