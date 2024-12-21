import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { AchievementCard } from './AchievementCard';
import { Card } from '../ui/Card';
import type { Achievement } from '../../types/gamification';

interface AchievementCarouselProps {
  achievements: Achievement[];
  isAchievementUnlocked: (id: string) => boolean;
  getAchievementProgress: (achievement: Achievement) => number;
}

export function AchievementCarousel({ 
  achievements,
  isAchievementUnlocked,
  getAchievementProgress
}: AchievementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!achievements?.length) {
    return (
      <Card className="p-3">
        <h3 className="text-sm font-medium text-white mb-2">Recent Achievements</h3>
        <div className="flex flex-col items-center justify-center text-slate-300 py-2">
          <Trophy className="w-6 h-6 mb-1 text-slate-400" />
          <p className="text-xs">No achievements yet</p>
        </div>
      </Card>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => prev === achievements.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev === 0 ? achievements.length - 1 : prev - 1);
  };

  return (
    <Card className="p-3">
      <h3 className="text-sm font-medium text-white mb-2">Recent Achievements</h3>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" 
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {achievements.map((achievement) => (
              <div key={achievement.id} className="w-full flex-shrink-0">
                <AchievementCard
                  achievement={achievement}
                  unlocked={isAchievementUnlocked(achievement.id)}
                  progress={getAchievementProgress(achievement)}
                />
              </div>
            ))}
          </div>
        </div>

        {achievements.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <ChevronLeft className="w-3 h-3 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-white" />
            </button>
          </>
        )}
      </div>
    </Card>
  );
}