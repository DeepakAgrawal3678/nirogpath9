import { ACTIVITY_ACHIEVEMENTS } from './categories/activity';
import { BLOOD_SUGAR_ACHIEVEMENTS } from './categories/bloodSugar';
import { NUTRITION_ACHIEVEMENTS } from './categories/nutrition';
import { STREAK_ACHIEVEMENTS } from './categories/streak';
import { calculateProgress, getAchievementProgress } from './progress';
import { getAchievementIcon } from './icons';
import type { Achievement } from '../../../types/gamification';
import type { AchievementCategory } from './types';

// Export all achievements as a constant
export const ALL_ACHIEVEMENTS: Achievement[] = [
  ...ACTIVITY_ACHIEVEMENTS,
  ...BLOOD_SUGAR_ACHIEVEMENTS,
  ...NUTRITION_ACHIEVEMENTS,
  ...STREAK_ACHIEVEMENTS
];

// Export helper functions
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ALL_ACHIEVEMENTS.filter(achievement => achievement.category === category);
}

// Re-export utility functions and types
export {
  calculateProgress,
  getAchievementProgress,
  getAchievementIcon,
  type AchievementCategory
};