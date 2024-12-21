import type { BloodSugarReading } from '../../hooks/useBloodSugar';

interface TrendAnalysis {
  direction: 'rising' | 'falling' | 'stable';
  message: string;
  percentage: number;
}

export function analyzeTrend(readings: BloodSugarReading[]): TrendAnalysis {
  if (readings.length < 2) {
    return {
      direction: 'stable',
      message: 'Not enough readings to analyze trend',
      percentage: 0
    };
  }

  const recentReadings = readings.slice(0, 7).reverse();
  const beforeValues = recentReadings.map(r => parseInt(r.beforeFood));
  const afterValues = recentReadings.map(r => parseInt(r.afterFood));

  const averageFirst = (beforeValues[0] + afterValues[0]) / 2;
  const averageLast = (beforeValues[beforeValues.length - 1] + afterValues[afterValues.length - 1]) / 2;
  const percentageChange = ((averageFirst - averageLast) / averageLast) * 100;

  if (Math.abs(percentageChange) < 5) {
    return {
      direction: 'stable',
      message: 'Blood sugar levels are stable',
      percentage: percentageChange
    };
  }

  if (percentageChange > 0) {
    return {
      direction: 'rising',
      message: `Blood sugar has increased by ${Math.abs(percentageChange).toFixed(1)}%`,
      percentage: percentageChange
    };
  }

  return {
    direction: 'falling',
    message: `Blood sugar has decreased by ${Math.abs(percentageChange).toFixed(1)}%`,
    percentage: percentageChange
  };
}

export function calculateDailyAverage(readings: BloodSugarReading[]): number {
  if (readings.length === 0) return 0;

  const dailyValues = readings.reduce((sum, reading) => {
    return sum + (parseInt(reading.beforeFood) + parseInt(reading.afterFood)) / 2;
  }, 0);

  return Math.round(dailyValues / readings.length);
}