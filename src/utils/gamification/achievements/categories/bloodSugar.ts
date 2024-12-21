import type { Achievement } from '../../../../types/gamification';

export const BLOOD_SUGAR_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'glucose-guardian',
    name: 'Glucose Guardian',
    description: 'Log blood sugar levels for 7 consecutive days',
    points: 150,
    icon: 'droplet',
    category: 'blood-sugar',
    level: 'bronze',
    criteria: {
      type: 'blood_sugar_streak',
      value: 7
    }
  },
  {
    id: 'sugar-master',
    name: 'Sugar Master',
    description: 'Maintain blood sugar in target range for 5 days',
    points: 300,
    icon: 'target',
    category: 'blood-sugar',
    level: 'gold',
    criteria: {
      type: 'target_range_days',
      value: 5
    }
  }
];