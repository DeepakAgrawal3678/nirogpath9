import { openDB } from 'idb';
import type { UserSchema } from './types';

const DB_NAME = 'nirogpath-db';
const DB_VERSION = 7;

export const initDB = async () => {
  return await openDB<UserSchema>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Create stores only if they don't exist
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'email' });
      }
      
      if (!db.objectStoreNames.contains('profiles')) {
        db.createObjectStore('profiles', { keyPath: 'email' });
      }

      if (!db.objectStoreNames.contains('activities')) {
        const activityStore = db.createObjectStore('activities', { keyPath: 'timestamp' });
        activityStore.createIndex('by-email', 'email');
      }

      if (!db.objectStoreNames.contains('bloodSugar')) {
        const bloodSugarStore = db.createObjectStore('bloodSugar', { keyPath: 'timestamp' });
        bloodSugarStore.createIndex('by-email', 'email');
      }

      if (!db.objectStoreNames.contains('medications')) {
        const medicationsStore = db.createObjectStore('medications', { keyPath: 'timestamp' });
        medicationsStore.createIndex('by-email', 'email');
      }

      if (!db.objectStoreNames.contains('diet')) {
        const dietStore = db.createObjectStore('diet', { keyPath: 'timestamp' });
        dietStore.createIndex('by-email', 'email');
      }

      if (!db.objectStoreNames.contains('hba1c')) {
        const hba1cStore = db.createObjectStore('hba1c', { keyPath: 'timestamp' });
        hba1cStore.createIndex('by-email', 'email');
      }
    },
  });
};

export const getDB = async () => {
  const db = await initDB();
  return db;
};