import { MEAL_SUGGESTIONS } from './database';
import { INDIAN_MEAL_SUGGESTIONS } from './indianMealSuggestions';
import type { MealSuggestion, SuggestionCriteria } from './types';

export function getMealSuggestions(criteria: SuggestionCriteria): MealSuggestion[] {
  const { bloodSugar, activityLevel, mealType, dietaryPreferences } = criteria;
  
  // Combine regular and Indian meal suggestions
  const allSuggestions = [...MEAL_SUGGESTIONS, ...INDIAN_MEAL_SUGGESTIONS];

  return allSuggestions.filter(meal => {
    // Check if meal type matches
    if (meal.type !== mealType) return false;

    // Check if blood sugar is in suitable range
    const { min, max } = meal.suitableFor.bloodSugarRange;
    if (bloodSugar < min || bloodSugar > max) return false;

    // Check if activity level is suitable
    if (!meal.suitableFor.activityLevels.includes(activityLevel)) return false;

    // Check dietary preferences if specified
    if (dietaryPreferences?.length) {
      const meetsPreferences = dietaryPreferences.every(pref => 
        meal.ingredients.some(ing => ing.includes(pref))
      );
      if (!meetsPreferences) return false;
    }

    return true;
  });
}

export function adjustPortionSize(
  meal: MealSuggestion,
  activityLevel: 'low' | 'moderate' | 'high'
): MealSuggestion {
  const multiplier = activityLevel === 'high' ? 1.3 : 
                    activityLevel === 'moderate' ? 1 : 0.8;

  return {
    ...meal,
    nutritionalInfo: {
      calories: Math.round(meal.nutritionalInfo.calories * multiplier),
      protein: Math.round(meal.nutritionalInfo.protein * multiplier),
      carbs: Math.round(meal.nutritionalInfo.carbs * multiplier),
      fat: Math.round(meal.nutritionalInfo.fat * multiplier)
    }
  };
}

export function getSuggestionsByBloodSugar(bloodSugar: number): MealSuggestion[] {
  if (bloodSugar > 180) {
    return allSuggestions.filter(meal => 
      meal.glycemicIndex < 50 && meal.bloodSugarImpact === 'low'
    );
  } else if (bloodSugar < 70) {
    return allSuggestions.filter(meal => 
      meal.glycemicIndex > 60 && meal.bloodSugarImpact === 'moderate'
    );
  }
  return allSuggestions.filter(meal => meal.glycemicIndex < 65);
}