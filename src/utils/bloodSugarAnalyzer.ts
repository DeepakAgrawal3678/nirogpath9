import type { BloodSugarRange, BloodSugarTrend } from '../types/bloodSugar';

export function analyzeBloodSugar(value: number): BloodSugarRange['category'] {
  if (value < 70) return 'low';
  if (value <= 140) return 'normal';
  if (value <= 180) return 'high';
  return 'very-high';
}

export function calculateTrend(readings: BloodSugarTrend[]): 'rising' | 'falling' | 'stable' {
  if (readings.length < 2) return 'stable';
  
  const recentReadings = readings.slice(0, 3);
  const values = recentReadings.map(r => r.value);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const latestValue = values[0];
  
  if (latestValue > average + 20) return 'rising';
  if (latestValue < average - 20) return 'falling';
  return 'stable';
}

export function analyzeMealImpact(beforeMeal: number, afterMeal: number): {
  impact: 'low' | 'moderate' | 'high';
  difference: number;
} {
  const difference = afterMeal - beforeMeal;
  
  return {
    impact: difference < 30 ? 'low' : difference < 60 ? 'moderate' : 'high',
    difference
  };
}