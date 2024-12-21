import type { ActivityProvider } from '../../types/activity';

export const ACTIVITY_PROVIDERS: ActivityProvider[] = [
  {
    id: 'fitbit',
    name: 'Fitbit',
    icon: 'https://www.fitbit.com/favicon.ico',
    description: 'Connect your Fitbit device to sync activities automatically',
    connected: false,
    authUrl: 'https://www.fitbit.com/oauth2/authorize'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    icon: 'https://www.garmin.com/favicon.ico',
    description: 'Sync your Garmin activities and health data',
    connected: false,
    authUrl: 'https://connect.garmin.com/oauthConfirm'
  },
  {
    id: 'strava',
    name: 'Strava',
    icon: 'https://www.strava.com/favicon.ico',
    description: 'Import your runs, rides, and other activities from Strava',
    connected: false,
    authUrl: 'https://www.strava.com/oauth/authorize'
  },
  {
    id: 'apple_health',
    name: 'Apple Health',
    icon: 'https://www.apple.com/favicon.ico',
    description: 'Sync your Apple Health data and workouts',
    connected: false
  }
];