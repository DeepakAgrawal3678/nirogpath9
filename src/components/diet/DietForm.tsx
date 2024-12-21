import React from 'react';
import { Button } from '../ui/Button';
import { Mic, MicOff, UtensilsCrossed } from 'lucide-react';
import { MealNutritionInfo } from './MealNutritionInfo';
import type { DietFormData } from '../../types/diet';

interface DietFormProps {
  formData: DietFormData;
  onFormChange: (field: keyof DietFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  activeField: keyof DietFormData | null;
  isRecording: boolean;
  onToggleRecording: (field: keyof DietFormData) => void;
}

export function DietForm({
  formData,
  onFormChange,
  onSubmit,
  activeField,
  isRecording,
  onToggleRecording
}: DietFormProps) {
  const meals = [
    { key: 'breakfast' as const, label: 'Breakfast' },
    { key: 'lunch' as const, label: 'Lunch' },
    { key: 'eveningSnacks' as const, label: 'Evening Snacks' },
    { key: 'dinner' as const, label: 'Dinner' }
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {meals.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              {label}
            </label>
            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="relative flex-1">
                  <textarea
                    value={formData[key]}
                    onChange={(e) => onFormChange(key, e.target.value)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white pl-8 text-sm min-h-[60px] max-h-[60px]"
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                  <UtensilsCrossed className="absolute left-2 top-2 h-4 w-4 text-slate-400" />
                  {isRecording && activeField === key && (
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                      <span className="animate-pulse text-orange-500">●</span>
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onToggleRecording(key)}
                  className={`flex-shrink-0 p-2 h-auto ${isRecording && activeField === key ? 'bg-red-500/20 text-red-400' : ''}`}
                  title={isRecording && activeField === key ? 'Stop Recording' : 'Start Recording'}
                >
                  {isRecording && activeField === key ? (
                    <MicOff className="w-4 h-4" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {formData[key].trim() && (
                <MealNutritionInfo mealText={formData[key]} />
              )}
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="px-4 py-1.5 text-sm">
        Save
      </Button>
    </form>
  );
}