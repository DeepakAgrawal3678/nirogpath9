import { FoodItem, FOOD_DATABASE } from './database';
import { INDIAN_FOOD_DATABASE, type IndianFoodItem } from './indianFoodDatabase';
import type { NutritionalInfo } from '../../types/diet';

// Common quantity words and their multipliers
const QUANTITY_MULTIPLIERS: Record<string, number> = {
  'half': 0.5,
  'quarter': 0.25,
  'third': 0.33,
  'two': 2,
  'three': 3,
  'four': 4,
  'few': 0.5,
  'some': 1,
  'little': 0.5,
  'lot': 2,
  'plate': 1,
  'bowl': 1,
  'cup': 1,
  'tablespoon': 0.0625,
  'teaspoon': 0.0208,
  'tbsp': 0.0625,
  'tsp': 0.0208,
  'slice': 1,
  'piece': 1,
  // Indian specific quantities
  'katori': 1, // Standard Indian bowl
  'serving': 1
};

function findQuantityMultiplier(text: string): number {
  const words = text.toLowerCase().split(' ');
  let multiplier = 1;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (QUANTITY_MULTIPLIERS[word]) {
      multiplier *= QUANTITY_MULTIPLIERS[word];
      if (i > 0) {
        const numberMatch = words[i - 1].match(/^\d+$/);
        if (numberMatch) {
          multiplier *= parseInt(numberMatch[0]);
        }
      }
    }
  }

  const numbers = text.match(/\d+(\.\d+)?/g);
  if (numbers && numbers.length > 0) {
    multiplier *= parseFloat(numbers[0]);
  }

  return multiplier || 1;
}

type FoodMatch = {
  item: FoodItem | IndianFoodItem;
  multiplier: number;
  isIndian: boolean;
};

function findFoodItems(text: string): FoodMatch[] {
  const items: FoodMatch[] = [];
  const words = text.toLowerCase();

  // Check regular food database
  Object.keys(FOOD_DATABASE).forEach(food => {
    if (words.includes(food)) {
      const multiplier = findQuantityMultiplier(
        words.substring(Math.max(0, words.indexOf(food) - 20), 
        words.indexOf(food))
      );
      items.push({ item: food as FoodItem, multiplier, isIndian: false });
    }
  });

  // Check Indian food database
  Object.keys(INDIAN_FOOD_DATABASE).forEach(food => {
    if (words.includes(food)) {
      const multiplier = findQuantityMultiplier(
        words.substring(Math.max(0, words.indexOf(food) - 20), 
        words.indexOf(food))
      );
      items.push({ item: food as IndianFoodItem, multiplier, isIndian: true });
    }
  });

  return items;
}

export function parseMealText(mealText: string): NutritionalInfo {
  const foodItems = findFoodItems(mealText);
  
  const nutrition: NutritionalInfo = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  };

  foodItems.forEach(({ item, multiplier, isIndian }) => {
    const foodInfo = isIndian ? INDIAN_FOOD_DATABASE[item] : FOOD_DATABASE[item];
    nutrition.calories += foodInfo.calories * multiplier;
    nutrition.protein += foodInfo.protein * multiplier;
    nutrition.carbs += foodInfo.carbs * multiplier;
    nutrition.fat += foodInfo.fat * multiplier;
  });

  return {
    calories: Math.round(nutrition.calories),
    protein: Math.round(nutrition.protein),
    carbs: Math.round(nutrition.carbs),
    fat: Math.round(nutrition.fat)
  };
}