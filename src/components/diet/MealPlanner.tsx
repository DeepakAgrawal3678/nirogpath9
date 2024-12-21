import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { format, startOfWeek, addDays } from 'date-fns';
import type { MealPlan } from '../../types/diet';

interface MealPlannerProps {
  plans: MealPlan[];
  onPlanClick: (date: string) => void;
}

export function MealPlanner({ plans, onPlanClick }: MealPlannerProps) {
  const startDate = startOfWeek(new Date());
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Meal Planner</h3>
        <Calendar className="w-5 h-5 text-orange-500" />
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const plan = plans.find(p => p.date === dateStr);
          
          return (
            <div
              key={dateStr}
              onClick={() => onPlanClick(dateStr)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                plan ? 'bg-orange-500/20' : 'bg-white/5'
              } hover:bg-white/10`}
            >
              <div className="text-sm font-medium mb-1">
                {format(date, 'EEE')}
              </div>
              <div className="text-lg">
                {format(date, 'd')}
              </div>
              {plan && (
                <div className="mt-2 text-xs text-orange-500">
                  Planned
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}