import { parseMealText } from './parser';
import type { NutritionalInfo } from '../../types/diet';

export function calculateMealNutrition(mealText: string): NutritionalInfo {
  if (!mealText.trim()) {
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }

  const nutrition = parseMealText(mealText);

  // Round to 1 decimal place for better accuracy
  return {
    calories: Math.round(nutrition.calories * 10) / 10,
    protein: Math.round(nutrition.protein * 10) / 10,
    carbs: Math.round(nutrition.carbs * 10) / 10,
    fat: Math.round(nutrition.fat * 10) / 10
  };
}

export function calculateDailyNutrition(meals: Record<string, string>): NutritionalInfo {
  const totals: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Calculate nutrition for each meal and sum up
  Object.values(meals).forEach(mealText => {
    if (mealText) {
      const mealNutrition = calculateMealNutrition(mealText);
      totals.calories += mealNutrition.calories;
      totals.protein += mealNutrition.protein;
      totals.carbs += mealNutrition.carbs;
      totals.fat += mealNutrition.fat;
    }
  });

  // Round final values to 1 decimal place
  return {
    calories: Math.round(totals.calories * 10) / 10,
    protein: Math.round(totals.protein * 10) / 10,
    carbs: Math.round(totals.carbs * 10) / 10,
    fat: Math.round(totals.fat * 10) / 10
  };
}