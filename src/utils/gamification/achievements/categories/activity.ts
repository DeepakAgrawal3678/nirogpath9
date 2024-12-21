import type { Achievement } from '../../../../types/gamification';

export const ACTIVITY_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'weekly-warrior',
    name: 'Weekly Warrior',
    description: 'Complete 5 activities in a week',
    points: 100,
    icon: 'activity',
    category: 'activity',
    level: 'bronze',
    criteria: {
      type: 'weekly_activities',
      value: 5
    }
  },
  {
    id: 'fitness-master',
    name: 'Fitness Master',
    description: 'Burn 2000 calories in a week',
    points: 200,
    icon: 'flame',
    category: 'activity',
    level: 'silver',
    criteria: {
      type: 'weekly_calories',
      value: 2000
    }
  }
];