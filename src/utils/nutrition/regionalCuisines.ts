import { MAHARASHTRIAN_DISHES } from './regional/maharashtra';
import { GUJARATI_DISHES } from './regional/gujarat';
import { PUNJABI_DISHES } from './regional/punjab';
import { BENGALI_DISHES } from './regional/bengal';
import { TAMIL_DISHES } from './regional/tamilNadu';
import type { RegionalCuisine, RegionalDish } from './types';

export const REGIONAL_CUISINES: RegionalCuisine[] = [
  { region: 'Maharashtra', dishes: MAHARASHTRIAN_DISHES },
  { region: 'Gujarat', dishes: GUJARATI_DISHES },
  { region: 'Punjab', dishes: PUNJABI_DISHES },
  { region: 'Bengal', dishes: BENGALI_DISHES },
  { region: 'Tamil Nadu', dishes: TAMIL_DISHES }
];

export function getDiabeticFriendlyDishes(region?: string): RegionalDish[] {
  const allDishes = region
    ? REGIONAL_CUISINES.find(cuisine => cuisine.region === region)?.dishes || []
    : REGIONAL_CUISINES.flatMap(cuisine => cuisine.dishes);

  return allDishes.filter(dish => dish.diabeticFriendly);
}

export function getLowGlycemicDishes(maxGI: number = 50): RegionalDish[] {
  return REGIONAL_CUISINES
    .flatMap(cuisine => cuisine.dishes)
    .filter(dish => dish.glycemicIndex <= maxGI);
}

export function getRegionalDishes(region: string): RegionalDish[] {
  return REGIONAL_CUISINES.find(cuisine => cuisine.region === region)?.dishes || [];
}

export function getDishByName(name: string): RegionalDish | undefined {
  return REGIONAL_CUISINES
    .flatMap(cuisine => cuisine.dishes)
    .find(dish => dish.name.toLowerCase() === name.toLowerCase());
}