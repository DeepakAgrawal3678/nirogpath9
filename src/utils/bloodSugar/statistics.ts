import type { BloodSugarReading } from '../../hooks/useBloodSugar';
import { BLOOD_SUGAR_RANGES } from '../../constants/bloodSugar';

interface BloodSugarStats {
  inRange: number;
  high: number;
  low: number;
  average: number;
  standardDeviation: number;
}

export function calculateStatistics(readings: BloodSugarReading[]): BloodSugarStats {
  if (readings.length === 0) {
    return {
      inRange: 0,
      high: 0,
      low: 0,
      average: 0,
      standardDeviation: 0
    };
  }

  const allValues = readings.flatMap(reading => [
    parseInt(reading.beforeFood),
    parseInt(reading.afterFood)
  ]);

  const total = allValues.reduce((sum, value) => sum + value, 0);
  const average = total / allValues.length;

  const squaredDiffs = allValues.map(value => Math.pow(value - average, 2));
  const avgSquaredDiff = squaredDiffs.reduce((sum, value) => sum + value, 0) / allValues.length;
  const standardDeviation = Math.sqrt(avgSquaredDiff);

  const inRangeCount = allValues.filter(
    value => value >= BLOOD_SUGAR_RANGES.TARGET.MIN && value <= BLOOD_SUGAR_RANGES.TARGET.MAX
  ).length;

  const highCount = allValues.filter(
    value => value > BLOOD_SUGAR_RANGES.TARGET.MAX
  ).length;

  const lowCount = allValues.filter(
    value => value < BLOOD_SUGAR_RANGES.TARGET.MIN
  ).length;

  return {
    inRange: Math.round((inRangeCount / allValues.length) * 100),
    high: Math.round((highCount / allValues.length) * 100),
    low: Math.round((lowCount / allValues.length) * 100),
    average: Math.round(average),
    standardDeviation: Math.round(standardDeviation)
  };
}