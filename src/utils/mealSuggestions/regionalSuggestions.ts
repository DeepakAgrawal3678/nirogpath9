import { REGIONAL_CUISINES, getDiabeticFriendlyDishes, getLowGlycemicDishes } from '../nutrition/regionalCuisines';
import type { MealSuggestion } from './types';
import type { RegionalDish } from '../nutrition/types';

function convertToMealSuggestion(dish: RegionalDish): MealSuggestion {
  return {
    id: dish.name.replace(/\s+/g, '-'),
    name: dish.name,
    description: dish.description,
    type: 'lunch', // Default to lunch, can be customized based on dish
    nutritionalInfo: {
      calories: dish.calories,
      protein: dish.protein,
      carbs: dish.carbs,
      fat: dish.fat
    },
    glycemicIndex: dish.glycemicIndex,
    bloodSugarImpact: dish.glycemicIndex < 45 ? 'low' : 
                      dish.glycemicIndex < 60 ? 'moderate' : 'high',
    suitableFor: {
      bloodSugarRange: { 
        min: dish.diabeticFriendly ? 70 : 90,
        max: dish.diabeticFriendly ? 180 : 160
      },
      activityLevels: ['low', 'moderate', 'high']
    },
    ingredients: [], // Would need to be added from a separate ingredients database
    preparation: ''  // Would need to be added from a separate recipe database
  };
}

export function getRegionalMealSuggestions(
  bloodSugar: number,
  region?: string
): MealSuggestion[] {
  let dishes: RegionalDish[] = [];

  if (bloodSugar > 180) {
    dishes = getDiabeticFriendlyDishes(region)
      .filter(dish => dish.glycemicIndex < 45);
  } else if (bloodSugar < 70) {
    dishes = getLowGlycemicDishes(60)
      .filter(dish => dish.calories > 200);
  } else {
    dishes = getDiabeticFriendlyDishes(region);
  }

  return dishes.map(convertToMealSuggestion);
}