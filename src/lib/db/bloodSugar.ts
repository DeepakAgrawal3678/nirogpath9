import { getDB } from './core';
import type { BloodSugarReading, HbA1cReading } from '../../types/bloodSugar';

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