import React from 'react';
import { Card } from '../ui/Card';
import { Target } from 'lucide-react';
import type { DietGoal } from '../../types/diet';
import { format } from 'date-fns';

interface DietGoalsProps {
  goal: DietGoal;
  onEditGoal: () => void;
}

export function DietGoals({ goal, onEditGoal }: DietGoalsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Diet Goals</h3>
        <Target className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-slate-300">Goal Type</div>
            <div className="font-medium capitalize">{goal.type.replace('-', ' ')}</div>
          </div>
          <button
            onClick={onEditGoal}
            className="text-sm text-orange-500 hover:text-orange-400"
          >
            Edit Goal
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-slate-300">Start Date</div>
            <div>{format(new Date(goal.startDate), 'MMM d, yyyy')}</div>
          </div>
          <div>
            <div className="text-sm text-slate-300">End Date</div>
            <div>{format(new Date(goal.endDate), 'MMM d, yyyy')}</div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-300">Daily Calories</div>
              <div>{goal.targetCalories} kcal</div>
            </div>
            <div>
              <div className="text-sm text-slate-300">Daily Protein</div>
              <div>{goal.targetProtein}g</div>
            </div>
            <div>
              <div className="text-sm text-slate-300">Daily Carbs</div>
              <div>{goal.targetCarbs}g</div>
            </div>
            <div>
              <div className="text-sm text-slate-300">Daily Fat</div>
              <div>{goal.targetFat}g</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}