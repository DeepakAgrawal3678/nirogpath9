import React from 'react';
import { format } from 'date-fns';
import type { DietEntry } from '../../types/diet';

interface DietHistoryProps {
  entries: DietEntry[];
  loading: boolean;
}

export function DietHistory({ entries, loading }: DietHistoryProps) {
  if (loading) {
    return <p className="text-slate-300">Loading entries...</p>;
  }

  if (entries.length === 0) {
    return <p className="text-slate-300">No diet entries recorded yet</p>;
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="p-4 bg-white/5 rounded-lg space-y-3 hover:bg-white/10 transition-colors"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">
              {format(new Date(entry.timestamp), 'MMMM d, yyyy')}
            </h3>
            <span className="text-sm text-slate-400">
              {format(new Date(entry.timestamp), 'h:mm a')}
            </span>
          </div>
          <div className="space-y-2 pt-2 border-t border-white/10">
            {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
              <p key={meal} className="text-slate-300">
                <span className="font-medium text-white capitalize">{meal}:</span>{' '}
                {entry[meal]}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}