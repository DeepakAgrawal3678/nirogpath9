import React from 'react';
import { Card } from '../ui/Card';
import { Utensils, Activity, TrendingDown } from 'lucide-react';
import type { MealSuggestion } from '../../types/bloodSugar';

interface MealSuggestionCardProps {
  suggestion: MealSuggestion;
  onSelect: (meal: MealSuggestion) => void;
}

export function MealSuggestionCard({ suggestion, onSelect }: MealSuggestionCardProps) {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-white/5 transition"
      onClick={() => onSelect(suggestion)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{suggestion.name}</h4>
          <p className="text-sm text-slate-300">{suggestion.description}</p>
        </div>
        <Utensils className="w-5 h-5 text-orange-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-slate-300">Calories</div>
          <div>{suggestion.calories} kcal</div>
        </div>
        <div>
          <div className="text-sm text-slate-300">Glycemic Index</div>
          <div className="flex items-center gap-1">
            {suggestion.glycemicIndex}
            <TrendingDown className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="text-slate-300">Carbs</div>
          <div>{suggestion.carbs}g</div>
        </div>
        <div>
          <div className="text-slate-300">Protein</div>
          <div>{suggestion.protein}g</div>
        </div>
        <div>
          <div className="text-slate-300">Fat</div>
          <div>{suggestion.fat}g</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <Activity className="w-4 h-4 text-orange-500" />
        <span className="text-slate-300">
          Recommended for {suggestion.activityLevel} activity
        </span>
      </div>
    </Card>
  );
}