import { getDB } from './core';
import type { UserSchema } from './types';

export async function saveMedication(
  email: string, 
  medicationData: Omit<UserSchema['medications']['value'], 'email'>
) {
  const db = await getDB();
  await db.add('medications', {
    ...medicationData,
    email,
  });
}

export async function getMedications(email: string) {
  const db = await getDB();
  return await db.getAllFromIndex('medications', 'by-email', email);
}