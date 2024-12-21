import React from 'react';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import type { BloodSugarReading } from '../../../hooks/useBloodSugar';
import { analyzeTrend } from '../../../utils/bloodSugar/trends';

interface BloodSugarTrendsProps {
  readings: BloodSugarReading[];
}

export function BloodSugarTrends({ readings }: BloodSugarTrendsProps) {
  const trend = analyzeTrend(readings);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-slate-300">Trend Analysis</h4>
      <div className="flex items-center gap-2">
        {trend.direction === 'rising' ? (
          <TrendingUp className="w-5 h-5 text-rose-500" />
        ) : trend.direction === 'falling' ? (
          <TrendingDown className="w-5 h-5 text-green-500" />
        ) : (
          <ArrowRight className="w-5 h-5 text-orange-500" />
        )}
        <span className="text-sm">{trend.message}</span>
      </div>
    </div>
  );
}