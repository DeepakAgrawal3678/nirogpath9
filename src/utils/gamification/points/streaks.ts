export function calculateStreakPoints(days: number): number {
  if (days >= 30) return 500;
  if (days >= 7) return 100;
  if (days >= 3) return 50;
  return 0;
}

export function calculateBonusPoints(streakDays: number, perfectDays: number): number {
  const streakBonus = calculateStreakPoints(streakDays);
  const perfectBonus = perfectDays * 20;
  return streakBonus + perfectBonus;
}