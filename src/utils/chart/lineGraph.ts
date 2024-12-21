import type { Point } from './types';

export function createSmoothLine(points: Point[]): string {
  if (points.length < 2) return '';

  // Start with the first point
  let path = `M ${points[0].x}% ${points[0].y}`;

  // Create smooth curves between points using cubic bezier
  for (let i = 1; i < points.length; i++) {
    const current = points[i - 1];
    const next = points[i];
    
    // Calculate control points for smooth curve
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    
    // Use tension of 0.25 for smoother curves
    const tension = 0.25;
    
    const cp1x = current.x + dx * tension;
    const cp1y = current.y;
    const cp2x = next.x - dx * tension;
    const cp2y = next.y;
    
    path += ` C ${cp1x}% ${cp1y} ${cp2x}% ${cp2y} ${next.x}% ${next.y}`;
  }

  return path;
}

export function createAreaPath(points: Point[], height: number): string {
  const linePath = createSmoothLine(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  return `${linePath} L ${lastPoint.x}% ${height} L ${firstPoint.x}% ${height} Z`;
}