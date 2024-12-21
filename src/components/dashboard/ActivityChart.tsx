import React from 'react';
import { Activity } from '../../hooks/useActivity';

interface ActivityChartProps {
  activities: Activity[];
}

export function ActivityChart({ activities }: ActivityChartProps) {
  // Group activities by type
  const activityStats = activities.reduce((acc, activity) => {
    const type = activity.type;
    acc[type] = (acc[type] || 0) + parseInt(activity.duration);
    return acc;
  }, {} as Record<string, number>);

  const totalMinutes = Object.values(activityStats).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {Object.entries(activityStats).map(([type, minutes]) => {
        const percentage = (minutes / totalMinutes) * 100;
        return (
          <div key={type} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{type}</span>
              <span>{minutes} minutes</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}