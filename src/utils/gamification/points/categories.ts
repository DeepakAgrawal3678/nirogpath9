export const POINTS_CATEGORIES = {
  activities: {
    walking: { points: 5, unit: 'km' },
    running: { points: 10, unit: 'km' },
    swimming: { points: 15, unit: '30min' },
    yoga: { points: 10, unit: 'session' },
    gym: { points: 20, unit: 'session' }
  },
  nutrition: {
    meetDailyGoal: { points: 50, description: 'Meet all daily nutrition goals' },
    logMeal: { points: 10, description: 'Log a meal with details' },
    healthyChoice: { points: 15, description: 'Choose a low glycemic meal' }
  },
  bloodSugar: {
    dailyLog: { points: 20, description: 'Log blood sugar readings' },
    targetRange: { points: 30, description: 'Keep blood sugar in target range' },
    weekStreak: { points: 100, description: '7-day logging streak' }
  }
} as const;

export type ActivityCategory = keyof typeof POINTS_CATEGORIES.activities;
export type NutritionCategory = keyof typeof POINTS_CATEGORIES.nutrition;
export type BloodSugarCategory = keyof typeof POINTS_CATEGORIES.bloodSugar;