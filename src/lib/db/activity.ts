import { getDB } from './core';
import type { UserSchema } from './types';

export async function saveActivity(
  email: string, 
  activityData: Omit<UserSchema['activities']['value'], 'email'>
) {
  const db = await getDB();
  await db.add('activities', {
    ...activityData,
    email,
  });
}

export async function getActivities(email: string) {
  const db = await getDB();
  return await db.getAllFromIndex('activities', 'by-email', email);
}