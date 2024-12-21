import React from 'react';
import { Card } from '../ui/Card';
import { ChefHat } from 'lucide-react';
import type { MealSuggestion } from '../../utils/mealSuggestions/types';

interface MealSuggestionListProps {
  suggestions: MealSuggestion[];
  loading: boolean;
}

export function MealSuggestionList({ suggestions, loading }: MealSuggestionListProps) {
  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Meal Suggestions</h3>
          <ChefHat className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-center text-slate-200">Loading suggestions...</div>
      </Card>
    );
  }

  if (suggestions.length === 0) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Meal Suggestions</h3>
          <ChefHat className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-center text-slate-200">
          No meal suggestions available
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Meal Suggestions</h3>
        <ChefHat className="w-5 h-5 text-orange-500" />
      </div>
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-white">{suggestion.name}</h4>
                <p className="text-sm text-slate-200">{suggestion.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-slate-300">Calories</div>
                <div className="text-white">{suggestion.nutritionalInfo.calories}</div>
              </div>
              <div>
                <div className="text-slate-300">Carbs</div>
                <div className="text-white">{suggestion.nutritionalInfo.carbs}g</div>
              </div>
              <div>
                <div className="text-slate-300">Protein</div>
                <div className="text-white">{suggestion.nutritionalInfo.protein}g</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}