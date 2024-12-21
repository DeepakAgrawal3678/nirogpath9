import { format } from 'date-fns';
import type { DietEntry } from '../types/diet';

export function exportToCsv(entries: DietEntry[]): string {
  const headers = ['Date', 'Breakfast', 'Lunch', 'Dinner', 'Calories', 'Protein', 'Carbs', 'Fat'];
  const rows = entries.map(entry => [
    format(new Date(entry.timestamp), 'yyyy-MM-dd'),
    entry.breakfast,
    entry.lunch,
    entry.dinner,
    entry.calories,
    entry.protein,
    entry.carbs,
    entry.fat
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}

export function exportToPdf(entries: DietEntry[]): Blob {
  // This is a placeholder - in a real app you would use a PDF generation library
  const content = entries.map(entry => `
    Date: ${format(new Date(entry.timestamp), 'yyyy-MM-dd')}
    Breakfast: ${entry.breakfast}
    Lunch: ${entry.lunch}
    Dinner: ${entry.dinner}
    Calories: ${entry.calories}
    Protein: ${entry.protein}g
    Carbs: ${entry.carbs}g
    Fat: ${entry.fat}g
  `).join('\n\n');

  return new Blob([content], { type: 'application/pdf' });
}