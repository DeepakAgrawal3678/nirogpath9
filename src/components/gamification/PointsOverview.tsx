import React from 'react';
import { Card } from '../ui/Card';
import { Trophy, Target, Award } from 'lucide-react';

interface PointsOverviewProps {
  points: number;
  level: number;
  nextLevelPoints: number;
}

export function PointsOverview({ points, level, nextLevelPoints }: PointsOverviewProps) {
  const progress = Math.min((points / nextLevelPoints) * 100, 100);

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-orange-500" />
          <h3 className="text-sm font-medium text-white">Your Progress</h3>
        </div>
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-white">Level {level}</span>
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="text-xl font-bold text-white">
          {points} Points
        </div>
        <p className="text-xs text-slate-200">
          {nextLevelPoints - points} points until next level
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-slate-200">Progress to Level {level + 1}</span>
          <span className="text-slate-200">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
}