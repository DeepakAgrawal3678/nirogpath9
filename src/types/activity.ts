import type { NutritionalInfo } from './diet';

export interface ActivityData {
  id: string;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  heartRate?: {
    avg: number;
    max: number;
    min: number;
  };
  timestamp: string;
  source: 'manual' | 'fitbit' | 'garmin' | 'strava' | 'apple_health';
}

export interface IntegrationStatus {
  provider: string;
  connected: boolean;
  lastSync?: string;
  error?: string;
}

export interface ActivityProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
  authUrl?: string;
}