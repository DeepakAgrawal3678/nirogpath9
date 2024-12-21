import type { Achievement } from '../../../types/gamification';
import type { AchievementProgress } from './types';

export function calculateProgress(achievement: Achievement, currentValue: number): number {
  return Math.min(Math.round((currentValue / achievement.criteria.value) * 100), 100);
}

export function getAchievementProgress(
  achievement: Achievement,
  currentValue: number
): AchievementProgress {
  const percentage = calculateProgress(achievement, currentValue);
  return {
    currentValue,
    targetValue: achievement.criteria.value,
    percentage
  };
}