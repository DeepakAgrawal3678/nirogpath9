import { getDB } from '../core';
import type { BloodSugarReading } from '../../../types/bloodSugar';

export async function saveBloodSugar(
  email: string, 
  bloodSugarData: Omit<BloodSugarReading, 'email'>
) {
  const db = await getDB();
  await db.add('bloodSugar', {
    ...bloodSugarData,
    email,
  });
}

export async function getBloodSugarReadings(email: string): Promise<BloodSugarReading[]> {
  const db = await getDB();
  return await db.getAllFromIndex('bloodSugar', 'by-email', email);
}