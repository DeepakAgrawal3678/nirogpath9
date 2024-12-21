import { getDB } from './core';
import type { DietEntry } from '../../types/diet';

export async function saveDiet(email: string, dietData: Omit<DietEntry, 'email'>) {
  const db = await getDB();
  await db.add('diet', {
    ...dietData,
    email
  });
}

export async function updateDietEntry(email: string, dietData: DietEntry) {
  const db = await getDB();
  await db.put('diet', {
    ...dietData,
    email
  });
}

export async function getDietEntries(email: string) {
  const db = await getDB();
  const entries = await db.getAllFromIndex('diet', 'by-email', email);
  return entries.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}