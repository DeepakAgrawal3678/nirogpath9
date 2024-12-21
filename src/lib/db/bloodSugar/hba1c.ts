import { getDB } from '../core';
import type { HbA1cReading } from '../../../types/bloodSugar';

export async function saveHbA1cReading(
  email: string,
  reading: Omit<HbA1cReading, 'email'>
) {
  const db = await getDB();
  await db.add('hba1c', {
    ...reading,
    email,
  });
}

export async function getHbA1cReadings(email: string): Promise<HbA1cReading[]> {
  const db = await getDB();
  return await db.getAllFromIndex('hba1c', 'by-email', email);
}