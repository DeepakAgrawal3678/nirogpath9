import React from 'react';
import { Card } from '../ui/Card';
import { Activity } from 'lucide-react';
import type { NutritionalInfo } from '../../types/diet';

interface NutritionTrackerProps {
  current: NutritionalInfo;
  target: NutritionalInfo;
}

export function NutritionTracker({ current, target }: NutritionTrackerProps) {
  const metrics = [
    { 
      label: 'Calories', 
      current: current.calories, 
      target: target.calories, 
      unit: 'kcal',
      color: 'bg-orange-500'
    },
    { 
      label: 'Protein', 
      current: current.protein, 
      target: target.protein, 
      unit: 'g',
      color: 'bg-blue-500'
    },
    { 
      label: 'Carbs', 
      current: current.carbs, 
      target: target.carbs, 
      unit: 'g',
      color: 'bg-green-500'
    },
    { 
      label: 'Fat', 
      current: current.fat, 
      target: target.fat, 
      unit: 'g',
      color: 'bg-rose-500'
    }
  ];

  // Calculate meal distribution
  const breakfastCalories = Math.round(current.calories * 0.3);
  const lunchCalories = Math.round(current.calories * 0.4);
  const dinnerCalories = Math.round(current.calories * 0.3);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Daily Nutrition</h3>
        <Activity className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-4">
        {metrics.map(({ label, current: value, target: max, unit, color }) => {
          const percentage = Math.min((value / max) * 100, 100);
          
          return (
            <div key={label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span>
                  {value.toFixed(1)}/{max} {unit}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <h4 className="text-sm font-medium text-slate-300 mb-3">Meal Breakdown</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-slate-300">Breakfast</div>
            <div>{breakfastCalories} kcal</div>
          </div>
          <div>
            <div className="text-slate-300">Lunch</div>
            <div>{lunchCalories} kcal</div>
          </div>
          <div>
            <div className="text-slate-300">Dinner</div>
            <div>{dinnerCalories} kcal</div>
          </div>
        </div>
      </div>
    </Card>
  );
}