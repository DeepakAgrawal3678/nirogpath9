import { useState, useEffect } from 'react';
import { useBloodSugar } from './useBloodSugar';
import { useDiet } from './useDiet';
import { getMealSuggestions, adjustPortionSize } from '../utils/mealSuggestions';
import type { MealSuggestion } from '../types/bloodSugar';

export function useBloodSugarDiet() {
  const { readings } = useBloodSugar();
  const { entries } = useDiet();
  const [activityLevel, setActivityLevel] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([]);

  useEffect(() => {
    if (readings.length > 0) {
      const latestReading = readings[0];
      const currentHour = new Date().getHours();
      
      let mealType: MealSuggestion['type'] = 'snack';
      if (currentHour < 11) mealType = 'breakfast';
      else if (currentHour < 15) mealType = 'lunch';
      else if (currentHour < 21) mealType = 'dinner';

      const baseSuggestions = getMealSuggestions(
        parseInt(latestReading.beforeFood),
        activityLevel,
        mealType
      );

      const adjustedSuggestions = baseSuggestions.map(suggestion =>
        adjustPortionSize(suggestion, activityLevel)
      );

      setSuggestions(adjustedSuggestions);
    }
  }, [readings, activityLevel]);

  return {
    suggestions,
    activityLevel,
    setActivityLevel
  };
}