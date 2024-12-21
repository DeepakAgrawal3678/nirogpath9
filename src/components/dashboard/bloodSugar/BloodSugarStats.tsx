import React from 'react';
import { calculateStatistics } from '../../../utils/bloodSugar/statistics';
import type { BloodSugarReading } from '../../../hooks/useBloodSugar';

interface BloodSugarStatsProps {
  readings: BloodSugarReading[];
}

export function BloodSugarStats({ readings }: BloodSugarStatsProps) {
  const stats = calculateStatistics(readings);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div className="glass-effect p-4 rounded-lg">
        <div className="text-sm text-slate-300">In Target Range</div>
        <div className="text-2xl font-semibold mt-1">{stats.inRange}%</div>
      </div>
      <div className="glass-effect p-4 rounded-lg">
        <div className="text-sm text-slate-300">Average</div>
        <div className="text-2xl font-semibold mt-1">{stats.average} mg/dL</div>
      </div>
      <div className="glass-effect p-4 rounded-lg">
        <div className="text-sm text-slate-300">Variability</div>
        <div className="text-2xl font-semibold mt-1">±{stats.standardDeviation}</div>
      </div>
    </div>
  );
}