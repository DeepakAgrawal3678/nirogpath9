import { NutritionalInfo } from '../types/diet';

// Common food items database with nutritional values per 100g
const FOOD_DATABASE: Record<string, NutritionalInfo> = {
  'oatmeal': { calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9 },
  'egg': { calories: 155, protein: 12.6, carbs: 1.1, fat: 11.3 },
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'apple': { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
  'banana': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3 },
  'salmon': { calories: 208, protein: 22, carbs: 0, fat: 13 },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  'sweet potato': { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
  'quinoa': { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
};

function extractFoodItems(mealText: string): string[] {
  // Convert to lowercase for matching
  const text = mealText.toLowerCase();
  
  // Return all food items found in the text
  return Object.keys(FOOD_DATABASE).filter(food => text.includes(food));
}

export function calculateMealNutrition(mealText: string): NutritionalInfo {
  const foodItems = extractFoodItems(mealText);
  
  // Initialize nutrition totals
  const totals: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Sum up nutrition values for all found food items
  foodItems.forEach(food => {
    const nutrition = FOOD_DATABASE[food];
    totals.calories += nutrition.calories;
    totals.protein += nutrition.protein;
    totals.carbs += nutrition.carbs;
    totals.fat += nutrition.fat;
  });

  // Round all values
  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    carbs: Math.round(totals.carbs),
    fat: Math.round(totals.fat)
  };
}

export function calculateDailyNutrition(meals: Record<string, string>): NutritionalInfo {
  const totals: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  // Calculate nutrition for each meal
  Object.values(meals).forEach(mealText => {
    if (mealText) {
      const mealNutrition = calculateMealNutrition(mealText);
      totals.calories += mealNutrition.calories;
      totals.protein += mealNutrition.protein;
      totals.carbs += mealNutrition.carbs;
      totals.fat += mealNutrition.fat;
    }
  });

  return totals;
}

export function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
}

export function calculateTDEE(bmr: number, activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'): number {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };
  
  return Math.round(bmr * multipliers[activityLevel]);
}