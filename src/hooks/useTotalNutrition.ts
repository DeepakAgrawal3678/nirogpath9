import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { getDietEntries } from '../lib/db';
import type { NutritionalInfo } from '../types/diet';

export function useTotalNutrition() {
  const [totalNutrition, setTotalNutrition] = useState<NutritionalInfo>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const loadTotalNutrition = async () => {
      if (user?.email) {
        try {
          const entries = await getDietEntries(user.email);
          
          // Calculate total nutrition from all entries
          const totals = entries.reduce((acc, entry) => ({
            calories: acc.calories + (entry.totalNutrition?.calories || 0),
            protein: acc.protein + (entry.totalNutrition?.protein || 0),
            carbs: acc.carbs + (entry.totalNutrition?.carbs || 0),
            fat: acc.fat + (entry.totalNutrition?.fat || 0)
          }), {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0
          });

          setTotalNutrition(totals);
        } catch (error) {
          console.error('Error loading total nutrition:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadTotalNutrition();
  }, [user]);

  return { totalNutrition, loading };
}