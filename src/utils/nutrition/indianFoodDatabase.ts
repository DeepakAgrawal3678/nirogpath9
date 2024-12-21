import type { NutritionalInfo } from '../../types/diet';

export const INDIAN_FOOD_DATABASE: Record<string, NutritionalInfo & { serving: string }> = {
  // Main Course
  'chapati': { serving: '1 piece', calories: 120, protein: 3.1, carbs: 18.2, fat: 3.7 },
  'roti': { serving: '1 piece', calories: 120, protein: 3.1, carbs: 18.2, fat: 3.7 },
  'dal': { serving: '1 cup', calories: 150, protein: 9.0, carbs: 28.3, fat: 1.8 },
  'paneer': { serving: '100g', calories: 265, protein: 18.3, carbs: 3.4, fat: 20.8 },
  'pulao': { serving: '1 cup', calories: 280, protein: 6.2, carbs: 45.6, fat: 9.8 },
  'chole': { serving: '1 cup', calories: 210, protein: 10.8, carbs: 35.5, fat: 3.8 },
  'puri': { serving: '1 piece', calories: 140, protein: 3.2, carbs: 20.4, fat: 5.6 },
  
  // South Indian
  'idli': { serving: '1 piece', calories: 85, protein: 2.4, carbs: 14.8, fat: 0.4 },
  'dosa': { serving: '1 piece', calories: 165, protein: 3.8, carbs: 28.3, fat: 4.2 },
  'sambhar': { serving: '1 cup', calories: 140, protein: 6.2, carbs: 22.5, fat: 3.8 },
  'upma': { serving: '1 cup', calories: 180, protein: 5.2, carbs: 32.6, fat: 4.2 },
  'poha': { serving: '1 cup', calories: 170, protein: 3.8, carbs: 30.2, fat: 5.1 },
  
  // Vegetables and Sides
  'palak': { serving: '1 cup', calories: 65, protein: 3.2, carbs: 10.8, fat: 0.6 },
  'bhindi': { serving: '1 cup', calories: 85, protein: 2.4, carbs: 16.4, fat: 0.8 },
  'aloo gobi': { serving: '1 cup', calories: 160, protein: 4.2, carbs: 28.6, fat: 4.8 },
  'green salad': { serving: '1 cup', calories: 45, protein: 2.2, carbs: 8.4, fat: 0.4 },
  'raita': { serving: '1 cup', calories: 85, protein: 3.8, carbs: 8.2, fat: 4.6 },
  
  // Desserts
  'gajar halwa': { serving: '1/2 cup', calories: 225, protein: 4.2, carbs: 32.6, fat: 9.8 },
  'kheer': { serving: '1/2 cup', calories: 190, protein: 3.8, carbs: 28.4, fat: 7.2 },
  'gulab jamun': { serving: '1 piece', calories: 150, protein: 2.2, carbs: 24.6, fat: 5.8 },
  
  // Breakfast Items
  'paratha': { serving: '1 piece', calories: 180, protein: 4.2, carbs: 26.4, fat: 7.2 },
  'uttapam': { serving: '1 piece', calories: 170, protein: 4.6, carbs: 28.2, fat: 4.8 },
  'vada': { serving: '1 piece', calories: 145, protein: 3.8, carbs: 22.4, fat: 5.2 }
};

export type IndianFoodItem = keyof typeof INDIAN_FOOD_DATABASE;