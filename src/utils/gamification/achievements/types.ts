import type { Achievement } from '../../../types/gamification';

export type AchievementCategory = Achievement['category'];
export type AchievementLevel = Achievement['level'];

export interface AchievementProgress {
  currentValue: number;
  targetValue: number;
  percentage: number;
}