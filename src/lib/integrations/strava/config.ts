import { ActivityProvider } from '../../../types/activity';

export const STRAVA_CONFIG = {
  clientId: import.meta.env.VITE_STRAVA_CLIENT_ID,
  clientSecret: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
  redirectUri: `${window.location.origin}/dashboard/activity/strava/callback`,
  authUrl: 'https://www.strava.com/oauth/authorize',
  tokenUrl: 'https://www.strava.com/oauth/token',
  apiUrl: 'https://www.strava.com/api/v3',
  scope: 'read,activity:read_all'
} as const;

export const STRAVA_PROVIDER: ActivityProvider = {
  id: 'strava',
  name: 'Strava',
  icon: 'https://www.strava.com/favicon.ico',
  description: 'Import your runs, rides, and other activities from Strava',
  connected: false,
  authUrl: `${STRAVA_CONFIG.authUrl}?client_id=${STRAVA_CONFIG.clientId}&response_type=code&redirect_uri=${STRAVA_CONFIG.redirectUri}&scope=${STRAVA_CONFIG.scope}`
};