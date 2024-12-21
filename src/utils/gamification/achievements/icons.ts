import { Activity, Target, Droplet, Flame, Award } from 'lucide-react';
import type { Achievement } from '../../../types/gamification';

const achievementIcons = {
  activity: Activity,
  target: Target,
  droplet: Droplet,
  flame: Flame,
  award: Award
} as const;

export function getAchievementIcon(achievement: Achievement) {
  return achievementIcons[achievement.icon as keyof typeof achievementIcons] || Award;
}