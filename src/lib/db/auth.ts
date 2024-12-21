import { getDB } from './core';

export async function createUser(email: string, password: string) {
  const db = await getDB();
  const existingUser = await db.get('users', email);
  
  if (existingUser) {
    throw new Error('User already exists');
  }

  await db.add('users', {
    email,
    password,
    createdAt: Date.now(),
  });

  return { email };
}

export async function authenticateUser(email: string, password: string) {
  const db = await getDB();
  const user = await db.get('users', email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  return { email: user.email };
}