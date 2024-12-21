export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  500,    // Level 2
  1000,   // Level 3
  2000,   // Level 4
  3500,   // Level 5
  5500,   // Level 6
  8000,   // Level 7
  11000,  // Level 8
  14500,  // Level 9
  18500   // Level 10
];

export function calculateLevel(points: number): number {
  return LEVEL_THRESHOLDS.findIndex(threshold => points < threshold) || LEVEL_THRESHOLDS.length;
}

export function getNextLevelPoints(currentPoints: number): number {
  const nextThreshold = LEVEL_THRESHOLDS.find(threshold => threshold > currentPoints);
  return nextThreshold || currentPoints;
}

export function getLevelProgress(points: number): number {
  const currentLevel = calculateLevel(points);
  const currentThreshold = LEVEL_THRESHOLDS[currentLevel - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[currentLevel] || points;
  
  return Math.round(((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100);
}