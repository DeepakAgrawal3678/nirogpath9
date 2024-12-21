import { FITBIT_CONFIG } from './config';
import type { ActivityData } from '../../../types/activity';

interface FitbitToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

interface FitbitActivity {
  logId: number;
  activityName: string;
  duration: number;
  distance: number;
  calories: number;
  averageHeartRate?: number;
  maxHeartRate?: number;
  minHeartRate?: number;
  startTime: string;
}

export async function getFitbitToken(code: string): Promise<FitbitToken> {
  const basicAuth = btoa(`${FITBIT_CONFIG.clientId}:${FITBIT_CONFIG.clientSecret}`);
  
  const response = await fetch(FITBIT_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      grant_type: 'authorization_code',
      redirect_uri: FITBIT_CONFIG.redirectUri
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get Fitbit token');
  }

  return response.json();
}

export async function refreshFitbitToken(refreshToken: string): Promise<FitbitToken> {
  const basicAuth = btoa(`${FITBIT_CONFIG.clientId}:${FITBIT_CONFIG.clientSecret}`);
  
  const response = await fetch(FITBIT_CONFIG.tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Fitbit token');
  }

  return response.json();
}

export async function getFitbitActivities(token: string, afterDate?: string): Promise<ActivityData[]> {
  const date = afterDate || new Date().toISOString().split('T')[0];
  
  const response = await fetch(
    `${FITBIT_CONFIG.apiUrl}/user/-/activities/list.json?afterDate=${date}&sort=desc&offset=0&limit=20`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Fitbit activities');
  }

  const data = await response.json();
  const activities: FitbitActivity[] = data.activities;

  return activities.map(activity => ({
    id: activity.logId.toString(),
    type: activity.activityName.toLowerCase(),
    duration: Math.round(activity.duration / 60000), // Convert milliseconds to minutes
    distance: activity.distance,
    calories: activity.calories,
    heartRate: activity.averageHeartRate ? {
      avg: Math.round(activity.averageHeartRate),
      max: activity.maxHeartRate ? Math.round(activity.maxHeartRate) : undefined,
      min: activity.minHeartRate ? Math.round(activity.minHeartRate) : undefined
    } : undefined,
    timestamp: activity.startTime,
    source: 'fitbit'
  }));
}