import React from 'react';
import { calculateMealNutrition } from '../../utils/nutrition/calculator';

interface MealNutritionInfoProps {
  mealText: string;
}

export function MealNutritionInfo({ mealText }: MealNutritionInfoProps) {
  const nutrition = calculateMealNutrition(mealText);

  if (!mealText.trim()) {
    return null;
  }

  return (
    <div className="mt-1 p-2 bg-white/5 rounded-lg">
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div>
          <div className="text-orange-500">{nutrition.calories}</div>
          <div className="text-slate-400">cal</div>
        </div>
        <div>
          <div className="text-orange-500">{nutrition.protein}g</div>
          <div className="text-slate-400">prot</div>
        </div>
        <div>
          <div className="text-orange-500">{nutrition.carbs}g</div>
          <div className="text-slate-400">carbs</div>
        </div>
        <div>
          <div className="text-orange-500">{nutrition.fat}g</div>
          <div className="text-slate-400">fat</div>
        </div>
      </div>
    </div>
  );
}