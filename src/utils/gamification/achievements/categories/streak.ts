import type { Achievement } from '../../../../types/gamification';

export const STREAK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Maintain a 7-day streak of logging all activities',
    points: 200,
    icon: 'flame',
    category: 'streak',
    level: 'gold',
    criteria: {
      type: 'daily_streak',
      value: 7
    }
  },
  {
    id: 'perfect-week',
    name: 'Perfect Week',
    description: 'Complete all daily goals for an entire week',
    points: 300,
    icon: 'target',
    category: 'streak',
    level: 'gold',
    criteria: {
      type: 'perfect_week',
      value: 7
    }
  }
];