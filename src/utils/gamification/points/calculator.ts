import { POINTS_CATEGORIES } from './categories';
import type { ActivityCategory, NutritionCategory, BloodSugarCategory } from './categories';

export function calculateActivityPoints(
  type: ActivityCategory,
  value: number
): number {
  return Math.round(POINTS_CATEGORIES.activities[type].points * value);
}

export function calculateNutritionPoints(achievements: {
  [K in NutritionCategory]?: boolean;
}): number {
  return Object.entries(achievements).reduce((total, [category, achieved]) => {
    if (achieved && category in POINTS_CATEGORIES.nutrition) {
      return total + POINTS_CATEGORIES.nutrition[category as NutritionCategory].points;
    }
    return total;
  }, 0);
}

export function calculateBloodSugarPoints(achievements: {
  [K in BloodSugarCategory]?: boolean;
}): number {
  return Object.entries(achievements).reduce((total, [category, achieved]) => {
    if (achieved && category in POINTS_CATEGORIES.bloodSugar) {
      return total + POINTS_CATEGORIES.bloodSugar[category as BloodSugarCategory].points;
    }
    return total;
  }, 0);
}