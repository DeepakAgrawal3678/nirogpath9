import { DBSchema } from 'idb';
import type { DietEntry, NutritionalInfo } from '../../types/diet';

export interface UserSchema extends DBSchema {
  users: {
    key: string;
    value: {
      email: string;
      password: string;
      createdAt: number;
    };
  };
  profiles: {
    key: string;
    value: {
      email: string;
      name: string;
      gender: string;
      age: string;
      height: string;
      weight: string;
      foodPreference: string;
      updatedAt: number;
    };
  };
  diet: {
    key: string;
    value: {
      email: string;
      breakfast: string;
      lunch: string;
      dinner: string;
      breakfastNutrition: NutritionalInfo;
      lunchNutrition: NutritionalInfo;
      dinnerNutrition: NutritionalInfo;
      totalNutrition: NutritionalInfo;
      timestamp: string;
    };
    indexes: { 'by-email': string };
  };
  // ... other schemas remain the same
}