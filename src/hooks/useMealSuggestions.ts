import { useState, useEffect } from 'react';
import { useBloodSugar } from './useBloodSugar';
import { useProfile } from './useProfile';
import { getMealSuggestions, adjustPortionSize } from '../utils/mealSuggestions/suggestionEngine';
import type { MealSuggestion } from '../utils/mealSuggestions/types';

export function useMealSuggestions() {
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const { readings } = useBloodSugar();
  const { formData: profile } = useProfile();

  useEffect(() => {
    if (readings.length > 0) {
      const latestReading = readings[0];
      const currentHour = new Date().getHours();
      
      // Determine meal type based on time of day
      let mealType: MealSuggestion['type'] = 'snack';
      if (currentHour < 11) mealType = 'breakfast';
      else if (currentHour < 15) mealType = 'lunch';
      else if (currentHour < 21) mealType = 'dinner';

      // Get activity level based on recent activity or default to moderate
      const activityLevel = 'moderate'; // This could be determined from activity tracking

      // Get suggestions based on current blood sugar and user profile
      const baseSuggestions = getMealSuggestions({
        bloodSugar: parseInt(latestReading.beforeFood),
        activityLevel,
        mealType,
        dietaryPreferences: profile.foodPreference ? [profile.foodPreference] : undefined
      });

      // Adjust portions based on activity level
      const adjustedSuggestions = baseSuggestions.map(suggestion =>
        adjustPortionSize(suggestion, activityLevel)
      );

      setSuggestions(adjustedSuggestions);
      setLoading(false);
    }
  }, [readings, profile]);

  return { suggestions, loading };
}