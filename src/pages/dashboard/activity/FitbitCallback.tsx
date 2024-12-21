import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFitbitToken, getFitbitActivities } from '../../../lib/integrations/fitbit/api';
import { saveActivity } from '../../../lib/db';
import { useAuth } from '../../../hooks/useAuth';

export function FitbitCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        if (!code || !user?.email) {
          throw new Error('Invalid callback data');
        }

        // Get access token
        const token = await getFitbitToken(code);
        
        // Get activities
        const activities = await getFitbitActivities(token.access_token);
        
        // Save activities to database
        await Promise.all(
          activities.map(activity => saveActivity(user.email!, activity))
        );

        // Store tokens securely (in a real app, this would be done server-side)
        localStorage.setItem('fitbit_token', JSON.stringify({
          ...token,
          expires_at: Date.now() + token.expires_in * 1000
        }));
        
        // Redirect back to activity page
        navigate('/dashboard/activity');
      } catch (error) {
        console.error('Fitbit integration error:', error);
        setError('Failed to connect to Fitbit. Please try again.');
      }
    };

    handleCallback();
  }, [searchParams, navigate, user]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard/activity')}
            className="text-orange-500 hover:text-orange-400"
          >
            Return to Activity Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-300">Connecting to Fitbit...</p>
      </div>
    </div>
  );
}