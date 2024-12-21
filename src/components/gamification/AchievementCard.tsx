import React from 'react';
import { Card } from '../ui/Card';
import type { Achievement } from '../../types/gamification';
import { getAchievementIcon } from '../../utils/gamification/achievements';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked?: boolean;
  progress?: number;
}

export function AchievementCard({ achievement, unlocked = false, progress = 0 }: AchievementCardProps) {
  const Icon = getAchievementIcon(achievement);

  return (
    <div className={`p-2 rounded ${unlocked ? 'bg-orange-500/20' : 'bg-white/5'}`}>
      <div className="flex items-start gap-2">
        <div className={`p-2 rounded ${
          unlocked ? 'bg-orange-500/30' : 'bg-white/10'
        }`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate">{achievement.name}</h3>
          <p className="text-xs text-slate-200 line-clamp-2 mb-1.5">{achievement.description}</p>
          
          <div className="flex items-center justify-between text-xs">
            <span className={`px-1.5 py-0.5 rounded ${
              achievement.level === 'bronze' ? 'bg-amber-500/20 text-amber-300' :
              achievement.level === 'silver' ? 'bg-slate-300/20 text-slate-200' :
              'bg-yellow-500/20 text-yellow-300'
            }`}>
              {achievement.level}
            </span>
            <span className="text-orange-400">{achievement.points} pts</span>
          </div>

          {!unlocked && (
            <div className="mt-1.5">
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-300 text-right mt-0.5">
                {progress}% complete
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}