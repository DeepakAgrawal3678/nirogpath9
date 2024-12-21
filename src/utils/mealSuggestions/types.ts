import type { NutritionalInfo } from '../../types/diet';

export interface MealSuggestion {
  id: string;
  name: string;
  description: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  nutritionalInfo: NutritionalInfo;
  glycemicIndex: number;
  bloodSugarImpact: 'low' | 'moderate' | 'high';
  suitableFor: {
    bloodSugarRange: {
      min: number;
      max: number;
    };
    activityLevels: Array<'low' | 'moderate' | 'high'>;
  };
  ingredients: string[];
  preparation: string;
}

export interface SuggestionCriteria {
  bloodSugar: number;
  activityLevel: 'low' | 'moderate' | 'high';
  mealType: MealSuggestion['type'];
  dietaryPreferences?: string[];
}