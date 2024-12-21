import React from 'react';
import { Card } from '../ui/Card';
import { Activity, TrendingDown, TrendingUp } from 'lucide-react';
import { analyzeMealImpact } from '../../utils/bloodSugarAnalyzer';
import { format } from 'date-fns';
import type { MealImpact } from '../../types/diet';

interface BloodSugarMealCorrelationProps {
  mealImpacts: MealImpact[];
}

export function BloodSugarMealCorrelation({ mealImpacts }: BloodSugarMealCorrelationProps) {
  if (mealImpacts.length === 0) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-white">Meal Impact Analysis</h3>
          <Activity className="w-5 h-5 text-orange-500" />
        </div>
        <p className="text-slate-200 text-sm text-center">
          No meal impact data available yet
        </p>
      </Card>
    );
  }

  // Group impacts by date for better organization
  const impactsByDate = mealImpacts.reduce((acc, impact) => {
    const date = format(new Date(impact.date), 'yyyy-MM-dd');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(impact);
    return acc;
  }, {} as Record<string, MealImpact[]>);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Meal Impact Analysis</h3>
        <Activity className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-3">
        {Object.entries(impactsByDate).map(([date, impacts]) => (
          <div key={date} className="space-y-2">
            <h4 className="text-sm font-medium text-slate-200">
              {format(new Date(date), 'MMM d')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {impacts.map((impact, index) => {
                const analysis = analyzeMealImpact(impact.beforeLevel, impact.afterLevel);
                
                return (
                  <div 
                    key={`${impact.meal}-${index}`}
                    className="p-2 bg-white/5 rounded-lg space-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-white">{impact.meal}</span>
                      <div className={`flex items-center gap-1 text-xs ${
                        analysis.difference > 0 ? 'text-rose-400' : 'text-green-400'
                      }`}>
                        {analysis.difference > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(analysis.difference)} mg/dL</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 text-xs">
                      <div>
                        <span className="text-slate-300">Before: </span>
                        <span className="text-slate-200">{impact.beforeLevel}</span>
                      </div>
                      <div>
                        <span className="text-slate-300">After: </span>
                        <span className="text-slate-200">{impact.afterLevel}</span>
                      </div>
                      <div className={`text-right ${
                        analysis.impact === 'low' ? 'text-green-400' :
                        analysis.impact === 'moderate' ? 'text-orange-400' :
                        'text-rose-400'
                      }`}>
                        {analysis.impact}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}