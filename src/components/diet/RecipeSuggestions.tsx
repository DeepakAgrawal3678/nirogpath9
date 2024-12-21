import React from 'react';
import { Card } from '../ui/Card';
import { ChefHat } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  imageUrl: string;
  duration: string;
}

interface RecipeSuggestionsProps {
  recipes: Recipe[];
  onRecipeClick: (id: string) => void;
}

export function RecipeSuggestions({ recipes, onRecipeClick }: RecipeSuggestionsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recipe Suggestions</h3>
        <ChefHat className="w-5 h-5 text-orange-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onRecipeClick(recipe.id)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-sm font-medium">{recipe.name}</div>
                <div className="text-xs text-slate-300">
                  {recipe.calories} kcal • {recipe.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}