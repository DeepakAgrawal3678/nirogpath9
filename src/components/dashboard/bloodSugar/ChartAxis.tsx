import React from 'react';
import { format } from 'date-fns';
import { CHART_CONFIG } from '../../../constants/bloodSugar';
import type { BloodSugarReading } from '../../../hooks/useBloodSugar';

interface ChartAxisProps {
  readings: BloodSugarReading[];
}

export function ChartAxis({ readings }: ChartAxisProps) {
  const yAxisValues = [CHART_CONFIG.MAX_VALUE, 300, 200, 100, CHART_CONFIG.MIN_VALUE];
  
  return (
    <>
      {/* Y-axis */}
      <div className="absolute left-0 h-full flex flex-col justify-between text-xs text-slate-400">
        {yAxisValues.map((value) => (
          <span key={value}>{value}</span>
        ))}
      </div>

      {/* X-axis */}
      <div className="ml-8 flex justify-between text-xs text-slate-400">
        {readings.slice(0, CHART_CONFIG.VISIBLE_DAYS).reverse().map((reading, i) => (
          <div key={i}>
            {format(new Date(reading.timestamp), 'MMM d')}
          </div>
        ))}
      </div>
    </>
  );
}