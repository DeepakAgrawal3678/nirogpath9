import { STRAVA_CONFIG } from './config';
import type { ActivityData } from '../../../types/activity';

interface StravaToken {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

interface StravaActivity {
  id: number;
  type: string;
  start_date: string;
  elapsed_time: number;
  distance: number;
  total_elevation_gain: number;
  average_heartrate?: number;
  max_heartrate?: number;
  calories: number;
}

export async function getStravaToken(code: string): Promise<StravaToken> {
  const response = await fetch(STRAVA_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CONFIG.clientId,
      client_secret: STRAVA_CONFIG.clientSecret,
      code,
      grant_type: 'authorization_code'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to get Strava token');
  }

  return response.json();
}

export async function refreshStravaToken(refreshToken: string): Promise<StravaToken> {
  const response = await fetch(STRAVA_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: STRAVA_CONFIG.clientId,
      client_secret: STRAVA_CONFIG.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to refresh Strava token');
  }

  return response.json();
}

export async function getStravaActivities(token: string, after?: number): Promise<ActivityData[]> {
  const params = new URLSearchParams({
    per_page: '30',
    page: '1'
  });
  
  if (after) {
    params.append('after', after.toString());
  }

  const response = await fetch(
    `${STRAVA_CONFIG.apiUrl}/athlete/activities?${params}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Strava activities');
  }

  const activities: StravaActivity[] = await response.json();

  return activities.map(activity => ({
    id: activity.id.toString(),
    type: activity.type.toLowerCase(),
    duration: Math.round(activity.elapsed_time / 60), // Convert seconds to minutes
    distance: activity.distance / 1000, // Convert meters to kilometers
    calories: activity.calories,
    heartRate: activity.average_heartrate ? {
      avg: Math.round(activity.average_heartrate),
      max: activity.max_heartrate ? Math.round(activity.max_heartrate) : undefined,
      min: undefined // Strava doesn't provide min heart rate
    } : undefined,
    timestamp: activity.start_date,
    source: 'strava'
  }));
}