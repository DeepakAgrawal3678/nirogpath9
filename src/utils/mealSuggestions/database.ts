import type { MealSuggestion } from './types';

export const MEAL_SUGGESTIONS: MealSuggestion[] = [
  {
    id: 'oatmeal-berries-breakfast',
    name: 'Steel-cut Oatmeal with Berries',
    description: 'High-fiber oatmeal with mixed berries and nuts',
    type: 'breakfast',
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14
    },
    glycemicIndex: 55,
    bloodSugarImpact: 'low',
    suitableFor: {
      bloodSugarRange: { min: 70, max: 180 },
      activityLevels: ['moderate', 'high']
    },
    ingredients: ['steel-cut oats', 'mixed berries', 'almonds', 'cinnamon'],
    preparation: 'Cook oats with water, top with berries and nuts'
  },
  {
    id: 'quinoa-bowl-lunch',
    name: 'Protein-Rich Quinoa Bowl',
    description: 'Quinoa with grilled chicken and vegetables',
    type: 'lunch',
    nutritionalInfo: {
      calories: 420,
      protein: 32,
      carbs: 48,
      fat: 12
    },
    glycemicIndex: 45,
    bloodSugarImpact: 'moderate',
    suitableFor: {
      bloodSugarRange: { min: 90, max: 200 },
      activityLevels: ['moderate', 'high']
    },
    ingredients: ['quinoa', 'chicken breast', 'mixed vegetables', 'olive oil'],
    preparation: 'Cook quinoa, grill chicken, sauté vegetables'
  }
];