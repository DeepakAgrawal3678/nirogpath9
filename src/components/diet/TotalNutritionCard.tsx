import React from 'react';
import { Card } from '../ui/Card';
import { Activity } from 'lucide-react';
import type { NutritionalInfo } from '../../types/diet';

interface TotalNutritionCardProps {
  current: NutritionalInfo;
  total: NutritionalInfo;
  loading?: boolean;
}

export function TotalNutritionCard({ current, total, loading }: TotalNutritionCardProps) {
  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Nutrition Overview</h3>
          <Activity className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-center text-slate-200">Loading nutrition data...</div>
      </Card>
    );
  }

  const metrics = [
    { label: 'Calories', current: current.calories, total: total.calories, unit: 'kcal' },
    { label: 'Protein', current: current.protein, total: total.protein, unit: 'g' },
    { label: 'Carbs', current: current.carbs, total: total.carbs, unit: 'g' },
    { label: 'Fat', current: current.fat, total: total.fat, unit: 'g' }
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Nutrition Overview</h3>
        <Activity className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-3">
        {metrics.map(({ label, current: value, total: totalValue, unit }) => (
          <div key={label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-200">{label}</span>
              <div className="text-right">
                <span className="text-orange-400">{value.toFixed(1)}</span>
                <span className="text-slate-300"> / {totalValue.toFixed(1)} {unit}</span>
              </div>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((value / totalValue) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}