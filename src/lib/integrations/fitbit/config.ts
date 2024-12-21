import { ActivityProvider } from '../../../types/activity';

export const FITBIT_CONFIG = {
  clientId: import.meta.env.VITE_FITBIT_CLIENT_ID,
  clientSecret: import.meta.env.VITE_FITBIT_CLIENT_SECRET,
  redirectUri: `${window.location.origin}/dashboard/activity/fitbit/callback`,
  authUrl: 'https://www.fitbit.com/oauth2/authorize',
  tokenUrl: 'https://api.fitbit.com/oauth2/token',
  apiUrl: 'https://api.fitbit.com/1',
  scope: 'activity heartrate'
} as const;

export const FITBIT_PROVIDER: ActivityProvider = {
  id: 'fitbit',
  name: 'Fitbit',
  icon: 'https://www.fitbit.com/favicon.ico',
  description: 'Connect your Fitbit device to sync activities automatically',
  connected: false,
  authUrl: `${FITBIT_CONFIG.authUrl}?client_id=${FITBIT_CONFIG.clientId}&response_type=code&redirect_uri=${FITBIT_CONFIG.redirectUri}&scope=${FITBIT_CONFIG.scope}`
};