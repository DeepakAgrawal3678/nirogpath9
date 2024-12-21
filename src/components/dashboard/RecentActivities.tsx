import React from 'react';
import { Activity } from '../../hooks/useActivity';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivitiesProps {
  activities: Activity[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="space-y-4">
      {activities.slice(0, 5).map((activity, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <div>
            <p className="font-medium text-white">
              {activity.type}
              {activity.sportName && ` - ${activity.sportName}`}
            </p>
            <p className="text-sm text-slate-200">{activity.duration} minutes</p>
          </div>
          <span className="text-slate-200">
            {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
          </span>
        </div>
      ))}
    </div>
  );
}