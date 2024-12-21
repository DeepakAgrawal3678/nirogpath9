import type { MealSuggestion, BloodSugarRange } from '../types/bloodSugar';
import { analyzeBloodSugar } from './bloodSugarAnalyzer';

const MEAL_DATABASE: MealSuggestion[] = [
  {
    type: 'breakfast',
    name: 'Steel-cut Oatmeal with Berries',
    description: 'Steel-cut oats topped with mixed berries and chia seeds',
    glycemicIndex: 55,
    carbs: 30,
    protein: 8,
    fat: 5,
    calories: 250,
    recommendedFor: ['normal', 'high'],
    activityLevel: 'moderate'
  },
  {
    type: 'breakfast',
    name: 'Greek Yogurt Parfait',
    description: 'Low-fat Greek yogurt with nuts and cinnamon',
    glycemicIndex: 35,
    carbs: 15,
    protein: 20,
    fat: 8,
    calories: 220,
    recommendedFor: ['high', 'very-high'],
    activityLevel: 'low'
  },
  // Add more meal suggestions...
];

export function getMealSuggestions(
  bloodSugar: number,
  activityLevel: 'low' | 'moderate' | 'high',
  mealType: MealSuggestion['type']
): MealSuggestion[] {
  const category = analyzeBloodSugar(bloodSugar);
  
  return MEAL_DATABASE.filter(meal => 
    meal.type === mealType &&
    meal.recommendedFor.includes(category) &&
    (meal.activityLevel === activityLevel || meal.activityLevel === 'moderate')
  );
}

export function adjustPortionSize(
  meal: MealSuggestion,
  activityLevel: 'low' | 'moderate' | 'high'
): MealSuggestion {
  const multiplier = activityLevel === 'high' ? 1.3 : 
                    activityLevel === 'moderate' ? 1 : 0.8;
  
  return {
    ...meal,
    carbs: Math.round(meal.carbs * multiplier),
    protein: Math.round(meal.protein * multiplier),
    fat: Math.round(meal.fat * multiplier),
    calories: Math.round(meal.calories * multiplier)
  };
}