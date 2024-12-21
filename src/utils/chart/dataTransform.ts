import type { BloodSugarReading } from '../../hooks/useBloodSugar';
import type { Point, ChartDimensions } from './types';

const DEFAULT_DIMENSIONS: ChartDimensions = {
  height: 200,
  maxValue: 400
};

export function transformReadings(
  readings: BloodSugarReading[],
  type: 'before' | 'after',
  dimensions: ChartDimensions = DEFAULT_DIMENSIONS
): Point[] {
  // Take last 7 readings and reverse for chronological order
  const data = readings.slice(0, 7).reverse();
  
  return data.map((reading, i) => {
    const value = parseInt(type === 'before' ? reading.beforeFood : reading.afterFood);
    return {
      x: (i / (data.length - 1)) * 100,
      y: Math.max(0, Math.min(
        dimensions.height,
        (1 - value / dimensions.maxValue) * dimensions.height
      )),
      value
    };
  });
}