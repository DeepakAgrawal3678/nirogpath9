// Food database with nutritional values per serving
export const FOOD_DATABASE = {
  // Breakfast Items
  'oatmeal': { serving: '1 cup cooked', calories: 158, protein: 6, carbs: 27, fat: 3 },
  'egg': { serving: '1 large', calories: 70, protein: 6, carbs: 0, fat: 5 },
  'bread': { serving: '1 slice', calories: 79, protein: 3, carbs: 14, fat: 1 },
  'milk': { serving: '1 cup', calories: 103, protein: 8, carbs: 12, fat: 2 },
  
  // Proteins
  'chicken breast': { serving: '3 oz', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'salmon': { serving: '3 oz', calories: 177, protein: 19, carbs: 0, fat: 11 },
  'tofu': { serving: '1/2 cup', calories: 94, protein: 10, carbs: 2, fat: 6 },
  
  // Grains
  'rice': { serving: '1 cup cooked', calories: 205, protein: 4, carbs: 45, fat: 0.4 },
  'quinoa': { serving: '1 cup cooked', calories: 222, protein: 8, carbs: 39, fat: 3.6 },
  
  // Vegetables
  'broccoli': { serving: '1 cup', calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  'spinach': { serving: '1 cup raw', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1 },
  'sweet potato': { serving: '1 medium', calories: 103, protein: 2, carbs: 24, fat: 0.2 },
  
  // Fruits
  'apple': { serving: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  'banana': { serving: '1 medium', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  'orange': { serving: '1 medium', calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
  
  // Common meal components
  'olive oil': { serving: '1 tbsp', calories: 120, protein: 0, carbs: 0, fat: 14 },
  'avocado': { serving: '1/2 fruit', calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
  'nuts': { serving: '1 oz', calories: 173, protein: 6, carbs: 6, fat: 15 }
} as const;

export type FoodItem = keyof typeof FOOD_DATABASE;