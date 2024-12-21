import type { MealSuggestion } from './types';

export const INDIAN_MEAL_SUGGESTIONS: MealSuggestion[] = [
  {
    id: 'mixed-sprouts-chaat-snack',
    name: 'Mixed Sprouts Chaat',
    description: 'Protein-rich snack with low glycemic impact',
    type: 'snack',
    nutritionalInfo: {
      calories: 180,
      protein: 12,
      carbs: 28,
      fat: 4
    },
    glycemicIndex: 35,
    bloodSugarImpact: 'low',
    suitableFor: {
      bloodSugarRange: { min: 90, max: 250 },
      activityLevels: ['low', 'moderate', 'high']
    },
    ingredients: ['mixed sprouts', 'onion', 'tomato', 'lemon'],
    preparation: 'Mix sprouts with vegetables and spices'
  },
  {
    id: 'oats-idli-breakfast',
    name: 'Oats Idli',
    description: 'Healthy idli made with oats and vegetables',
    type: 'breakfast',
    nutritionalInfo: {
      calories: 220,
      protein: 10,
      carbs: 35,
      fat: 6
    },
    glycemicIndex: 45,
    bloodSugarImpact: 'low',
    suitableFor: {
      bloodSugarRange: { min: 90, max: 200 },
      activityLevels: ['low', 'moderate', 'high']
    },
    ingredients: ['oats', 'vegetables', 'curd', 'spices'],
    preparation: 'Steam oats and vegetable batter'
  }
];