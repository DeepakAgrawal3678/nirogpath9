import { getDB } from './core';
import type { UserSchema } from './types';

export async function saveProfile(
  email: string, 
  profileData: Omit<UserSchema['profiles']['value'], 'email' | 'updatedAt'>
) {
  const db = await getDB();
  await db.put('profiles', {
    ...profileData,
    email,
    updatedAt: Date.now(),
  });
}

export async function getProfile(email: string) {
  const db = await getDB();
  return await db.get('profiles', email);
}

export async function hasProfile(email: string) {
  const db = await getDB();
  const profile = await db.get('profiles', email);
  return !!profile;
}