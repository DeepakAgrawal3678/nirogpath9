import React from 'react';
import { Card } from '../ui/Card';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  change?: number;
}

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardCard({ entries }: LeaderboardCardProps) {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white">Top Performers</h3>
        <Trophy className="w-4 h-4 text-orange-500" />
      </div>

      <div className="space-y-1.5">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center justify-between p-1.5 bg-white/5 rounded"
          >
            <div className="flex items-center gap-2">
              {entry.rank <= 3 ? (
                <Medal className={`w-3.5 h-3.5 ${
                  entry.rank === 1 ? 'text-yellow-500' :
                  entry.rank === 2 ? 'text-slate-300' :
                  'text-amber-600'
                }`} />
              ) : (
                <span className="w-3.5 text-center text-xs text-slate-400">{entry.rank}</span>
              )}
              <span className="text-xs text-white">{entry.name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-orange-400">{entry.points}</span>
              {entry.change && (
                <span className={entry.change > 0 ? 'text-green-400' : 'text-red-400'}>
                  {entry.change > 0 ? '+' : ''}{entry.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}