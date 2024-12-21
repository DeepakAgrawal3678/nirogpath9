import { ACTIVITY_ACHIEVEMENTS } from './achievements/categories/activity';
import { BLOOD_SUGAR_ACHIEVEMENTS } from './achievements/categories/bloodSugar';
import { NUTRITION_ACHIEVEMENTS } from './achievements/categories/nutrition';
import { STREAK_ACHIEVEMENTS } from './achievements/categories/streak';
import { calculateProgress } from './achievements/progress';
import { getAchievementIcon } from './achievements/icons';
import type { Achievement } from '../../types/gamification';
import type { AchievementCategory } from './achievements/types';

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

// Re-export utility functions
export { calculateProgress, getAchievementIcon };