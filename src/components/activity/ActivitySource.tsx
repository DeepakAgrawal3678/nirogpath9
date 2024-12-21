import React from 'react';
import { Activity as ActivityIcon, Smartphone, Watch } from 'lucide-react';
import type { ActivityData } from '../../types/activity';

interface ActivitySourceProps {
  activity: ActivityData;
}

export function ActivitySource({ activity }: ActivitySourceProps) {
  const getSourceIcon = () => {
    switch (activity.source) {
      case 'fitbit':
      case 'garmin':
        return <Watch className="w-4 h-4" />;
      case 'apple_health':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <ActivityIcon className="w-4 h-4" />;
    }
  };

  const getSourceLabel = () => {
    switch (activity.source) {
      case 'fitbit':
        return 'Fitbit';
      case 'garmin':
        return 'Garmin';
      case 'strava':
        return 'Strava';
      case 'apple_health':
        return 'Apple Health';
      default:
        return 'Manual Entry';
    }
  };

  return (
    <div className="flex items-center gap-1 text-sm text-slate-400">
      {getSourceIcon()}
      <span>{getSourceLabel()}</span>
    </div>
  );
}