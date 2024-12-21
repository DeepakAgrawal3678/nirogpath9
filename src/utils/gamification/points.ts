const POINTS_SYSTEM = {
  activities: {
    walking: 5, // points per km
    running: 10, // points per km
    swimming: 15, // points per 30 mins
    yoga: 10, // points per session
    gym: 20 // points per session
  },
  nutrition: {
    meetDailyGoal: 50,
    logMeal: 10,
    healthyChoice: 15 // for low glycemic meals
  },
  bloodSugar: {
    dailyLog: 20,
    targetRange: 30,
    weekStreak: 100
  },
  streaks: {
    threeDay: 50,
    weekly: 100,
    monthly: 500
  }
};

export function calculateActivityPoints(
  type: keyof typeof POINTS_SYSTEM.activities,
  value: number
): number {
  return Math.round(POINTS_SYSTEM.activities[type] * value);
}

export function calculateNutritionPoints(goals: {
  caloriesInRange: boolean;
  proteinMet: boolean;
  carbsInRange: boolean;
}): number {
  let points = 0;
  if (goals.caloriesInRange) points += POINTS_SYSTEM.nutrition.meetDailyGoal;
  if (goals.proteinMet) points += POINTS_SYSTEM.nutrition.healthyChoice;
  if (goals.carbsInRange) points += POINTS_SYSTEM.nutrition.healthyChoice;
  return points;
}

export function calculateBloodSugarPoints(readings: {
  logged: boolean;
  inRange: boolean;
  streak: number;
}): number {
  let points = 0;
  if (readings.logged) points += POINTS_SYSTEM.bloodSugar.dailyLog;
  if (readings.inRange) points += POINTS_SYSTEM.bloodSugar.targetRange;
  if (readings.streak >= 7) points += POINTS_SYSTEM.bloodSugar.weekStreak;
  return points;
}