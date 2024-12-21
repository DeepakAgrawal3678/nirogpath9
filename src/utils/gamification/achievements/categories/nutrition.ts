import type { Achievement } from '../../../../types/gamification';

export const NUTRITION_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'nutrition-novice',
    name: 'Nutrition Novice',
    description: 'Meet daily nutrition goals for 3 days',
    points: 100,
    icon: 'utensils',
    category: 'nutrition',
    level: 'bronze',
    criteria: {
      type: 'nutrition_goals',
      value: 3
    }
  }
];